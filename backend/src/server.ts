import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Redis from "ioredis";
import agentsRouter from "./routes/agents";
import postsRouter from "./routes/posts";
import socialRouter from "./routes/social";
import adminRouter from "./routes/admin";
import llmRouter from "./routes/llm";
import prisma from "./prismaClient";
import { requireUser, AuthenticatedRequest } from "./middleware/auth";
import { enqueuePostJob } from "./queue/postQueue";
import {
  decideInteractionForPost,
  pickCandidatePostsForAgent,
} from "./services/interactionService";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Log each API request (method + path + status after response)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    // eslint-disable-next-line no-console
    console.log(
      `${req.method} ${req.path} ${res.statusCode} ${duration}ms`,
    );
  });
  next();
});

const PORT = process.env.PORT || 4001;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "agentbook-backend" });
});

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);

app.get("/health/redis", async (_req, res) => {
  const redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
  try {
    await redis.ping();
    await redis.quit();
    res.json({ status: "ok", redis: "connected" });
  } catch (err: unknown) {
    void redis.quit().catch(() => {});
    const msg = err instanceof Error ? err.message : String(err);
    res.status(503).json({ status: "error", redis: "disconnected", message: msg });
  }
});

const PER_USER_AGENT_LIMIT = 5;
app.get("/me", requireUser, async (req: express.Request, res: express.Response) => {
  const authReq = req as AuthenticatedRequest;
  const ownerUserId = authReq.userId!;
  const agents = await prisma.agent.findMany({
    where: { ownerUserId },
    orderBy: { createdAt: "desc" },
  });
  const count = agents.length;
  res.json({
    agents,
    count,
    remainingSlots: Math.max(0, PER_USER_AGENT_LIMIT - count),
  });
});

app.use("/agents", agentsRouter);
app.use("/posts", postsRouter);
app.use("/", socialRouter);
app.use("/admin", adminRouter);
app.use("/llm", llmRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});

const AUTO_POST_INTERVAL_MS =
  Number(process.env.AUTO_POST_INTERVAL_MS || 60000);
const INTERACTION_INTERVAL_MS =
  Number(process.env.INTERACTION_INTERVAL_MS || 120000);
const MAX_INTERACTIONS_PER_AGENT_PER_HOUR =
  Number(process.env.MAX_INTERACTIONS_PER_AGENT_PER_HOUR || 5);
const MAX_INTERACTIONS_PER_POST =
  Number(process.env.MAX_INTERACTIONS_PER_POST || 5);

const AUTO_POST_INTENTS = [
  "Share a quick thought or reaction to something you might encounter in your everyday life, from the perspective of this agent.",
  "Explain a small insight, tip, or idea related to the themes in your description or system prompt.",
  "Make an observation about the world, technology, or people that fits your personality and role.",
  "Ask a short, open-ended question to spark conversation with other agents or humans.",
  "Tell a tiny anecdote or imagined mini-story that feels consistent with your backstory or description.",
  "Make a light, playful or humorous remark that still feels in-character for this agent.",
  "Reflect briefly on a challenge, curiosity, or goal that this agent might have.",
];

function pickRandomIntent(): string {
  const idx = Math.floor(Math.random() * AUTO_POST_INTENTS.length);
  return AUTO_POST_INTENTS[idx]!;
}

async function scheduleAgentAutoPosts() {
  if (AUTO_POST_INTERVAL_MS <= 0) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(
    `Auto-post scheduler running every ${AUTO_POST_INTERVAL_MS / 1000}s`,
  );

  async function tick() {
    try {
      const agents = await prisma.agent.findMany({
        select: {
          id: true,
          ownerUserId: true,
          name: true,
        },
        where: {
          ownerUserId: {
            not: null,
          },
        },
      });

      for (const agent of agents) {
        if (!agent.ownerUserId) continue;

        const baseIntent = pickRandomIntent();
        const intent = `${baseIntent} Make this post distinct from recent posts by varying the angle, examples, and wording.`;

        await enqueuePostJob(
          {
            type: "create-auto-post",
            payload: {
              authorAgentId: agent.id,
              ownerUserId: agent.ownerUserId,
              intent,
            },
          },
          {
            // spread posts from different agents a bit
            delay: Math.floor(Math.random() * AUTO_POST_INTERVAL_MS),
          },
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error in auto-post scheduler tick", err);
    }
  }

  setInterval(tick, AUTO_POST_INTERVAL_MS);
}

async function scheduleAgentInteractions() {
  if (INTERACTION_INTERVAL_MS <= 0) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(
    `Interaction scheduler running every ${INTERACTION_INTERVAL_MS / 1000}s`,
  );

  async function tick() {
    try {
      const agents = await prisma.agent.findMany({
        where: {
          ownerUserId: {
            not: null,
          },
        },
      });

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      for (const agent of agents) {
        if (!agent.ownerUserId) continue;

        const [recentComments, recentReactions] = await Promise.all([
          prisma.comment.count({
            where: {
              authorAgentId: agent.id,
              createdAt: {
                gte: oneHourAgo,
              },
            },
          }),
          prisma.reaction.count({
            where: {
              reactorAgentId: agent.id,
              createdAt: {
                gte: oneHourAgo,
              },
            },
          }),
        ]);

        const recentInteractions = recentComments + recentReactions;
        if (recentInteractions >= MAX_INTERACTIONS_PER_AGENT_PER_HOUR) {
          continue;
        }

        const candidates = await pickCandidatePostsForAgent(agent.id);
        if (candidates.length === 0) continue;

        let interactionsThisTick = 0;

        for (const post of candidates) {
          if (
            interactionsThisTick >= 2 ||
            recentInteractions + interactionsThisTick >=
              MAX_INTERACTIONS_PER_AGENT_PER_HOUR
          ) {
            break;
          }

          const decision = await decideInteractionForPost(agent, post);
          if (!decision.shouldInteract) {
            continue;
          }

          // Small chance to skip even if the model says to interact,
          // to keep overall activity at a medium level.
          if (Math.random() < 0.3) {
            continue;
          }

          const interactionCountForPost = await prisma.reaction.count({
            where: { postId: post.id },
          });

          if (interactionCountForPost >= MAX_INTERACTIONS_PER_POST) {
            continue;
          }

          await enqueuePostJob({
            type: "create-interaction",
            payload: {
              targetPostId: post.id,
              reactorAgentId: agent.id,
              ownerUserId: agent.ownerUserId,
              reactionType: decision.reactionType ?? null,
              commentText: decision.commentText ?? null,
            },
          });

          interactionsThisTick += 1;
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error in interaction scheduler tick", err);
    }
  }

  setInterval(tick, INTERACTION_INTERVAL_MS);
}

// When LLM_ACTIVITY_SOURCE=ollama (or unset), run schedulers that use Ollama (local).
// When LLM_ACTIVITY_SOURCE=browser (hosted), activity is driven by the frontend WebLLM; do not run schedulers.
const llmActivitySource = process.env.LLM_ACTIVITY_SOURCE || "ollama";
const runOllamaSchedulers =
  process.env.ENABLE_AUTO_SCHEDULERS === "true" &&
  llmActivitySource !== "browser";

if (runOllamaSchedulers) {
  scheduleAgentAutoPosts();
  scheduleAgentInteractions();
}


