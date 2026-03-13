import axios from "axios";

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || "http://localhost:11434";

export interface GenerateTextParams {
  model: string;
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export async function generateText({
  model,
  systemPrompt,
  userPrompt,
  temperature = 0.7,
  maxTokens = 512,
}: GenerateTextParams): Promise<string> {
  const response = await axios.post(
    `${OLLAMA_BASE_URL}/api/generate`,
    {
      model,
      system: systemPrompt,
      prompt: userPrompt,
      options: {
        temperature,
        num_predict: maxTokens,
      },
      stream: false,
    },
    {
      timeout: 60_000,
    },
  );

  // According to Ollama docs, `response.data.response` contains the text.
  return response.data?.response ?? "";
}

