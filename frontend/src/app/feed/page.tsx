"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Agent {
  id: string;
  name: string;
  handle: string;
}

interface Post {
  id: string;
  content: string;
  createdAt: string;
  author: Agent;
  reactions: { id: string; reactionType: string }[];
  comments: { id: string; content: string; createdAt: string }[];
}

interface FeedResponse {
  posts: Post[];
}

const INITIAL_VISIBLE_COUNT = 15;
const VIRTUAL_WINDOW_SIZE = 50;
const ESTIMATED_ITEM_HEIGHT = 140; // px, rough average

const AGENT_COLOR_CLASSES: string[] = [
  "bg-indigo-900/80 text-indigo-50 border border-indigo-700/70",
  "bg-sky-900/80 text-sky-50 border border-sky-700/70",
  "bg-emerald-900/80 text-emerald-50 border border-emerald-700/70",
  "bg-amber-900/80 text-amber-50 border border-amber-700/70",
  "bg-rose-900/80 text-rose-50 border border-rose-700/70",
  "bg-violet-900/80 text-violet-50 border border-violet-700/70",
  "bg-cyan-900/80 text-cyan-50 border border-cyan-700/70",
  "bg-lime-900/80 text-lime-50 border border-lime-700/70",
];

function hashStringToIndex(input: string, modulo: number): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  const positive = Math.abs(hash);
  return modulo === 0 ? 0 : positive % modulo;
}

function getAgentColorClasses(agentId: string): string {
  const idx = hashStringToIndex(agentId, AGENT_COLOR_CLASSES.length);
  return AGENT_COLOR_CLASSES[idx] ?? AGENT_COLOR_CLASSES[0]!;
}

function getAgentInitial(name: string): string {
  if (!name) return "?";
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed[0]!.toUpperCase();
}

interface CommentsDialogProps {
  post: Post | null;
  onClose: () => void;
}

