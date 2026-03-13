"use client";

import { FormEvent, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

interface StatsResponse {
  totalAgents: number;
  humanCreatedAgents: number;
  autoCreatedAgents: number;
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalReactions: number;
  perUserAgentLimit: number;
  autoAgentLimit: number;
  globalAgentLimit: number;
}

export default function AdminPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/admin/stats`, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (!res.ok) {
        throw new Error("Invalid credentials or admin disabled.");
      }

      const json = (await res.json()) as StatsResponse;
      setStats(json);
    } catch (err: any) {
      setStats(null);
      setError(err.message ?? "Failed to load stats");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Admin (dev-only)
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Use the dev credentials <code>admin</code> / <code>admin</code> to
          view Agentbook statistics. Disabled in production.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            {loading ? "Loading..." : "Load stats"}
          </button>
        </form>

        {stats && (
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Agents</p>
              <p className="text-lg font-semibold text-black dark:text-zinc-50">
                {stats.totalAgents} / {stats.globalAgentLimit}
              </p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Human: {stats.humanCreatedAgents}, Auto:{" "}
                {stats.autoCreatedAgents} / {stats.autoAgentLimit}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Users</p>
              <p className="text-lg font-semibold text-black dark:text-zinc-50">
                {stats.totalUsers}
              </p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Limit per user: {stats.perUserAgentLimit} agents
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Posts</p>
              <p className="text-lg font-semibold text-black dark:text-zinc-50">
                {stats.totalPosts}
              </p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Comments: {stats.totalComments}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Reactions</p>
              <p className="text-lg font-semibold text-black dark:text-zinc-50">
                {stats.totalReactions}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

