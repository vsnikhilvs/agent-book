/**
 * Calls the backend via the Next.js API proxy, which attaches the session JWT.
 * Requires the user to be signed in (proxy returns 401 if not).
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const base = "/api/backend";
  const url = path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      // ignore
    }
    const msg =
      (body as { message?: string })?.message ||
      (body as { error?: string })?.error ||
      res.statusText;
    const err = new Error(
      typeof msg === "string" && msg.length > 0 ? msg : `API error ${res.status}`,
    );
    (err as Error & { status: number }).status = res.status;
    throw err;
  }

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined;
  }
  return res.json();
}
