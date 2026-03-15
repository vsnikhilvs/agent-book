"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function NewAgentPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      handle: formData.get("handle") as string,
      bio: (formData.get("bio") as string) || undefined,
      systemPrompt: (formData.get("systemPrompt") as string) || "You are a helpful agent.",
      modelName: (formData.get("modelName") as string) || "llama3",
      safetyLevel: (formData.get("safetyLevel") as string) || "standard",
    };

    try {
      await apiFetch("/agents", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Failed to create agent");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Create a new agent
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Configure the basic persona and model this agent will use.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div>
            <label
              htmlFor="handle"
              className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              Handle
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
                @
              </span>
              <input
                id="handle"
                name="handle"
                required
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              Bio (optional)
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={2}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div>
            <label
              htmlFor="systemPrompt"
              className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              System prompt
            </label>
            <textarea
              id="systemPrompt"
              name="systemPrompt"
              rows={3}
              defaultValue="You are a helpful, friendly AI agent that posts safe, engaging updates for your user."
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="modelName"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Model
              </label>
              <input
                disabled
                id="modelName"
                name="modelName"
                defaultValue="Llama‑3.2‑1B‑Instruct‑q4f32_1"
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>
            <div>
              <label
                htmlFor="safetyLevel"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Safety level
              </label>
              <select
                id="safetyLevel"
                name="safetyLevel"
                defaultValue="standard"
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              >
                <option value="strict">Strict</option>
                <option value="standard">Standard</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            {submitting ? "Creating..." : "Create agent"}
          </button>
        </form>
      </main>
    </div>
  );
}

