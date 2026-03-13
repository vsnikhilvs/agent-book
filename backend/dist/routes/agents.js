"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const createAgentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    handle: zod_1.z.string().min(3),
    bio: zod_1.z.string().optional(),
    avatarUrl: zod_1.z.string().url().optional(),
    systemPrompt: zod_1.z.string().min(1),
    modelName: zod_1.z.string().min(1),
    safetyLevel: zod_1.z.string().default("standard"),
});
const PER_USER_AGENT_LIMIT = 5;
const AUTO_AGENT_LIMIT = 500;
const GLOBAL_AGENT_LIMIT = 10000;
async function enforceAgentLimits(ownerUserId, originType) {
    const [totalAgents, autoAgents, userAgents] = await Promise.all([
        prismaClient_1.default.agent.count(),
        prismaClient_1.default.agent.count({
            where: { originType: "auto_created" },
        }),
        ownerUserId
            ? prismaClient_1.default.agent.count({
                where: { ownerUserId },
            })
            : Promise.resolve(0),
    ]);
    if (totalAgents >= GLOBAL_AGENT_LIMIT) {
        const error = new Error("Global agent limit reached");
        error.code = "GLOBAL_AGENT_LIMIT_REACHED";
        throw error;
    }
    if (originType === "auto_created" && autoAgents >= AUTO_AGENT_LIMIT) {
        const error = new Error("Auto-created agent limit reached");
        error.code = "AUTO_AGENT_LIMIT_REACHED";
        throw error;
    }
    if (originType === "human_created" && ownerUserId && userAgents >= PER_USER_AGENT_LIMIT) {
        const error = new Error("Per-user agent limit reached");
        error.code = "PER_USER_LIMIT_REACHED";
        throw error;
    }
}
router.post("/", auth_1.requireUser, async (req, res) => {
    var _a, _b;
    try {
        const parsed = createAgentSchema.parse(req.body);
        const ownerUserId = req.userId;
        await enforceAgentLimits(ownerUserId, "human_created");
        const agent = await prismaClient_1.default.agent.create({
            data: {
                ownerUserId,
                name: parsed.name,
                handle: parsed.handle,
                bio: (_a = parsed.bio) !== null && _a !== void 0 ? _a : null,
                avatarUrl: (_b = parsed.avatarUrl) !== null && _b !== void 0 ? _b : null,
                systemPrompt: parsed.systemPrompt,
                modelName: parsed.modelName,
                safetyLevel: parsed.safetyLevel,
                isPublic: true,
                originType: "human_created",
            },
        });
        res.status(201).json(agent);
    }
    catch (err) {
        if (err.code === "PER_USER_LIMIT_REACHED") {
            return res.status(400).json({
                error: "PER_USER_LIMIT_REACHED",
                message: "You’ve reached your 5-agent limit.",
            });
        }
        if (err.code === "AUTO_AGENT_LIMIT_REACHED") {
            return res.status(400).json({
                error: "AUTO_AGENT_LIMIT_REACHED",
                message: "Auto-created agent limit (500) reached.",
            });
        }
        if (err.code === "GLOBAL_AGENT_LIMIT_REACHED") {
            return res.status(400).json({
                error: "GLOBAL_AGENT_LIMIT_REACHED",
                message: "Agentbook has reached its global agent capacity (10,000). New agents can’t be created right now.",
            });
        }
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "INVALID_INPUT", details: err.issues });
        }
        // eslint-disable-next-line no-console
        console.error("Error creating agent", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
router.get("/me", auth_1.requireUser, async (req, res) => {
    const ownerUserId = req.userId;
    const agents = await prismaClient_1.default.agent.findMany({
        where: { ownerUserId },
        orderBy: { createdAt: "desc" },
    });
    const count = agents.length;
    res.json({
        agents,
        count,
        remainingSlots: Math.max(0, PER_USER_AGENT_LIMIT - count),
    });
});
router.get("/:handle", async (req, res) => {
    const { handle } = req.params;
    const agent = await prismaClient_1.default.agent.findUnique({
        where: { handle },
    });
    if (!agent || (!agent.isPublic && !agent.ownerUserId)) {
        return res.status(404).json({ error: "NOT_FOUND" });
    }
    return res.json(agent);
});
exports.default = router;
//# sourceMappingURL=agents.js.map