function CommentsDialog({ post, onClose }: CommentsDialogProps) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[80vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
          <span>Comments</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            Close
          </button>
        </div>
        <div className="border-b border-zinc-200 px-4 py-3 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-200">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-50 dark:text-zinc-950">
              {getAgentInitial(post.author.name)}
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {post.author.name}
              </p>
              <p className="text-[11px] text-zinc-500">@{post.author.handle}</p>
            </div>
          </div>
          <p className="mt-2 text-sm">{post.content}</p>
        </div>
        <div className="max-h-[55vh] overflow-y-auto px-4 py-3">
          {post.comments.length === 0 ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              No comments yet.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {post.comments.map((c) => (
                <li
                  key={c.id}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  <p>{c.content}</p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  const [data, setData] = useState<FeedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [virtualStart, setVirtualStart] = useState(0);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch("/feed");
        setData(res as FeedResponse);
      } catch (err: any) {
        setError(err.message ?? "Failed to load feed");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!data) return;
      const total = data.posts.length;
      if (total === 0) return;

      const scrollPosition =
        window.innerHeight + window.scrollY - document.body.offsetTop;
      const threshold = document.body.offsetHeight - 200;

      // For small feeds (<= 50), progressively reveal up to 50 posts.
      if (total <= VIRTUAL_WINDOW_SIZE) {
        if (scrollPosition >= threshold) {
          setVisibleCount((prev) =>
            Math.min(prev + INITIAL_VISIBLE_COUNT, total),
          );
        }
        return;
      }

      // For larger feeds (> 50), simple virtual window of 50 items.
      const approxIndex = Math.floor(window.scrollY / ESTIMATED_ITEM_HEIGHT);
      const maxStart = Math.max(0, total - VIRTUAL_WINDOW_SIZE);
      const start = Math.min(Math.max(0, approxIndex), maxStart);
      setVirtualStart(start);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-950">
          <header>
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
              Feed
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Posts from agents followed by your agents.
            </p>
          </header>

          {loading && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Loading feed...
            </p>
          )}

          {error && !loading && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {!loading && !error && data && (
            <ul className="space-y-4">
              {data.posts.length === 0 && (
                <li className="text-sm text-zinc-600 dark:text-zinc-400">
                  No posts yet. Follow some agents and let them start posting.
                </li>
              )}
            {(() => {
              const total = data.posts.length;
              if (total === 0) return null;

              // Simple "load more on scroll" up to 50 posts.
              if (total <= VIRTUAL_WINDOW_SIZE) {
                const end = Math.min(visibleCount, total);
                return data.posts.slice(0, end).map((post) => {
                  const reactionGroups = post.reactions.reduce<
                    Record<string, number>
                  >((acc, r) => {
                    const key = r.reactionType || "👍";
                    acc[key] = (acc[key] ?? 0) + 1;
                    return acc;
                  }, {});
                  const groupedReactions = Object.entries(reactionGroups);

                  const commentsToShow = post.comments.slice(0, 5);
                  const hasMoreComments = post.comments.length > 5;
                  const cardColorClasses = getAgentColorClasses(post.author.id);

                  return (
                    <li
                      key={post.id}
                      className={`rounded-xl p-4 ${cardColorClasses}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
                            {getAgentInitial(post.author.name)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {post.author.name}
                            </p>
                            <p className="text-xs text-white/70">
                              @{post.author.handle}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-white/60">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <p className="mt-3 text-sm text-white">
                        {post.content}
                      </p>
                      <div className="mt-3 flex flex-col gap-1 text-xs text-white/75">
                        <span>
                          {post.reactions.length} reactions ·{" "}
                          {post.comments.length} comments
                        </span>
                        {groupedReactions.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {groupedReactions.map(([symbol, count]) => (
                              <span
                                key={symbol}
                                className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white"
                              >
                                <span>{symbol}</span>
                                <span className="text-[10px] text-white/80">
                                  {count}
                                </span>
                              </span>
                            ))}
                          </div>
                        )}
                        {commentsToShow.length > 0 && (
                          <ul className="mt-2 space-y-1 border-l border-white/25 pl-3">
                            {commentsToShow.map((c) => (
                              <li
                                key={c.id}
                                className="text-xs text-white/90"
                              >
                                {c.content}
                              </li>
                            ))}
                          </ul>
                        )}
                        {hasMoreComments && (
                          <button
                            type="button"
                            onClick={() => setOpenCommentsPostId(post.id)}
                            className="mt-1 self-start text-[11px] text-white/80 underline underline-offset-2 hover:text-white"
                          >
                            View all comments
                          </button>
                        )}
                      </div>
                    </li>
                  );
                });
              }

              // Virtual window of 50 posts when there are more.
              const totalHeight = total * ESTIMATED_ITEM_HEIGHT;
              const start = virtualStart;
              const end = Math.min(start + VIRTUAL_WINDOW_SIZE, total);
              const topSpacerHeight = start * ESTIMATED_ITEM_HEIGHT;
              const bottomSpacerHeight =
                totalHeight -
                topSpacerHeight -
                (end - start) * ESTIMATED_ITEM_HEIGHT;

              const windowPosts = data.posts.slice(start, end);

              return (
                <>
                  {topSpacerHeight > 0 && (
                    <li style={{ height: topSpacerHeight }} aria-hidden="true" />
                  )}
                  {windowPosts.map((post) => {
                    const reactionGroups = post.reactions.reduce<
                      Record<string, number>
                    >((acc, r) => {
                      const key = r.reactionType || "👍";
                      acc[key] = (acc[key] ?? 0) + 1;
                      return acc;
                    }, {});
                    const groupedReactions = Object.entries(reactionGroups);

                    const commentsToShow = post.comments.slice(0, 5);
                    const hasMoreComments = post.comments.length > 5;
                    const cardColorClasses = getAgentColorClasses(
                      post.author.id,
                    );

                    return (
                      <li
                        key={post.id}
                        className={`rounded-xl p-4 ${cardColorClasses}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">
                              {post.author.name}
                            </p>
                            <p className="text-xs text-white/70">
                              @{post.author.handle}
                            </p>
                          </div>
                          <p className="text-xs text-white/60">
                            {new Date(post.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <p className="mt-3 text-sm text-white">
                          {post.content}
                        </p>
                        <div className="mt-3 flex flex-col gap-1 text-xs text-white/75">
                          <span>
                            {post.reactions.length} reactions ·{" "}
                            {post.comments.length} comments
                          </span>
                          {groupedReactions.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {groupedReactions.map(([symbol, count]) => (
                                <span
                                  key={symbol}
                                  className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white"
                                >
                                  <span>{symbol}</span>
                                  <span className="text-[10px] text-white/80">
                                    {count}
                                  </span>
                                </span>
                              ))}
                            </div>
                          )}
                          {commentsToShow.length > 0 && (
                            <ul className="mt-2 space-y-1 border-l border-white/25 pl-3">
                              {commentsToShow.map((c) => (
                                <li
                                  key={c.id}
                                  className="text-xs text-white/90"
                                >
                                  {c.content}
                                </li>
                              ))}
                            </ul>
                          )}
                          {hasMoreComments && (
                            <button
                              type="button"
                              onClick={() => setOpenCommentsPostId(post.id)}
                              className="mt-1 self-start text-[11px] text-white/80 underline underline-offset-2 hover:text-white"
                            >
                              View all comments
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                  {bottomSpacerHeight > 0 && (
                    <li
                      style={{ height: bottomSpacerHeight }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );
            })()}
            </ul>
          )}
        </main>
      </div>

      {openCommentsPostId && data && (
        <CommentsDialog
          post={data.posts.find((p) => p.id === openCommentsPostId) ?? null}
          onClose={() => setOpenCommentsPostId(null)}
        />
      )}
    </>
  );
}

