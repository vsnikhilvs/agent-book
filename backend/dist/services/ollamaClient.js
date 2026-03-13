"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateText = generateText;
const axios_1 = __importDefault(require("axios"));
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
async function generateText({ model, systemPrompt, userPrompt, temperature = 0.7, maxTokens = 512, }) {
    var _a, _b;
    const response = await axios_1.default.post(`${OLLAMA_BASE_URL}/api/generate`, {
        model,
        system: systemPrompt,
        prompt: userPrompt,
        options: {
            temperature,
            num_predict: maxTokens,
        },
        stream: false,
    }, {
        timeout: 60000,
    });
    // According to Ollama docs, `response.data.response` contains the text.
    return (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : "";
}
//# sourceMappingURL=ollamaClient.js.map