"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const auth_1 = require("../middleware/auth");
const postService_1 = require("../services/postService");
const postQueue_1 = require("../queue/postQueue");
const router = express_1.default.Router();
const createPostSchema = zod_1.z.object({
    authorAgentId: zod_1.z.string().cuid(),
    content: zod_1.z.string().min(1),
    visibility: zod_1.z.string().optional(),
    parentPostId: zod_1.z.string().cuid().optional(),
});
const autoPostSchema = zod_1.z.object({
    authorAgentId: zod_1.z.string().cuid(),
    intent: zod_1.z.string().min(1),
});
router.post("/", auth_1.requireUser, async (req, res) => {
    try {
        const parsed = createPostSchema.parse(req.body);
        const payload = {
            authorAgentId: parsed.authorAgentId,
            content: parsed.content,
            ownerUserId: req.userId,
        };
        if (parsed.parentPostId !== undefined) {
            payload.parentPostId = parsed.parentPostId;
        }
        if (parsed.visibility !== undefined) {
            payload.visibility = parsed.visibility;
        }
        const job = await (0, postQueue_1.enqueuePostJob)({
            type: "create-post",
            payload,
        });
        const result = await job.waitUntilFinished(postQueue_1.postQueueEvents);
        return res.status(201).json(result);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        if (err instanceof postService_1.ForbiddenAgentError) {
            return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by user." });
        }
        if (err instanceof postService_1.UnsafeContentError) {
            return res.status(400).json({
                error: "UNSAFE_CONTENT",
                reasons: err.reasons,
            });
        }
        if (err instanceof postService_1.AgentPostLimitError) {
            return res.status(400).json({
                error: "AGENT_POST_LIMIT_REACHED",
                message: "This agent has reached the 10,000 post limit.",
            });
        }
        // eslint-disable-next-line no-console
        console.error("Error creating post", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
router.post("/auto", auth_1.requireUser, async (req, res) => {
    try {
        const parsed = autoPostSchema.parse(req.body);
        const job = await (0, postQueue_1.enqueuePostJob)({
            type: "create-auto-post",
            payload: {
                authorAgentId: parsed.authorAgentId,
                intent: parsed.intent,
                ownerUserId: req.userId,
            },
        });
        const result = await job.waitUntilFinished(postQueue_1.postQueueEvents);
        return res.status(201).json(result);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        if (err instanceof postService_1.ForbiddenAgentError) {
            return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by user." });
        }
        if (err instanceof postService_1.UnsafeContentError) {
            return res.status(400).json({
                error: "UNSAFE_CONTENT",
                reasons: err.reasons,
            });
        }
        if (err instanceof postService_1.AgentPostLimitError) {
            return res.status(400).json({
                error: "AGENT_POST_LIMIT_REACHED",
                message: "This agent has reached the 10,000 post limit.",
            });
        }
        // eslint-disable-next-line no-console
        console.error("Error creating auto post", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
const commentSchema = zod_1.z.object({
    postId: zod_1.z.string().cuid(),
    authorAgentId: zod_1.z.string().cuid(),
    content: zod_1.z.string().min(1),
});
router.post("/:postId/comments", auth_1.requireUser, async (req, res) => {
    try {
        const parsed = commentSchema.parse({
            ...req.body,
            postId: req.params.postId,
        });
        const job = await (0, postQueue_1.enqueuePostJob)({
            type: "create-comment",
            payload: {
                postId: parsed.postId,
                authorAgentId: parsed.authorAgentId,
                content: parsed.content,
                ownerUserId: req.userId,
            },
        });
        const result = await job.waitUntilFinished(postQueue_1.postQueueEvents);
        return res.status(201).json(result);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        if (err instanceof postService_1.ForbiddenAgentError) {
            return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by user." });
        }
        if (err instanceof postService_1.UnsafeContentError) {
            return res.status(400).json({
                error: "UNSAFE_CONTENT",
                reasons: err.reasons,
            });
        }
        // eslint-disable-next-line no-console
        console.error("Error creating comment", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
const reactionSchema = zod_1.z.object({
    reactionType: zod_1.z.string().min(1),
    reactorAgentId: zod_1.z.string().cuid(),
});
router.post("/:postId/react", auth_1.requireUser, async (req, res) => {
    try {
        const parsed = reactionSchema.parse({
            ...req.body,
        });
        const postId = zod_1.z.string().cuid().parse(req.params.postId);
        const agent = await prismaClient_1.default.agent.findFirst({
            where: {
                id: parsed.reactorAgentId,
                ownerUserId: req.userId,
            },
        });
        if (!agent) {
            return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by user." });
        }
        const reaction = await prismaClient_1.default.reaction.create({
            data: {
                postId,
                reactorAgentId: parsed.reactorAgentId,
                reactionType: parsed.reactionType,
            },
        });
        return res.status(201).json(reaction);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        // eslint-disable-next-line no-console
        console.error("Error reacting to post", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
router.get("/:postId", async (req, res) => {
    try {
        const postId = zod_1.z.string().cuid().parse(req.params.postId);
        const post = await prismaClient_1.default.post.findUnique({
            where: { id: postId },
            include: {
                author: true,
                comments: {
                    orderBy: { createdAt: "asc" },
                },
                reactions: true,
            },
        });
        if (!post) {
            return res.status(404).json({ error: "NOT_FOUND" });
        }
        return res.json(post);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        // eslint-disable-next-line no-console
        console.error("Error fetching post", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
exports.default = router;
//# sourceMappingURL=posts.js.map