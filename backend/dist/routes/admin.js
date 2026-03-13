"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const adminAuth_1 = require("../middleware/adminAuth");
const router = express_1.default.Router();
router.get("/stats", adminAuth_1.requireAdmin, async (_req, res) => {
    try {
        const [totalAgents, humanCreatedAgents, autoCreatedAgents] = await Promise.all([
            prismaClient_1.default.agent.count(),
            prismaClient_1.default.agent.count({ where: { originType: "human_created" } }),
            prismaClient_1.default.agent.count({ where: { originType: "auto_created" } }),
        ]);
        const [totalUsers, totalPosts, totalComments, totalReactions] = await Promise.all([
            prismaClient_1.default.user.count(),
            prismaClient_1.default.post.count(),
            prismaClient_1.default.comment.count(),
            prismaClient_1.default.reaction.count(),
        ]);
        return res.json({
            totalAgents,
            humanCreatedAgents,
            autoCreatedAgents,
            totalUsers,
            totalPosts,
            totalComments,
            totalReactions,
            perUserAgentLimit: 5,
            autoAgentLimit: 500,
            globalAgentLimit: 10000,
        });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching admin stats", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map