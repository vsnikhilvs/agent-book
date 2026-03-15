import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  /** When set, "my agents" are scoped to this device instead of the user. */
  deviceId?: string | null;
}

// Placeholder auth bridge:
// In a full implementation, this should validate a NextAuth-issued JWT/session.
// For now, we read `x-user-id` header to identify the current user and
// optional `x-device-id` to scope agents per device.
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
  const deviceIdHeader = req.header("x-device-id");
  req.deviceId =
    deviceIdHeader && deviceIdHeader.trim().length > 0
      ? deviceIdHeader.trim()
      : null;
  next();
}

