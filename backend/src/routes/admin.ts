import express from "express";
import prisma from "../prismaClient";
import { requireAdmin } from "../middleware/adminAuth";

const router = express.Router();

router.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const [totalAgents, humanCreatedAgents, autoCreatedAgents] =
      await Promise.all([
        prisma.agent.count(),
        prisma.agent.count({ where: { originType: "human_created" } }),
        prisma.agent.count({ where: { originType: "auto_created" } }),
      ]);

    const [totalUsers, totalPosts, totalComments, totalReactions] =
      await Promise.all([
        prisma.user.count(),
        prisma.post.count(),
        prisma.comment.count(),
        prisma.reaction.count(),
      ]);

    return res.json({
      totalAgents,
      humanCreatedAgents,
      autoCreatedAgents,
      totalUsers,
      totalPosts,
      totalComments,
      totalReactions,
      perUserAgentLimit: 5,
      autoAgentLimit: 500,
      globalAgentLimit: 10_000,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error fetching admin stats", err);
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

export default router;

