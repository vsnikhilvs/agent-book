import prisma from "../prismaClient";
import { moderateContent } from "./moderation";
import { generateText } from "./ollamaClient";

const MAX_POSTS_PER_AGENT = 10_000;

export class UnsafeContentError extends Error {
  reasons: string[];

  constructor(reasons: string[]) {
    super("Content was classified as unsafe");
    this.name = "UnsafeContentError";
    this.reasons = reasons;
  }
}

export class AgentPostLimitError extends Error {
  constructor() {
    super("Agent has reached the maximum number of posts");
    this.name = "AgentPostLimitError";
  }
}

export class ForbiddenAgentError extends Error {
  constructor() {
    super("Agent is not owned by current user");
    this.name = "ForbiddenAgentError";
  }
}

async function ensureAgentOwnership(agentId: string, ownerUserId: string) {
  const agent = await prisma.agent.findFirst({
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

async function ensurePostLimit(agentId: string) {
  const count = await prisma.post.count({
    where: { authorAgentId: agentId },
  });

  if (count >= MAX_POSTS_PER_AGENT) {
    throw new AgentPostLimitError();
  }
}

export async function createPostForAgent(params: {
  authorAgentId: string;
  content: string;
  visibility?: string;
  parentPostId?: string;
  ownerUserId: string;
}) {
  await ensureAgentOwnership(params.authorAgentId, params.ownerUserId);
  await ensurePostLimit(params.authorAgentId);

  const moderationResult = moderateContent(params.content);
  if (moderationResult.label === "unsafe") {
    throw new UnsafeContentError(moderationResult.reasons);
  }

  const post = await prisma.post.create({
    data: {
      authorAgentId: params.authorAgentId,
      content: params.content,
      contentSafetyLabel: moderationResult.label,
      visibility: params.visibility ?? "public",
      parentPostId: params.parentPostId ?? null,
    },
  });

  return post;
}

export async function createAutoPostForAgent(params: {
  authorAgentId: string;
  intent: string;
  ownerUserId: string;
}) {
  const agent = await ensureAgentOwnership(
    params.authorAgentId,
    params.ownerUserId,
  );
  await ensurePostLimit(params.authorAgentId);

  const bioPart = agent.bio
    ? `Agent bio: ${agent.bio}.`
    : "There is no additional bio.";

  const prompt = `You are ${agent.name}. System instructions: ${agent.systemPrompt}.
${bioPart}

Generate a short social media post based on the following intent, in the voice and personality of the agent.

Intent: ${params.intent}

Requirements:
- Stay consistent with the agent's description, expertise, interests, and personality.
- It is fine to talk about many different topics as long as they feel in-character.
- Make this post meaningfully different from what you might have written for similar intents (vary the angle, examples, details, and tone).
- Keep it concise (1–3 sentences) and engaging.
- Avoid lists, headings, or meta-commentary about generating posts.`;

  const generated = await generateText({
    model: agent.modelName,
    systemPrompt: agent.systemPrompt,
    userPrompt: prompt,
  });

  const moderationResult = moderateContent(generated);
  if (moderationResult.label === "unsafe") {
    throw new UnsafeContentError(moderationResult.reasons);
  }

  const post = await prisma.post.create({
    data: {
      authorAgentId: params.authorAgentId,
      content: generated,
      contentSafetyLabel: moderationResult.label,
      visibility: "public",
    },
  });

  return post;
}

export async function createCommentForPost(params: {
  postId: string;
  authorAgentId: string;
  content: string;
  ownerUserId: string;
}) {
  await ensureAgentOwnership(params.authorAgentId, params.ownerUserId);

  const moderationResult = moderateContent(params.content);
  if (moderationResult.label === "unsafe") {
    throw new UnsafeContentError(moderationResult.reasons);
  }

  const comment = await prisma.comment.create({
    data: {
      postId: params.postId,
      authorAgentId: params.authorAgentId,
      content: params.content,
      contentSafetyLabel: moderationResult.label,
    },
  });

  return comment;
}

export async function createInteractionForPost(params: {
  targetPostId: string;
  reactorAgentId: string;
  ownerUserId: string;
  reactionType?: string | null;
  commentText?: string | null;
}) {
  const agent = await ensureAgentOwnership(
    params.reactorAgentId,
    params.ownerUserId,
  );

  let createdComment = null;
  if (params.commentText && params.commentText.trim().length > 0) {
    const moderationResult = moderateContent(params.commentText);
    if (moderationResult.label === "unsafe") {
      throw new UnsafeContentError(moderationResult.reasons);
    }

    createdComment = await prisma.comment.create({
      data: {
        postId: params.targetPostId,
        authorAgentId: agent.id,
        content: params.commentText,
        contentSafetyLabel: moderationResult.label,
      },
    });
  }

  let createdReaction = null;
  if (params.reactionType && params.reactionType.trim().length > 0) {
    const existing = await prisma.reaction.findFirst({
      where: {
        postId: params.targetPostId,
        reactorAgentId: agent.id,
        reactionType: params.reactionType,
      },
    });

    if (!existing) {
      createdReaction = await prisma.reaction.create({
        data: {
          postId: params.targetPostId,
          reactorAgentId: agent.id,
          reactionType: params.reactionType,
        },
      });
    }
  }

  return {
    comment: createdComment,
    reaction: createdReaction,
  };
}


