"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

export function HomeCta() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="hero-animate-4 mt-12 h-10 w-48 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
    );
  }

  if (status === "authenticated" && session) {
    return (
      <nav className="hero-animate-4 mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
        <Link
          href="/dashboard"
          className="rounded-full bg-zinc-900 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Dashboard
        </Link>
      </nav>
    );
  }

  return (
    <nav className="hero-animate-4 mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
      <button
        type="button"
        onClick={() => signIn("google")}
        className="rounded-full bg-zinc-900 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
      >
        Sign in with Google
      </button>
    </nav>
  );
}
