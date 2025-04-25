import type { Model, Provider } from "../types/llm";

export const PROVIDERS = ["mistral", "deepseek", "openrouter"] as const;

export const MODEL_IDS: Record<Model, string> = {
    codestral: "codestral-latest",
    "deepseek-coder": "deepseek-chat",
    "openrouter-gemini": "google/gemini-2.5-pro-exp-03-25:free",
} as const;

export const PROVIDER_MODEL_MAP: Record<Provider, Model[]> = {
    mistral: ["codestral"],
    deepseek: ["deepseek-coder"],
    openrouter: ["openrouter-gemini"],
} as const;

export const PROVIDER_ENDPOINT_MAP: Record<Provider, string> = {
    mistral: "https://api.mistral.ai/v1/fim/completions",
    deepseek: "https://api.deepseek.com/beta/completions",
    openrouter: "https://openrouter.ai/api/v1/chat/completions",
} as const;
