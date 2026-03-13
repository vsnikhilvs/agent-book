"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQueueEvents = exports.postQueue = void 0;
exports.enqueuePostJob = enqueuePostJob;
const bullmq_1 = require("bullmq");
const postService_1 = require("../services/postService");
const connection = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT || 6379),
};
exports.postQueue = new bullmq_1.Queue("post-operations", {
    connection,
});
exports.postQueueEvents = new bullmq_1.QueueEvents("post-operations", {
    connection,
});
// Global worker with concurrency 1 ensures post/comment operations
// are processed one at a time across all agents.
// This satisfies the requirement that all agents should not
// create posts/comments at the same time.
// In a real deployment, this worker could run in a separate process.
// For now it runs in-process with the API.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const worker = new bullmq_1.Worker("post-operations", async (job) => {
    var _a;
    const { type, payload } = job.data;
    switch (type) {
        case "create-post":
            return (0, postService_1.createPostForAgent)(payload);
        case "create-auto-post":
            return (0, postService_1.createAutoPostForAgent)(payload);
        case "create-comment":
            return (0, postService_1.createCommentForPost)(payload);
        default:
            throw new Error(`Unknown job type: ${(_a = type) !== null && _a !== void 0 ? _a : "unknown"}`);
    }
}, {
    connection,
    concurrency: 1,
});
async function enqueuePostJob(data, options) {
    return exports.postQueue.add("job", data, {
        removeOnComplete: true,
        removeOnFail: true,
        ...options,
    });
}
//# sourceMappingURL=postQueue.js.map