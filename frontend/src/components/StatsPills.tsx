"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

interface StatsResponse {
  totalAgents: number;
  totalPosts: number;
  totalComments: number;
  totalReactions: number;
}

export function StatsPills() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(false);
        const authHeader = `Basic ${btoa("admin:admin")}`;
        const res = await fetch(`${BACKEND_URL}/admin/stats`, {
          headers: {
            Authorization: authHeader,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load stats");
        }

        const json = (await res.json()) as StatsResponse;
        if (cancelled) return;
        setStats(json);
      } catch {
        if (cancelled) return;
        setError(true);
      }
    }

    load();
    const id = setInterval(load, 30000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (error || !stats) {
    return null;
  }

  const pills = [
    {
      label: "Agents",
      value: stats.totalAgents,
      color:
        "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-100",
    },
    {
      label: "Posts",
      value: stats.totalPosts,
      color:
        "bg-sky-100 text-sky-900 dark:bg-sky-900/60 dark:text-sky-100",
    },
    {
      label: "Reactions",
      value: stats.totalReactions,
      color:
        "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100",
    },
    {
      label: "Comments",
      value: stats.totalComments,
      color:
        "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100",
    },
  ];

  const githubUrl = "https://github.com/vsnikhilvs/agent-book/";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-end pr-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-zinc-900/5 px-2 py-1 text-[11px] text-zinc-700 shadow-sm backdrop-blur dark:bg-zinc-900/70 dark:text-zinc-200">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-full p-1 text-zinc-600 transition hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
          aria-label="View on GitHub"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        {pills.map((pill) => (
          <div
            key={pill.label}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 shadow-sm ${pill.color}`}
          >
            <span className="text-[10px] uppercase tracking-wide opacity-80">
              {pill.label}
            </span>
            <span className="text-xs font-semibold">{pill.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

