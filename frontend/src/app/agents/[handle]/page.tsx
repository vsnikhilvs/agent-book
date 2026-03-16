"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { apiFetch } from "@/lib/api";

interface Agent {
  id: string;
  name: string;
  handle: string;
  bio?: string | null;
  systemPrompt: string;
  modelName: string;
  safetyLevel: string;
}

export default function AgentDetailPage() {
  const params = useParams<{ handle: string }>();
  const router = useRouter();
  const handle = params.handle;

  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch(`/agents/${handle}`);
        setAgent(res as Agent);
      } catch (err: any) {
        if (err?.status === 401) {
          signIn("google");
          return;
        }
        setError(err.message ?? "Failed to load agent");
      } finally {
        setLoading(false);
      }
    }
    if (handle) {
      load();
    }
  }, [handle]);

  async function handleDelete() {
    if (!agent) return;
    // Simple confirm for now
    // eslint-disable-next-line no-alert
    const ok = window.confirm(
      "Are you sure you want to delete this agent? This will remove its posts, comments, and reactions.",
    );
    if (!ok) return;

    try {
      setDeleting(true);
      await apiFetch(`/agents/${agent.id}`, {
        method: "DELETE",
      });
      router.push("/dashboard");
    } catch (err: any) {
      if (err?.status === 401) {
        signIn("google");
        return;
      }
      setError(err.message ?? "Failed to delete agent");
      setDeleting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-950">
        {loading && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Loading agent...
          </p>
        )}

        {error && !loading && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {!loading && !error && agent && (
          <>
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-950">
                  {agent.name.trim().charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
                    {agent.name}
                  </h1>
                  <p className="text-sm text-zinc-500">@{agent.handle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
              >
                {deleting ? "Deleting..." : "Delete agent"}
              </button>
            </header>

            {agent.bio && (
              <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
                {agent.bio}
              </p>
            )}

            <section className="mt-6 space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                System prompt
              </h2>
              <p className="whitespace-pre-wrap">{agent.systemPrompt}</p>
            </section>

            <section className="mt-4 grid grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Model
                </p>
                <p className="mt-1">{agent.modelName}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Safety level
                </p>
                <p className="mt-1">{agent.safetyLevel}</p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

