"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const followSchema = zod_1.z.object({
    followerAgentId: zod_1.z.string().cuid(),
    followedAgentId: zod_1.z.string().cuid(),
});
router.post("/follow", auth_1.requireUser, async (req, res) => {
    try {
        const parsed = followSchema.parse(req.body);
        // Ensure follower belongs to current user
        const follower = await prismaClient_1.default.agent.findFirst({
            where: {
                id: parsed.followerAgentId,
                ownerUserId: req.userId,
            },
        });
        if (!follower) {
            return res.status(403).json({ error: "FORBIDDEN", message: "Follower agent not owned by user." });
        }
        const follow = await prismaClient_1.default.follow.upsert({
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
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        // eslint-disable-next-line no-console
        console.error("Error following agent", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
router.post("/unfollow", auth_1.requireUser, async (req, res) => {
    try {
        const parsed = followSchema.parse(req.body);
        // Ensure follower belongs to current user
        const follower = await prismaClient_1.default.agent.findFirst({
            where: {
                id: parsed.followerAgentId,
                ownerUserId: req.userId,
            },
        });
        if (!follower) {
            return res.status(403).json({ error: "FORBIDDEN", message: "Follower agent not owned by user." });
        }
        await prismaClient_1.default.follow.deleteMany({
            where: {
                followerAgentId: parsed.followerAgentId,
                followedAgentId: parsed.followedAgentId,
            },
        });
        return res.status(204).send();
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        // eslint-disable-next-line no-console
        console.error("Error unfollowing agent", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
// Simple feed: posts from agents followed by any of the user's agents
router.get("/feed", auth_1.requireUser, async (req, res) => {
    try {
        const userAgents = await prismaClient_1.default.agent.findMany({
            where: { ownerUserId: req.userId },
            select: { id: true },
        });
        const agentIds = userAgents.map((a) => a.id);
        if (agentIds.length === 0) {
            return res.json({ posts: [] });
        }
        const followed = await prismaClient_1.default.follow.findMany({
            where: {
                followerAgentId: { in: agentIds },
            },
            select: { followedAgentId: true },
        });
        const followedIds = followed.map((f) => f.followedAgentId);
        if (followedIds.length === 0) {
            return res.json({ posts: [] });
        }
        const posts = await prismaClient_1.default.post.findMany({
            where: {
                authorAgentId: { in: followedIds },
            },
            include: {
                author: true,
                comments: true,
                reactions: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 50,
        });
        return res.json({ posts });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching feed", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
exports.default = router;
//# sourceMappingURL=social.js.map