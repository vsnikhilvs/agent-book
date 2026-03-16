import express from "express";
import { z } from "zod";
import prisma from "../prismaClient";
import { requireUser, AuthenticatedRequest } from "../middleware/auth";
import {
  AgentPostLimitError,
  ForbiddenAgentError,
  UnsafeContentError,
} from "../services/postService";
import {
  enqueuePostJob,
  postQueueEvents,
} from "../queue/postQueue";

const router = express.Router();

const createPostSchema = z.object({
  authorAgentId: z.string().cuid(),
  content: z.string().min(1),
  visibility: z.string().optional(),
  parentPostId: z.string().cuid().optional(),
});

const autoPostSchema = z.object({
  authorAgentId: z.string().cuid(),
  intent: z.string().min(1),
});

router.post(
  "/",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const parsed = createPostSchema.parse(req.body);

      const payload: {
        authorAgentId: string;
        content: string;
        visibility?: string;
        parentPostId?: string;
        ownerUserId: string;
      } = {
        authorAgentId: parsed.authorAgentId,
        content: parsed.content,
        ownerUserId: req.userId!,
      };

      if (parsed.parentPostId !== undefined) {
        payload.parentPostId = parsed.parentPostId;
      }
      if (parsed.visibility !== undefined) {
        payload.visibility = parsed.visibility;
      }

      const job = await enqueuePostJob({
        type: "create-post",
        payload,
      });

      const result = await job.waitUntilFinished(postQueueEvents);
      return res.status(201).json(result);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
      }
      if (err instanceof ForbiddenAgentError) {
        return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by user." });
      }
      if (err instanceof UnsafeContentError) {
        return res.status(400).json({
          error: "UNSAFE_CONTENT",
          reasons: err.reasons,
        });
      }
      if (err instanceof AgentPostLimitError) {
        return res.status(400).json({
          error: "AGENT_POST_LIMIT_REACHED",
          message: "This agent has reached the 10,000 post limit.",
        });
      }

      // eslint-disable-next-line no-console
      console.error("Error creating post", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

router.post(
  "/auto",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const parsed = autoPostSchema.parse(req.body);

      const job = await enqueuePostJob({
        type: "create-auto-post",
        payload: {
          authorAgentId: parsed.authorAgentId,
          intent: parsed.intent,
          ownerUserId: req.userId!,
        },
      });

      const result = await job.waitUntilFinished(postQueueEvents);
      return res.status(201).json(result);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
      }
      if (err instanceof ForbiddenAgentError) {
        return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by user." });
      }
      if (err instanceof UnsafeContentError) {
        return res.status(400).json({
          error: "UNSAFE_CONTENT",
          reasons: err.reasons,
        });
      }
      if (err instanceof AgentPostLimitError) {
        return res.status(400).json({
          error: "AGENT_POST_LIMIT_REACHED",
          message: "This agent has reached the 10,000 post limit.",
        });
      }

      // eslint-disable-next-line no-console
      console.error("Error creating auto post", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

const commentSchema = z.object({
  postId: z.string().cuid(),
  authorAgentId: z.string().cuid(),
  content: z.string().min(1),
});

router.post(
  "/:postId/comments",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const parsed = commentSchema.parse({
        ...req.body,
        postId: req.params.postId,
      });

      const job = await enqueuePostJob({
        type: "create-comment",
        payload: {
          postId: parsed.postId,
          authorAgentId: parsed.authorAgentId,
          content: parsed.content,
          ownerUserId: req.userId!,
        },
      });

      const result = await job.waitUntilFinished(postQueueEvents);
      return res.status(201).json(result);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
      }
      if (err instanceof ForbiddenAgentError) {
        return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by user." });
      }
      if (err instanceof UnsafeContentError) {
        return res.status(400).json({
          error: "UNSAFE_CONTENT",
          reasons: err.reasons,
        });
      }

      // eslint-disable-next-line no-console
      console.error("Error creating comment", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

const reactionSchema = z.object({
  reactionType: z.string().min(1),
  reactorAgentId: z.string().cuid(),
});

router.post(
  "/:postId/react",
  requireUser,
  async (req: AuthenticatedRequest, res: express.Response) => {
    try {
      const parsed = reactionSchema.parse({
        ...req.body,
      });

      const postId = z.string().cuid().parse(req.params.postId);

      const agent = await prisma.agent.findFirst({
        where: {
          id: parsed.reactorAgentId,
          ownerUserId: req.userId!,
        },
      });

      if (!agent) {
        return res.status(403).json({ error: "FORBIDDEN", message: "Agent not owned by you." });
      }

      const reaction = await prisma.reaction.create({
        data: {
          postId,
          reactorAgentId: parsed.reactorAgentId,
          reactionType: parsed.reactionType,
        },
      });

      return res.status(201).json(reaction);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
      }
      // eslint-disable-next-line no-console
      console.error("Error reacting to post", err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  },
);

router.get("/:postId", async (req, res) => {
  try {
    const postId = z.string().cuid().parse(req.params.postId);

    const post = await prisma.post.findUnique({
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
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
    }
    // eslint-disable-next-line no-console
    console.error("Error fetching post", err);
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

export default router;

