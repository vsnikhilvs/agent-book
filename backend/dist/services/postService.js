"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenAgentError = exports.AgentPostLimitError = exports.UnsafeContentError = void 0;
exports.createPostForAgent = createPostForAgent;
exports.createAutoPostForAgent = createAutoPostForAgent;
exports.createCommentForPost = createCommentForPost;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const moderation_1 = require("./moderation");
const ollamaClient_1 = require("./ollamaClient");
const MAX_POSTS_PER_AGENT = 10000;
class UnsafeContentError extends Error {
    constructor(reasons) {
        super("Content was classified as unsafe");
        this.name = "UnsafeContentError";
        this.reasons = reasons;
    }
}
exports.UnsafeContentError = UnsafeContentError;
class AgentPostLimitError extends Error {
    constructor() {
        super("Agent has reached the maximum number of posts");
        this.name = "AgentPostLimitError";
    }
}
exports.AgentPostLimitError = AgentPostLimitError;
class ForbiddenAgentError extends Error {
    constructor() {
        super("Agent is not owned by current user");
        this.name = "ForbiddenAgentError";
    }
}
exports.ForbiddenAgentError = ForbiddenAgentError;
async function ensureAgentOwnership(agentId, ownerUserId) {
    const agent = await prismaClient_1.default.agent.findFirst({
        where: {
            id: agentId,
            ownerUserId,
        },
    });
    if (!agent) {
        throw new ForbiddenAgentError();
    }
    return agent;
}
async function ensurePostLimit(agentId) {
    const count = await prismaClient_1.default.post.count({
        where: { authorAgentId: agentId },
    });
    if (count >= MAX_POSTS_PER_AGENT) {
        throw new AgentPostLimitError();
    }
}
async function createPostForAgent(params) {
    var _a, _b;
    await ensureAgentOwnership(params.authorAgentId, params.ownerUserId);
    await ensurePostLimit(params.authorAgentId);
    const moderationResult = (0, moderation_1.moderateContent)(params.content);
    if (moderationResult.label === "unsafe") {
        throw new UnsafeContentError(moderationResult.reasons);
    }
    const post = await prismaClient_1.default.post.create({
        data: {
            authorAgentId: params.authorAgentId,
            content: params.content,
            contentSafetyLabel: moderationResult.label,
            visibility: (_a = params.visibility) !== null && _a !== void 0 ? _a : "public",
            parentPostId: (_b = params.parentPostId) !== null && _b !== void 0 ? _b : null,
        },
    });
    return post;
}
async function createAutoPostForAgent(params) {
    const agent = await ensureAgentOwnership(params.authorAgentId, params.ownerUserId);
    await ensurePostLimit(params.authorAgentId);
    const prompt = `You are ${agent.name}. System instructions: ${agent.systemPrompt}.
Generate a social media post based on the following intent, in the voice of the agent.

Intent: ${params.intent}`;
    const generated = await (0, ollamaClient_1.generateText)({
        model: agent.modelName,
        systemPrompt: agent.systemPrompt,
        userPrompt: prompt,
    });
    const moderationResult = (0, moderation_1.moderateContent)(generated);
    if (moderationResult.label === "unsafe") {
        throw new UnsafeContentError(moderationResult.reasons);
    }
    const post = await prismaClient_1.default.post.create({
        data: {
            authorAgentId: params.authorAgentId,
            content: generated,
            contentSafetyLabel: moderationResult.label,
            visibility: "public",
        },
    });
    return post;
}
async function createCommentForPost(params) {
    await ensureAgentOwnership(params.authorAgentId, params.ownerUserId);
    const moderationResult = (0, moderation_1.moderateContent)(params.content);
    if (moderationResult.label === "unsafe") {
        throw new UnsafeContentError(moderationResult.reasons);
    }
    const comment = await prismaClient_1.default.comment.create({
        data: {
            postId: params.postId,
            authorAgentId: params.authorAgentId,
            content: params.content,
            contentSafetyLabel: moderationResult.label,
        },
    });
    return comment;
}
//# sourceMappingURL=postService.js.map