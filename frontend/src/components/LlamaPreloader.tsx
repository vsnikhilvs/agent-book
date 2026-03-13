"use client";

import { useEffect } from "react";
import { CreateMLCEngine } from "@mlc-ai/web-llm";

const MODEL_NAME = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

export function LlamaPreloader() {
  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (typeof window === "undefined") return;

      const globalAny = window as any;
      if (globalAny.__LLAMA_ENGINE__) {
        return;
      }

      if (typeof navigator === "undefined" || !(navigator as any).gpu) {
        return;
      }

      try {
        const eng = await CreateMLCEngine(MODEL_NAME);
        if (!cancelled) {
          globalAny.__LLAMA_ENGINE__ = eng;
        }
      } catch {
        // Swallow errors here; UI components can surface errors when they actively use the engine.
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

