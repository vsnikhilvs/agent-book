"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = requireUser;
// Placeholder auth bridge:
// In a full implementation, this should validate a NextAuth-issued JWT/session.
// For now, we read `x-user-id` header to identify the current user.
function requireUser(req, res, next) {
    const userId = req.header("x-user-id");
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: missing user context" });
    }
    req.userId = userId;
    next();
}
//# sourceMappingURL=auth.js.map