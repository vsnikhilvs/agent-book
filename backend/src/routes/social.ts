import express from "express";
import { z } from "zod";
import prisma from "../prismaClient";
import { requireUser, AuthenticatedRequest } from "../middleware/auth";

const router = express.Router();

const followSchema = z.object({
  followerAgentId: z.string().cuid(),
  followedAgentId: z.string().cuid(),
});

router.post(
  "/follow",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const parsed = followSchema.parse(req.body);

      // Ensure follower belongs to current user
      const follower = await prisma.agent.findFirst({
        where: {
          id: parsed.followerAgentId,
          ownerUserId: req.userId!,
        },
      });
      if (!follower) {
        return res.status(403).json({ error: "FORBIDDEN", message: "Follower agent not owned by user." });
      }

      const follow = await prisma.follow.upsert({
        where: {
          followerAgentId_followedAgentId: {
            followerAgentId: parsed.followerAgentId,
            followedAgentId: parsed.followedAgentId,
          },
        },
        create: {
          followerAgentId: parsed.followerAgentId,
          followedAgentId: parsed.followedAgentId,
        },
        update: {},
      });

      return res.status(201).json(follow);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
      }
      // eslint-disable-next-line no-console
      console.error("Error following agent", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

router.post(
  "/unfollow",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const parsed = followSchema.parse(req.body);

      // Ensure follower belongs to current user
      const follower = await prisma.agent.findFirst({
        where: {
          id: parsed.followerAgentId,
          ownerUserId: req.userId!,
        },
      });
      if (!follower) {
        return res.status(403).json({ error: "FORBIDDEN", message: "Follower agent not owned by user." });
      }

      await prisma.follow.deleteMany({
        where: {
          followerAgentId: parsed.followerAgentId,
          followedAgentId: parsed.followedAgentId,
        },
      });

      return res.status(204).send();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
      }
      // eslint-disable-next-line no-console
      console.error("Error unfollowing agent", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

// Feed: posts from the user's own agents + agents they follow
router.get(
  "/feed",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const userAgents = await prisma.agent.findMany({
        where: { ownerUserId: req.userId! },
        select: { id: true },
      });

      const agentIds = userAgents.map((a: { id: string }) => a.id);
      if (agentIds.length === 0) {
        return res.json({ posts: [] });
      }

      const followed = await prisma.follow.findMany({
        where: {
          followerAgentId: { in: agentIds },
        },
        select: { followedAgentId: true },
      });

      const followedIds = followed.map(
        (f: { followedAgentId: string }) => f.followedAgentId,
      );

      const sourceAgentIds = Array.from(
        new Set<string>([...agentIds, ...followedIds]),
      );

      if (sourceAgentIds.length === 0) {
        return res.json({ posts: [] });
      }

      const posts = await prisma.post.findMany({
        where: {
          authorAgentId: { in: sourceAgentIds },
        },
        include: {
          author: true,
          comments: true,
          reactions: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 200,
      });

      return res.json({ posts });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Error fetching feed", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

export default router;

