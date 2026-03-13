"use client";

import { useEffect, useState } from "react";
import { CreateMLCEngine, type MLCEngineInterface } from "@mlc-ai/web-llm";

const MODEL_NAME = "Llama-3.2-1B-Instruct-q4f32_1-MLC";
const HF_REPO_ID = "mlc-ai/Llama-3.2-1B-Instruct-q4f32_1-MLC";

interface Progress {
  progress: number;
  text: string;
}

export function BrowserLlama() {
  const [engine, setEngine] = useState<MLCEngineInterface | null>(null);
  const [loadingText, setLoadingText] = useState<string>("Initializing…");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Ensure we are in a browser environment with WebGPU support.
      if (typeof window === "undefined") {
        setError("Llama can only run in the browser.");
        setLoadingText("Unavailable in this environment.");
        return;
      }
      if (typeof navigator === "undefined" || !(navigator as any).gpu) {
        setError(
          "WebGPU is not supported in this browser. Please use a modern browser (e.g. Chrome or Edge) with WebGPU enabled.",
        );
        setLoadingText("WebGPU not available.");
        return;
      }

      try {
        const globalAny = window as any;
        if (globalAny.__LLAMA_ENGINE__) {
          if (!cancelled) {
            setEngine(globalAny.__LLAMA_ENGINE__);
            setLoadingText("Ready");
          }
          return;
        }

        const eng = await CreateMLCEngine(MODEL_NAME, {
          initProgressCallback: (p: Progress) => {
            if (!cancelled) {
              setLoadingText(
                `Loading model: ${(p.progress * 100).toFixed(1)}% – ${p.text}`,
              );
            }
          },
        });

        if (!cancelled) {
          setEngine(eng);
          setLoadingText("Ready");
          globalAny.__LLAMA_ENGINE__ = eng;
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "Failed to initialize WebLLM");
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleGenerate() {
    if (!engine || !input.trim()) return;
    setGenerating(true);
    setError(null);
    setOutput("");

    try {
      const res = await engine.chat.completions.create({
        messages: [{ role: "user", content: input }],
        max_tokens: 128,
        temperature: 0.7,
      });

      const choice = res.choices[0];
      const messageContent = choice.message.content as any;
      const content =
        typeof messageContent === "string"
          ? messageContent
          : Array.isArray(messageContent)
            ? (messageContent as any[])
                .map((c) => (typeof c === "string" ? c : c?.text ?? ""))
                .join("")
            : "";

      setOutput(content.trim());
    } catch (e: any) {
      setError(e?.message ?? "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  const notReady = !engine;

  return (
    <div className="space-y-3">
      {notReady && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {loadingText}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="w-full rounded-md border border-zinc-300 bg-white p-2 text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        placeholder="Ask Llama‑3.2‑1B‑Instruct‑q4f32_1 something..."
      />

      <button
        type="button"
        onClick={handleGenerate}
        disabled={notReady || generating}
        className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
      >
        {notReady
          ? "Loading model…"
          : generating
            ? "Generating…"
            : "Generate"}
      </button>

      {output && (
        <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
          {output}
        </pre>
      )}
    </div>
  );
}

