import type {Provider, ProviderImplementationMap} from './llm';

/**
 * Data structure representing the prompt data.
 */
export interface PromptData {
    system: string;
    user: string;
}

/**
 * Custom prompt function type
 * @param metadata - The metadata object containing information to generate the prompt
 * @returns Partial<PromptData> - A partial prompt data object
 */
export type CustomPrompt<T> = (metadata: T) => Partial<PromptData>;

/**
 * Custom model configuration types
 */
export type CustomCopilotModelConfig = (
    apiKey: string,
    prompt: PromptData,
) => {
    /** The URL endpoint for the custom model's API */
    endpoint: string;
    /** Additional HTTP headers */
    headers?: Record<string, string>;
    /** Request body data */
    body?: Record<string, unknown>;
};

export type CustomCopilotModelTransformResponse = (response: unknown) => {
    /** The generated text */
    text: string | null;
};

export interface CustomCopilotModel {
    /** Configuration function */
    config: CustomCopilotModelConfig;
    /** Response transformer */
    transformResponse: CustomCopilotModelTransformResponse;
}

type CustomOptions = {
    provider?: undefined;
    model: CustomCopilotModel;
};

export type CopilotOptions =
    | ProviderOptions<'openai'>
    | ProviderOptions<'groq'>
    | ProviderOptions<'anthropic'>
    | ProviderOptions<'google'>
    | ProviderOptions<'deepseek'>
    | CustomOptions;

export type ProviderOptions<T extends Provider> = {
    provider: T;
    model: ProviderImplementationMap[T]['Model'];
};
