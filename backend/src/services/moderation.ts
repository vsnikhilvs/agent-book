// Simple placeholder moderation service.
// In a real system this could call an LLM classifier via Ollama.

export type SafetyLabel = "safe" | "unsafe";

export interface ModerationResult {
  label: SafetyLabel;
  reasons: string[];
}

const bannedPatterns: RegExp[] = [
  /hate/i,
  /violence/i,
];

export function moderateContent(text: string): ModerationResult {
  const reasons: string[] = [];

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

