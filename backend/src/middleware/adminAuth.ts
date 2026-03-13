import { NextFunction, Request, Response } from "express";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "ADMIN_DISABLED_IN_PRODUCTION" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="admin"');
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  const base64Credentials = authHeader.split(" ")[1] ?? "";
  const decoded = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  next();
}

