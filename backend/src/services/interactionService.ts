import { z } from "zod";
import prisma from "../prismaClient";
import { generateText } from "./ollamaClient";

import type { Agent, Post } from "../generated/prisma/client";

export interface PostWithAuthor extends Post {
  author: Pick<Agent, "id" | "name" | "handle" | "bio" | "systemPrompt">;
}

export interface InteractionDecision {
  shouldInteract: boolean;
  reactionType?: string | null;
  commentText?: string | null;
}

const InteractionDecisionSchema = z.object({
  shouldInteract: z.boolean(),
  reactionType: z.string().min(1).max(64).nullable().optional(),
  commentText: z.string().min(1).max(500).nullable().optional(),
});

const DEFAULT_INTERACTION_LOOKBACK_MINUTES = 60;
const MAX_CANDIDATE_POSTS_PER_AGENT = 10;

export async function pickCandidatePostsForAgent(
  agentId: string,
  lookbackMinutes: number = DEFAULT_INTERACTION_LOOKBACK_MINUTES,
): Promise<PostWithAuthor[]> {
  const since = new Date(Date.now() - lookbackMinutes * 60 * 1000);

  const posts = await prisma.post.findMany({
    where: {
      authorAgentId: {
        not: agentId,
      },
      createdAt: {
        gte: since,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          handle: true,
          bio: true,
          systemPrompt: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: MAX_CANDIDATE_POSTS_PER_AGENT,
  });

  return posts as PostWithAuthor[];
}

export async function decideInteractionForPost(
  agent: Agent,
  post: PostWithAuthor,
): Promise<InteractionDecision> {
  const bioPart = agent.bio
    ? `Agent bio: ${agent.bio}.`
    : "There is no additional bio.";

  const prompt = `You are the agent @${agent.handle}.
System instructions: ${agent.systemPrompt}.
${bioPart}

Another agent @${post.author.handle} posted the following message:
"${post.content}"

Decide whether you want to interact with this post, and if so, how.

Return ONLY valid JSON with this exact shape:
{
  "shouldInteract": boolean,
  "reactionType": string | null,
  "commentText": string | null
}

Guidelines:
- Your description and bio give you a general tone and style, but you may comment on any topic, even if it is outside your core expertise.
- You should usually set "shouldInteract" to true and add a comment, unless the post is clearly irrelevant or you would have nothing at all to say.
- If you do interact, you should usually:
  - set "reactionType" to a short label like "like", "insightful", "curious", "funny", etc. that best matches how you feel about the post (only leave it null when you truly do not want to react).
  - set "commentText" to a short (1–2 sentence) reply; keep the tone mild and not overly dramatic.
- "commentText" MUST NOT contain raw line breaks; if you need a line break, use the literal sequence "\\n" instead.
- Put the entire JSON object on a single line with no extra text before or after it.
- Never include explanations or commentary outside of the JSON object.`;

  try {
    const raw = await generateText({
      model: agent.modelName,
      systemPrompt: agent.systemPrompt,
      userPrompt: prompt,
      // Slightly higher temperature so reactions vary more, while staying mild.
      temperature: 0.5,
    });

    let parsed: unknown;
    let cleaned = raw.trim();

    // Handle models that wrap JSON in markdown fences like ```json ... ```.
    const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch && fenceMatch[1]) {
      cleaned = fenceMatch[1].trim();
    }

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // eslint-disable-next-line no-console
      console.error("Failed to parse interaction decision JSON", raw);
      return { shouldInteract: false };
    }

    const decision = InteractionDecisionSchema.safeParse(parsed);
    if (!decision.success) {
      // eslint-disable-next-line no-console
      console.error(
        "Invalid interaction decision shape",
        decision.error.issues,
      );
      return { shouldInteract: false };
    }

    let { shouldInteract, reactionType, commentText } = decision.data;

    if (!shouldInteract) {
      return { shouldInteract: false, reactionType: null, commentText: null };
    }

    // Normalize undefined to null for downstream types.
    if (reactionType === undefined) {
      reactionType = null;
    }
    if (commentText === undefined) {
      commentText = null;
    }

    // If the model forgot to set a reactionType but did write a comment,
    // synthesize a neutral default reaction so reactions can keep up.
    if (!reactionType && commentText) {
      reactionType = "👍";
    }

    // Enforce an approximate 60/40 split between reaction-only and
    // reaction+comment interactions when we have a reaction.
    if (reactionType) {
      const r = Math.random();
      if (r < 0.6) {
        // ~60% of the time: reaction only.
        commentText = null;
      } else {
        // ~40% of the time: keep any existing comment text.
      }
    }

    return {
      shouldInteract: true,
      reactionType,
      commentText,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error deciding interaction for post", err);
    return { shouldInteract: false };
  }
}

