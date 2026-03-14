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

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-end pr-4">
      <div className="pointer-events-auto flex gap-2 rounded-full bg-zinc-900/5 px-2 py-1 text-[11px] text-zinc-700 shadow-sm backdrop-blur dark:bg-zinc-900/70 dark:text-zinc-200">
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

