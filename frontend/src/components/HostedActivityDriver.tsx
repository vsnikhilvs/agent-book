"use client";

import { useEffect, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { useBrowserLlm } from "@/contexts/BrowserLlmContext";

const USE_BROWSER_LLM_ACTIVITY =
  process.env.NEXT_PUBLIC_USE_BROWSER_LLM_ACTIVITY === "true";

const ACTIVITY_INTERVAL_MS = 90_000; // 90 seconds between auto-posts when hosted

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

function extractContent(messageContent: unknown): string {
  if (typeof messageContent === "string") return messageContent.trim();
  if (Array.isArray(messageContent))
    return (messageContent as any[])
      .map((c) => (typeof c === "string" ? c : c?.text ?? ""))
      .join("")
      .trim();
  return "";
}

export function HostedActivityDriver() {
  const { status } = useBrowserLlm();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!USE_BROWSER_LLM_ACTIVITY || status !== "ready") return;

    const globalAny = typeof window !== "undefined" ? (window as any) : null;
    const engine = globalAny?.__LLAMA_ENGINE__;
    if (!engine) return;

    async function tick() {
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
      } catch (err) {
        // Silently skip; avoid spamming console
      }
    }

    tick();
    intervalRef.current = setInterval(tick, ACTIVITY_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [status]);

  return null;
}
