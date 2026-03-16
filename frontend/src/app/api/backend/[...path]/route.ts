import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

const NEXTAUTH_SESSION_COOKIE =
  process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

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
  const token =
    request.cookies.get(NEXTAUTH_SESSION_COOKIE)?.value ??
    request.cookies.get("next-auth.session-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Missing session" },
      { status: 401 },
    );
  }

  const pathSegments = Array.isArray(params.path) ? params.path : [params.path];
  const path = pathSegments.join("/");
  const baseUrl = BACKEND_URL.replace(/\/$/, "");
  const url = new URL(path.startsWith("/") ? path : `/${path}`, baseUrl);
  url.search = request.nextUrl.searchParams.toString();

  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${token}`);
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
