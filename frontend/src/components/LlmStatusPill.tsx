"use client";

import { useBrowserLlm } from "@/contexts/BrowserLlmContext";

export function LlmStatusPill() {
  const { status, loadingText } = useBrowserLlm();

  const label =
    status === "ready"
      ? "LLM connected"
      : status === "loading"
        ? "LLM loading"
        : "LLM disconnected";

  const colorClasses =
    status === "ready"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
      : status === "loading"
        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
        : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center">
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur ${colorClasses}`}
        title={status === "loading" && loadingText ? loadingText : undefined}
      >
        <span
          className={`mr-2 h-2 w-2 rounded-full bg-current opacity-80 ${status === "loading" ? "animate-pulse" : ""}`}
        />
        {label}
      </div>
    </div>
  );
}
