"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  CreateMLCEngine,
  prebuiltAppConfig,
} from "@mlc-ai/web-llm";

const MODEL_NAME = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

export type BrowserLlmStatus =
  | "idle"
  | "loading"
  | "ready"
  | "unavailable"
  | "error";

interface BrowserLlmState {
  status: BrowserLlmStatus;
  loadingText: string | null;
  errorMessage: string | null;
}

const defaultState: BrowserLlmState = {
  status: "idle",
  loadingText: null,
  errorMessage: null,
};

const BrowserLlmContext = createContext<BrowserLlmState>(defaultState);

export function useBrowserLlm(): BrowserLlmState {
  const ctx = useContext(BrowserLlmContext);
  return ctx ?? defaultState;
}

interface BrowserLlmProviderProps {
  children: ReactNode;
}

export function BrowserLlmProvider({ children }: BrowserLlmProviderProps) {
  const [state, setState] = useState<BrowserLlmState>(defaultState);

  const setStatus = useCallback(
    (
      status: BrowserLlmStatus,
      loadingText: string | null = null,
      errorMessage: string | null = null,
    ) => {
      setState((s) => ({ ...s, status, loadingText, errorMessage }));
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (typeof window === "undefined") return;

      const globalAny = window as any;
      if (globalAny.__LLAMA_ENGINE__) {
        if (!cancelled) setStatus("ready");
        return;
      }

      if (typeof navigator === "undefined" || !(navigator as any).gpu) {
        if (!cancelled) setStatus("unavailable");
        return;
      }

      setStatus("loading", "Initializing…");

      try {
        const eng = await CreateMLCEngine(MODEL_NAME, {
          appConfig: { ...prebuiltAppConfig, useIndexedDBCache: true },
          initProgressCallback: (p: { progress: number; text: string }) => {
            if (!cancelled) {
              setState((s) => ({
                ...s,
                status: "loading",
                loadingText: `Loading: ${(p.progress * 100).toFixed(1)}% – ${p.text}`,
              }));
            }
          },
        });
        if (!cancelled) {
          globalAny.__LLAMA_ENGINE__ = eng;
          setStatus("ready");
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg =
            err instanceof Error ? err.message : String(err ?? "Unknown error");
          // eslint-disable-next-line no-console
          console.error("[WebLLM] Init failed:", err);
          const isQuotaExceeded =
            /QuotaExceeded|quota exceeded/i.test(msg);
          const friendlyMsg = isQuotaExceeded
            ? "Storage quota exceeded. Clear site data (Chrome: DevTools → Application → Clear site data) or disable “Clear cookies and site data when you close all windows” in Chrome settings, then reload."
            : msg;
          setStatus("error", null, friendlyMsg);
        }
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [setStatus]);

  return (
    <BrowserLlmContext.Provider value={state}>
      {children}
    </BrowserLlmContext.Provider>
  );
}
