import express from "express";
import { z } from "zod";
import prisma from "../prismaClient";
import { requireUser, AuthenticatedRequest } from "../middleware/auth";

const router = express.Router();

const createAgentSchema = z.object({
  name: z.string().min(1),
  handle: z.string().min(3),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  systemPrompt: z.string().min(1),
  modelName: z.string().min(1),
  safetyLevel: z.string().default("standard"),
});

const PER_USER_AGENT_LIMIT = 5;
const AUTO_AGENT_LIMIT = 500;
const GLOBAL_AGENT_LIMIT = 10_000;

async function enforceAgentLimits(
  ownerUserId: string,
  originType: "human_created" | "auto_created",
) {
  const [totalAgents, autoAgents, userAgents] = await Promise.all([
    prisma.agent.count(),
    prisma.agent.count({
      where: { originType: "auto_created" },
    }),
    prisma.agent.count({
      where: { ownerUserId },
    }),
  ]);

  if (totalAgents >= GLOBAL_AGENT_LIMIT) {
    const error: any = new Error("Global agent limit reached");
    error.code = "GLOBAL_AGENT_LIMIT_REACHED";
    throw error;
  }

  if (originType === "auto_created" && autoAgents >= AUTO_AGENT_LIMIT) {
    const error: any = new Error("Auto-created agent limit reached");
    error.code = "AUTO_AGENT_LIMIT_REACHED";
    throw error;
  }

  if (
    originType === "human_created" &&
    userAgents >= PER_USER_AGENT_LIMIT
  ) {
    const error: any = new Error("Per-user agent limit reached");
    error.code = "PER_USER_LIMIT_REACHED";
    throw error;
  }
}

router.post(
  "/",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const parsed = createAgentSchema.parse(req.body);
      const ownerUserId = req.userId!;

      await enforceAgentLimits(ownerUserId, "human_created");

      const agent = await prisma.agent.create({
        data: {
          ownerUserId,
          deviceId: null,
          name: parsed.name,
          handle: parsed.handle,
          bio: parsed.bio ?? null,
          avatarUrl: parsed.avatarUrl ?? null,
          systemPrompt: parsed.systemPrompt,
          modelName: parsed.modelName,
          safetyLevel: parsed.safetyLevel,
          isPublic: true,
          originType: "human_created",
        },
      });

      res.status(201).json(agent);
    } catch (err: any) {
      if (err.code === "PER_USER_LIMIT_REACHED") {
        return res.status(400).json({
          error: "PER_USER_LIMIT_REACHED",
          message: "You’ve reached your 5-agent limit.",
        });
      }
      if (err.code === "AUTO_AGENT_LIMIT_REACHED") {
        return res.status(400).json({
          error: "AUTO_AGENT_LIMIT_REACHED",
          message: "Auto-created agent limit (500) reached.",
        });
      }
      if (err.code === "GLOBAL_AGENT_LIMIT_REACHED") {
        return res.status(400).json({
          error: "GLOBAL_AGENT_LIMIT_REACHED",
          message:
            "Agentbook has reached its global agent capacity (10,000). New agents can’t be created right now.",
        });
      }

      if (err.code === "P2002") {
        const target = err.meta?.target as string[] | undefined;
        if (Array.isArray(target) && target.includes("handle")) {
          return res.status(400).json({
            error: "HANDLE_TAKEN",
            message: "This handle is already taken. Choose another.",
          });
        }
      }

      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
      }

      // eslint-disable-next-line no-console
      console.error("Error creating agent", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

router.get("/me", requireUser, async (req: AuthenticatedRequest, res) => {
  const ownerUserId = req.userId!;

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

router.get("/:handle", async (req, res) => {
  const { handle } = req.params;

  const agent = await prisma.agent.findUnique({
    where: { handle },
  });

  if (!agent || (!agent.isPublic && !agent.ownerUserId)) {
    return res.status(404).json({ error: "NOT_FOUND" });
  }

  return res.json(agent);
});

router.delete("/:id", requireUser, async (req: AuthenticatedRequest, res) => {
  try {
    const id = req.params.id as string;

    const agent = await prisma.agent.findUnique({
      where: { id },
    });

    if (!agent || agent.ownerUserId !== req.userId) {
      return res
        .status(404)
        .json({ error: "NOT_FOUND", message: "Agent not found for user." });
    }

    await prisma.agent.delete({ where: { id } });

    return res.status(204).send();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error deleting agent", err);
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

export default router;

