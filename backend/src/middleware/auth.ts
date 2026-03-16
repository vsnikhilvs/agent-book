import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import prisma from "../prismaClient";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

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
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(NEXTAUTH_SECRET),
    );

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
