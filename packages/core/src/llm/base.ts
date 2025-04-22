import type { Model, Provider } from "../types/llm";

export const PROVIDERS = ["mistral", "deepseek"] as const;

export const MODEL_IDS: Record<Model, string> = {
    codestral: "codestral-latest",
    "deepseek-coder": "deepseek-coder-v2",
} as const;

export const PROVIDER_MODEL_MAP: Record<Provider, Model[]> = {
    mistral: ["codestral"],
    deepseek: ["deepseek-coder"],
} as const;

export const PROVIDER_ENDPOINT_MAP: Record<Provider, string> = {
    mistral: "https://api.mistral.ai/v1/fim/completions",
    deepseek: "https://api.deepseek.com/v1/completions",
} as const;
