export interface GenerateTextParams {
    model: string;
    systemPrompt: string;
    userPrompt: string;
    temperature?: number;
    maxTokens?: number;
}
export declare function generateText({ model, systemPrompt, userPrompt, temperature, maxTokens, }: GenerateTextParams): Promise<string>;
//# sourceMappingURL=ollamaClient.d.ts.map