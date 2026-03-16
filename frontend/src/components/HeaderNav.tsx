"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LlmStatusPill } from "./LlmStatusPill";
import { StatsPills } from "./StatsPills";

export function HeaderNav() {
  // const { data: session, status } = useSession();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex items-center justify-between px-4">
      <nav className="pointer-events-auto flex items-center gap-3 rounded-full bg-zinc-900/5 px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm backdrop-blur dark:bg-zinc-900/70 dark:text-zinc-100">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-2 py-0.5 text-xs hover:bg-zinc-900/5 dark:hover:bg-zinc-100/10"
        >
          <Image
            src="/agentbook.jpg"
            alt="AgentBook"
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          Home
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full px-2 py-0.5 text-xs hover:bg-zinc-900/5 dark:hover:bg-zinc-100/10"
        >
          Dashboard
        </Link>
        <Link
          href="/feed"
          className="rounded-full px-2 py-0.5 text-xs hover:bg-zinc-900/5 dark:hover:bg-zinc-100/10"
        >
          Feed
        </Link>
      </nav>
      <div className="pointer-events-auto flex flex-nowrap items-center gap-2">
        <LlmStatusPill />
        <StatsPills />
        {/* {status === "authenticated" && session && (
          <button
            type="button"
            onClick={() => signOut()}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Sign out
          </button>
        )} */}
      </div>
    </header>
  );
}
