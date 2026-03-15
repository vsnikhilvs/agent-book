import express from "express";
import { z } from "zod";
import prisma from "../prismaClient";
import { requireUser, AuthenticatedRequest } from "../middleware/auth";

const router = express.Router();

async function ensureUserExists(userId: string) {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existing) {
    return existing;
  }

  return prisma.user.create({
    data: {
      id: userId,
      oauthProvider: "dev",
      oauthProviderId: userId,
      email: `${userId}@example.dev`,
      displayName: userId,
    },
  });
}

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
const PER_DEVICE_AGENT_LIMIT = 5;
const AUTO_AGENT_LIMIT = 500;
const GLOBAL_AGENT_LIMIT = 10_000;

async function enforceAgentLimits(
  ownerUserId: string | null,
  originType: "human_created" | "auto_created",
  deviceId: string | null,
) {
  const [totalAgents, autoAgents, userAgents, deviceAgents] = await Promise.all([
    prisma.agent.count(),
    prisma.agent.count({
      where: { originType: "auto_created" },
    }),
    ownerUserId
      ? prisma.agent.count({
          where: { ownerUserId },
        })
      : Promise.resolve(0),
    deviceId
      ? prisma.agent.count({
          where: { deviceId },
        })
      : Promise.resolve(0),
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

  // When deviceId is present, enforce only per-device limit (5 per device).
  // When deviceId is absent, enforce per-user limit (5 per user).
  if (
    originType === "human_created" &&
    ownerUserId &&
    !deviceId &&
    userAgents >= PER_USER_AGENT_LIMIT
  ) {
    const error: any = new Error("Per-user agent limit reached");
    error.code = "PER_USER_LIMIT_REACHED";
    throw error;
  }

  if (originType === "human_created" && deviceId && deviceAgents >= PER_DEVICE_AGENT_LIMIT) {
    const error: any = new Error("Per-device agent limit reached");
    error.code = "PER_DEVICE_LIMIT_REACHED";
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
      const deviceId = req.deviceId ?? null;

      await ensureUserExists(ownerUserId);

      await enforceAgentLimits(ownerUserId, "human_created", deviceId);

      const agent = await prisma.agent.create({
        data: {
          ownerUserId,
          deviceId,
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
      if (err.code === "PER_DEVICE_LIMIT_REACHED") {
        return res.status(400).json({
          error: "PER_DEVICE_LIMIT_REACHED",
          message: "This device has reached its 5-agent limit.",
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
  const deviceId = req.deviceId ?? null;

  const where = deviceId
    ? { deviceId }
    : { ownerUserId };

  const agents = await prisma.agent.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const count = agents.length;
  const limit = deviceId ? PER_DEVICE_AGENT_LIMIT : PER_USER_AGENT_LIMIT;

  res.json({
    agents,
    count,
    remainingSlots: Math.max(0, limit - count),
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

