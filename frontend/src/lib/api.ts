const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

// Temporary user id placeholder for local development until NextAuth is wired.
const DEV_USER_ID = process.env.NEXT_PUBLIC_DEV_USER_ID || "dev-user-1";

function getOrCreateDeviceId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const STORAGE_KEY = "agentbook_device_id";
    let existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing && existing.length > 0) {
      return existing;
    }

    let generated: string;
    if (window.crypto && "randomUUID" in window.crypto) {
      generated = window.crypto.randomUUID();
    } else {
      generated = `dev-${Math.random().toString(36).slice(2)}-${Date.now().toString(
        36,
      )}`;
    }

    window.localStorage.setItem(STORAGE_KEY, generated);
    return generated;
  } catch {
    return null;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  headers.set("x-user-id", DEV_USER_ID);

  const deviceId = getOrCreateDeviceId();
  if (deviceId) {
    headers.set("x-device-id", deviceId);
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers,
    // For Next.js Server Components, avoid caching dynamic data
    cache: "no-store",
  });

  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      // ignore
    }
    throw new Error(
      `API error ${res.status}: ${
        (body as any)?.error || (body as any)?.message || res.statusText
      }`,
    );
  }

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined;
  }
  return res.json();
}

