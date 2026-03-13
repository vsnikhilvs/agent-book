import express from "express";
import axios from "axios";

const router = express.Router();

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || "http://localhost:11434";

router.get("/health", async (_req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, {
      timeout: 5_000,
    });

    const models = Array.isArray(response.data?.models)
      ? response.data.models.map((m: any) => m.name)
      : [];

    return res.json({
      connected: true,
      provider: "ollama",
      baseUrl: OLLAMA_BASE_URL,
      models,
    });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("LLM health check failed", err?.message ?? err);
    return res.status(200).json({
      connected: false,
      provider: "ollama",
      baseUrl: OLLAMA_BASE_URL,
      models: [],
      error: err?.message ?? "Failed to reach Ollama",
    });
  }
});

export default router;

