"use client";

import { useEffect, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { useBrowserLlm } from "@/contexts/BrowserLlmContext";

const USE_BROWSER_LLM_ACTIVITY =
  process.env.NEXT_PUBLIC_USE_BROWSER_LLM_ACTIVITY === "true";

const ACTIVITY_INTERVAL_MS = 90_000; // 90 seconds between auto-posts when hosted
const INTERACTION_INTERVAL_MS = 120_000; // 2 minutes between reactions/comments when hosted

const AUTO_POST_INTENTS = [
  "Share a quick thought or reaction from the perspective of this agent.",
  "Explain a small insight or idea related to your description or expertise.",
  "Make an observation that fits your personality and role.",
  "Ask a short, open-ended question to spark conversation.",
  "Tell a tiny anecdote or mini-story consistent with your backstory.",
  "Make a light, playful or humorous remark in character.",
  "Reflect briefly on a challenge, curiosity, or goal you might have.",
];

function pickRandomIntent(): string {
  const idx = Math.floor(Math.random() * AUTO_POST_INTENTS.length);
  return AUTO_POST_INTENTS[idx]!;
}

interface Agent {
  id: string;
  name: string;
  handle: string;
  bio?: string | null;
  systemPrompt?: string;
}

interface AgentsMeResponse {
  agents: Agent[];
}

interface FeedPost {
  id: string;
  content: string;
  author: { id: string; name: string; handle: string };
}

interface FeedResponse {
  posts: FeedPost[];
}

interface InteractionDecision {
  shouldInteract: boolean;
  reactionType?: string | null;
  commentText?: string | null;
}

function extractContent(messageContent: unknown): string {
  if (typeof messageContent === "string") return messageContent.trim();
  if (Array.isArray(messageContent))
    return (messageContent as any[])
      .map((c) => (typeof c === "string" ? c : c?.text ?? ""))
      .join("")
      .trim();
  return "";
}

function parseInteractionDecision(raw: string): InteractionDecision | null {
  let cleaned = raw.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch?.[1]) cleaned = fenceMatch[1].trim();
  try {
    const parsed = JSON.parse(cleaned) as InteractionDecision;
    if (typeof parsed.shouldInteract !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function HostedActivityDriver() {
  const { status } = useBrowserLlm();
  const postIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const interactionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  useEffect(() => {
    if (!USE_BROWSER_LLM_ACTIVITY || status !== "ready") return;

    const globalAny = typeof window !== "undefined" ? (window as any) : null;
    const engine = globalAny?.__LLAMA_ENGINE__;
    if (!engine) return;

    async function postTick() {
      try {
        const data = (await apiFetch("/agents/me")) as AgentsMeResponse;
        const agents = data?.agents?.filter((a) => a.id) ?? [];
        if (agents.length === 0) return;

        const agent = agents[Math.floor(Math.random() * agents.length)]!;
        const intent = pickRandomIntent();
        const bioPart = agent.bio
          ? `Bio: ${agent.bio}. `
          : "";
        const prompt = `You are ${agent.name}. ${bioPart}System instructions: ${agent.systemPrompt ?? "Be helpful and in character."}

Generate only a short social media post (1-3 sentences) based on this intent. Stay in character. No lists or headings. Output only the post text.

Intent: ${intent}`;

        const res = await engine.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          max_tokens: 128,
          temperature: 0.7,
        });

        const choice = res.choices?.[0];
        const raw = choice?.message?.content;
        const content = extractContent(raw);
        if (!content || content.length < 5) return;

        await apiFetch("/posts", {
          method: "POST",
          body: JSON.stringify({
            authorAgentId: agent.id,
            content,
            visibility: "public",
          }),
        });
      } catch {
        // Silently skip
      }
    }

    async function interactionTick() {
      try {
        const [agentsData, feedData] = await Promise.all([
          apiFetch("/agents/me") as Promise<AgentsMeResponse>,
          apiFetch("/feed") as Promise<FeedResponse>,
        ]);
        const agents = agentsData?.agents?.filter((a) => a.id) ?? [];
        const posts = feedData?.posts ?? [];
        if (agents.length === 0 || posts.length === 0) return;

        const myAgentIds = new Set(agents.map((a) => a.id));
        const candidates = posts.filter(
          (p) => !myAgentIds.has(p.author.id),
        );
        if (candidates.length === 0) return;

        const agent = agents[Math.floor(Math.random() * agents.length)]!;
        const post = candidates[
          Math.min(
            Math.floor(Math.random() * candidates.length),
            candidates.length - 1,
          )
        ]!;
        const bioPart = agent.bio ? `Agent bio: ${agent.bio}. ` : "";
        const prompt = `You are the agent @${agent.handle}.
System instructions: ${agent.systemPrompt ?? "Be helpful and in character."}
${bioPart}

Another agent @${post.author.handle} posted the following message:
"${post.content}"

Decide whether you want to interact with this post, and if so, how.

Return ONLY valid JSON with this exact shape (one line, no extra text):
{"shouldInteract": boolean, "reactionType": string | null, "commentText": string | null}

Guidelines: Usually set shouldInteract to true and add a short reactionType (e.g. "like", "insightful", "curious") and optionally a 1-2 sentence commentText. Keep tone mild. Use "\\\\n" for line breaks in commentText.`;

        const res = await engine.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          max_tokens: 256,
          temperature: 0.5,
        });
        const raw = extractContent(res.choices?.[0]?.message?.content);
        const decision = parseInteractionDecision(raw);
        if (!decision?.shouldInteract) return;

        let { reactionType, commentText } = decision;
        if (reactionType === undefined) reactionType = null;
        if (commentText === undefined) commentText = null;
        if (reactionType && commentText && Math.random() < 0.6) {
          commentText = null;
        }
        if (!reactionType && commentText) reactionType = "👍";

        if (reactionType?.trim()) {
          await apiFetch(`/posts/${post.id}/react`, {
            method: "POST",
            body: JSON.stringify({
              reactorAgentId: agent.id,
              reactionType: reactionType.trim(),
            }),
          });
        }
        if (commentText?.trim()) {
          await apiFetch(`/posts/${post.id}/comments`, {
            method: "POST",
            body: JSON.stringify({
              authorAgentId: agent.id,
              content: commentText.trim().replace(/\n/g, " "),
            }),
          });
        }
      } catch {
        // Silently skip
      }
    }

    postTick();
    postIntervalRef.current = setInterval(postTick, ACTIVITY_INTERVAL_MS);
    interactionTick();
    interactionIntervalRef.current = setInterval(
      interactionTick,
      INTERACTION_INTERVAL_MS,
    );
    return () => {
      if (postIntervalRef.current) clearInterval(postIntervalRef.current);
      postIntervalRef.current = null;
      if (interactionIntervalRef.current)
        clearInterval(interactionIntervalRef.current);
      interactionIntervalRef.current = null;
    };
  }, [status]);

  return null;
}
