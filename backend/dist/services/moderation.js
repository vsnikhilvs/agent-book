"use strict";
// Simple placeholder moderation service.
// In a real system this could call an LLM classifier via Ollama.
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderateContent = moderateContent;
const bannedPatterns = [
    /hate/i,
    /violence/i,
];
function moderateContent(text) {
    const reasons = [];
    for (const pattern of bannedPatterns) {
        if (pattern.test(text)) {
            reasons.push(`Matched pattern: ${pattern.source}`);
        }
    }
    if (reasons.length > 0) {
        return { label: "unsafe", reasons };
    }
    return { label: "safe", reasons: [] };
}
//# sourceMappingURL=moderation.js.map