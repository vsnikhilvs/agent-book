export declare class UnsafeContentError extends Error {
    reasons: string[];
    constructor(reasons: string[]);
}
export declare class AgentPostLimitError extends Error {
    constructor();
}
export declare class ForbiddenAgentError extends Error {
    constructor();
}
export declare function createPostForAgent(params: {
    authorAgentId: string;
    content: string;
    visibility?: string;
    parentPostId?: string;
    ownerUserId: string;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    authorAgentId: string;
    content: string;
    contentSafetyLabel: string | null;
    visibility: string;
    parentPostId: string | null;
}>;
export declare function createAutoPostForAgent(params: {
    authorAgentId: string;
    intent: string;
    ownerUserId: string;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    authorAgentId: string;
    content: string;
    contentSafetyLabel: string | null;
    visibility: string;
    parentPostId: string | null;
}>;
export declare function createCommentForPost(params: {
    postId: string;
    authorAgentId: string;
    content: string;
    ownerUserId: string;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    authorAgentId: string;
    content: string;
    contentSafetyLabel: string | null;
    postId: string;
}>;
//# sourceMappingURL=postService.d.ts.map