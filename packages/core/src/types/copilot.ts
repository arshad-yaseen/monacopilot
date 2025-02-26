import type {Provider, ProviderImplementationMap} from './llm';

/**
 * Represents the structure of a prompt used for code completion.
 */
export interface PromptData {
    /**
     * Contextual information about the code environment
     * @example filename, technologies, etc.
     */
    context: string;
    /** Instructions for the AI model on how to generate the completion */
    instruction: string;
    /** The content of the file being edited */
    fileContent: string;
}

export type CustomPrompt<T> = (metadata: T) => Partial<PromptData>;

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

export type CopilotOptions = ProviderOptions<'mistral'> | CustomOptions;

export type ProviderOptions<T extends Provider> = {
    provider: T;
    model: ProviderImplementationMap[T]['Model'];
};
