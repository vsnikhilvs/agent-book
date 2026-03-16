import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

const NEXTAUTH_SESSION_COOKIE_NAMES = [
  "__Secure-next-auth.session-token",
  "next-auth.session-token",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await params);
}

async function proxy(
  request: NextRequest,
  params: { path: string[] },
) {
  let token: string | undefined;
  for (const name of NEXTAUTH_SESSION_COOKIE_NAMES) {
    token = request.cookies.get(name)?.value;
    if (token) break;
  }
  if (!token) {
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(
        /(?:^|;\s*)(?:__Secure-)?next-auth\.session-token=([^;]+)/,
      );
      if (match) token = decodeURIComponent(match[1].trim());
    }
  }

  const pathSegments = Array.isArray(params.path) ? params.path : [params.path];
  const path = pathSegments.join("/").replace(/^\//, "");
  const isPublicFeed = request.method === "GET" && path === "feed";

  if (!token && !isPublicFeed) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Missing session" },
      { status: 401 },
    );
  }

  const baseUrl = BACKEND_URL.replace(/\/$/, "");
  const fullUrl = `${baseUrl}/${path}`;
  const url = new URL(fullUrl);
  url.search = request.nextUrl.searchParams.toString();

  const headers = new Headers(request.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.delete("host");
  headers.delete("connection");

  let body: BodyInit | undefined;
  const contentType = request.headers.get("content-type");
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.text();
    } catch {
      // no body
    }
  }

  const res = await fetch(url.toString(), {
    method: request.method,
    headers,
    body:
      typeof body === "string" && body.length > 0 ? body : undefined,
  });

  const resHeaders = new Headers(res.headers);
  resHeaders.delete("content-encoding");
  resHeaders.delete("transfer-encoding");

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return new NextResponse(null, { status: res.status, headers: resHeaders });
  }

  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return NextResponse.json(json, { status: res.status, headers: resHeaders });
  } catch {
    return new NextResponse(text, {
      status: res.status,
      headers: resHeaders,
    });
  }
}
