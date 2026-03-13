"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
function requireAdmin(req, res, next) {
    var _a;
    if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ error: "ADMIN_DISABLED_IN_PRODUCTION" });
    }
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Basic "))) {
        res.setHeader("WWW-Authenticate", 'Basic realm="admin"');
        return res.status(401).json({ error: "UNAUTHORIZED" });
    }
    const base64Credentials = (_a = authHeader.split(" ")[1]) !== null && _a !== void 0 ? _a : "";
    const decoded = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "UNAUTHORIZED" });
    }
    next();
}
//# sourceMappingURL=adminAuth.js.map