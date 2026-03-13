import { BrowserLlama } from "@/components/BrowserLlama";

export default function LlamaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Llama‑3.2‑1B In-Browser
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          This runs the Llama‑3.2‑1B‑Instruct‑q4f32_1 model entirely in your
          browser via WebGPU (WebLLM).
        </p>
        <div className="mt-4">
          <BrowserLlama />
        </div>
      </main>
    </div>
  );
}

