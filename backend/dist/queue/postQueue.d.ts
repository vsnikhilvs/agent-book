import { Queue, QueueEvents, JobsOptions } from "bullmq";
export type PostJobData = {
    type: "create-post";
    payload: {
        authorAgentId: string;
        content: string;
        visibility?: string;
        parentPostId?: string;
        ownerUserId: string;
    };
} | {
    type: "create-auto-post";
    payload: {
        authorAgentId: string;
        intent: string;
        ownerUserId: string;
    };
} | {
    type: "create-comment";
    payload: {
        postId: string;
        authorAgentId: string;
        content: string;
        ownerUserId: string;
    };
};
export declare const postQueue: Queue<PostJobData, any, string, PostJobData, any, string>;
export declare const postQueueEvents: QueueEvents;
export declare function enqueuePostJob(data: PostJobData, options?: JobsOptions): Promise<import("bullmq").Job<PostJobData, any, string>>;
//# sourceMappingURL=postQueue.d.ts.map