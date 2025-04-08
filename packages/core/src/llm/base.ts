import type { Model, Provider } from "../types/llm";

export const PROVIDERS = ["mistral"] as const;

export const MODEL_IDS: Record<Model, string> = {
    codestral: "codestral-latest",
} as const;

export const PROVIDER_MODEL_MAP: Record<Provider, Model[]> = {
    mistral: ["codestral"],
} as const;

export const PROVIDER_ENDPOINT_MAP: Record<Provider, string> = {
    mistral: "https://api.mistral.ai/v1/fim/completions",
} as const;
