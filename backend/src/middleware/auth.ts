import { NextFunction, Request, Response } from "express";
import { hkdf as nodeHkdf } from "crypto";
import { promisify } from "util";
import { jwtDecrypt } from "jose";
import prisma from "../prismaClient";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

const hkdfAsync = promisify(nodeHkdf);

/**
 * NextAuth v4 session JWTs (A256GCM JWE) are encrypted with a key derived via
 * HKDF. The session token is encoded without a salt, so the info string is the
 * plain label with no cookie-name suffix. We also try the cookie-name variants
 * (used by PKCE/state cookies) as a fallback, in case a deployment used them.
 */
const SALT_VARIANTS = [
  "", // session JWT — no salt (default)
  "__Secure-next-auth.session-token", // HTTPS / Vercel cookie name
  "next-auth.session-token", // HTTP / local dev cookie name
];

async function deriveNextAuthKey(secret: string, salt: string): Promise<Uint8Array> {
  const info = `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`;
  const derived = await hkdfAsync("sha256", Buffer.from(secret), salt, info, 32);
  return new Uint8Array(derived as ArrayBuffer);
}

/**
 * Verifies the NextAuth JWT (Bearer token), finds or creates the User by Google sub,
 * and sets req.userId. Returns 401 if token is missing or invalid.
 */
export async function requireUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.header("Authorization");
  const token =
    authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

  if (!token) {
    return res
      .status(401)
      .json({ error: "UNAUTHORIZED", message: "Missing or invalid authorization" });
  }

  if (!NEXTAUTH_SECRET) {
    // eslint-disable-next-line no-console
    console.error("NEXTAUTH_SECRET is not set");
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }

  try {
    // NextAuth v4 session JWTs use A256GCM + HKDF key derivation.
    // Try empty salt first (how session tokens are encoded), then cookie-name
    // salts as fallbacks for older or differently configured deployments.
    let payload: Record<string, unknown> | null = null;
    for (const salt of SALT_VARIANTS) {
      try {
        const derivedKey = await deriveNextAuthKey(NEXTAUTH_SECRET, salt);
        const result = await jwtDecrypt(token, derivedKey, { clockTolerance: 15 });
        payload = result.payload as Record<string, unknown>;
        break;
      } catch {
        // try next variant
      }
    }

    if (!payload) {
      return res
        .status(401)
        .json({ error: "UNAUTHORIZED", message: "Invalid or expired session" });
    }

    const sub = payload.sub as string | undefined;
    const email = (payload.email as string) ?? "";
    const name = (payload.name as string) ?? email;

    if (!sub) {
      return res
        .status(401)
        .json({ error: "UNAUTHORIZED", message: "Invalid token payload" });
    }

    let user = await prisma.user.findFirst({
      where: {
        oauthProvider: "google",
        oauthProviderId: sub,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          oauthProvider: "google",
          oauthProviderId: sub,
          email: email || `${sub}@google.oauth`,
          displayName: name || sub,
        },
      });
    }

    req.userId = user.id;
    next();
  } catch {
    return res
      .status(401)
      .json({ error: "UNAUTHORIZED", message: "Invalid or expired session" });
  }
}
