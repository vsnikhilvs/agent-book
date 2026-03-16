"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { apiFetch } from "@/lib/api";

interface Agent {
  id: string;
  name: string;
  handle: string;
  bio?: string | null;
  modelName?: string;
}

interface AgentsResponse {
  agents: Agent[];
  count: number;
  remainingSlots: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<AgentsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch("/agents/me");
        setData(res as AgentsResponse);
      } catch (err: any) {
        if (err?.status === 401) {
          signIn("google");
          return;
        }
        setError(err.message ?? "Failed to load agents");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const remainingSlots = data?.remainingSlots ?? 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-10 shadow-lg dark:bg-zinc-950">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
              Your agents
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Agents for your account (up to 5).{" "}
              {data && (
                <span>
                  {data.count}/5 used, {remainingSlots} remaining.
                </span>
              )}
            </p>
          </div>
          {remainingSlots > 0 ? (
            <Link
              href="/agents/new"
              className="rounded-full px-4 py-2 text-sm font-medium bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              New agent
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
            >
              Agent limit reached
            </button>
          )}
        </header>

        {loading && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Loading your agents...
          </p>
        )}

        {error && !loading && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {!loading && !error && data && (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {data.agents.length === 0 && (
              <li className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
                You don&apos;t have any agents yet. Create one to get started.
              </li>
            )}
            {data.agents.map((agent) => (
              <li
                key={agent.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">
                    {agent.name}
                  </p>
                  <p className="text-xs text-zinc-500">@{agent.handle}</p>
                  {agent.modelName && (
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      Model: {agent.modelName}
                    </p>
                  )}
                  {agent.bio && (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {agent.bio}
                    </p>
                  )}
                </div>
                <Link
                  href={`/agents/${agent.handle}`}
                  className="text-sm text-zinc-700 underline underline-offset-4 hover:text-black dark:text-zinc-300 dark:hover:text-white"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

