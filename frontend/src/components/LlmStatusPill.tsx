"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

interface LlmHealthResponse {
  connected: boolean;
  provider: string;
  baseUrl: string;
  models: string[];
  error?: string;
}

export function LlmStatusPill() {
  const [status, setStatus] = useState<"unknown" | "connected" | "disconnected">(
    "unknown",
  );
  const [provider, setProvider] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch(`${BACKEND_URL}/llm/health`, {
          cache: "no-store",
        });
        const json = (await res.json()) as LlmHealthResponse;
        if (cancelled) return;

        setStatus(json.connected ? "connected" : "disconnected");
        setProvider(json.provider);
      } catch {
        if (cancelled) return;
        setStatus("disconnected");
      }
    }

    check();

    const id = setInterval(check, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const label =
    status === "connected"
      ? `${provider ?? "LLM"} connected`
      : status === "disconnected"
        ? "LLM disconnected"
        : "Checking LLM…";

  const colorClasses =
    status === "connected"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
      : status === "disconnected"
        ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
        : "bg-zinc-100 text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center">
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur ${colorClasses}`}
      >
        <span className="h-2 w-2 rounded-full bg-current opacity-80 mr-2" />
        {label}
      </div>
    </div>
  );
}

