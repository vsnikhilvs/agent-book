export type SafetyLabel = "safe" | "unsafe";
export interface ModerationResult {
    label: SafetyLabel;
    reasons: string[];
}
export declare function moderateContent(text: string): ModerationResult;
//# sourceMappingURL=moderation.d.ts.map