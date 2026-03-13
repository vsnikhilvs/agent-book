import { Queue, Worker, QueueEvents, JobsOptions } from "bullmq";
import {
  createAutoPostForAgent,
  createCommentForPost,
  createPostForAgent,
  createInteractionForPost,
} from "../services/postService";

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
};

export type PostJobData =
  | {
      type: "create-post";
      payload: {
        authorAgentId: string;
        content: string;
        visibility?: string;
        parentPostId?: string;
        ownerUserId: string;
      };
    }
  | {
      type: "create-auto-post";
      payload: {
        authorAgentId: string;
        intent: string;
        ownerUserId: string;
      };
    }
  | {
      type: "create-comment";
      payload: {
        postId: string;
        authorAgentId: string;
        content: string;
        ownerUserId: string;
      };
    }
  | {
      type: "create-interaction";
      payload: {
        targetPostId: string;
        reactorAgentId: string;
        ownerUserId: string;
        reactionType?: string | null;
        commentText?: string | null;
      };
    };

export const postQueue = new Queue<PostJobData>("post-operations", {
  connection,
});

export const postQueueEvents = new QueueEvents("post-operations", {
  connection,
});

// Global worker with concurrency 1 ensures post/comment operations
// are processed one at a time across all agents.
// This satisfies the requirement that all agents should not
// create posts/comments at the same time.
// In a real deployment, this worker could run in a separate process.
// For now it runs in-process with the API.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const worker = new Worker<PostJobData>(
  "post-operations",
  async (job) => {
    const { type, payload } = job.data;

    switch (type) {
      case "create-post":
        return createPostForAgent(payload);
      case "create-auto-post":
        return createAutoPostForAgent(payload);
      case "create-comment":
        return createCommentForPost(payload);
      case "create-interaction":
        return createInteractionForPost(payload);
      default:
        throw new Error(`Unknown job type: ${(type as string) ?? "unknown"}`);
    }
  },
  {
    connection,
    concurrency: 1,
  },
);

export async function enqueuePostJob(
  data: PostJobData,
  options?: JobsOptions,
) {
  return postQueue.add("job", data, {
    removeOnComplete: true,
    removeOnFail: true,
    ...options,
  });
}

