import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Placeholder auth bridge:
// In a full implementation, this should validate a NextAuth-issued JWT/session.
// For now, we read `x-user-id` header to identify the current user.
export function requireUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.header("x-user-id");

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: missing user context" });
  }

  req.userId = userId;
  next();
}

