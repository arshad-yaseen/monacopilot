import type {
    MessageCreateParams as AnthropicChatCompletionCreateParamsBase,
    Message as AnthropicChatCompletionType,
} from '@anthropic-ai/sdk/resources';
import type {
    GenerateContentRequest as GoogleChatCompletionCreateParamsBase,
    GenerateContentResponse as GoogleChatCompletionType,
} from '@google/generative-ai';
import {MODEL_IDS} from 'ai/base';
import type {
    ChatCompletionCreateParamsBase as GroqChatCompletionCreateParamsBase,
    ChatCompletion as GroqChatCompletionType,
} from 'groq-sdk/resources/chat/completions';
import type {
    ChatCompletionCreateParamsBase as OpenAIChatCompletionCreateParamsBase,
    ChatCompletion as OpenAIChatCompletionType,
} from 'openai/resources/chat/completions';

import {CompletionMetadata} from './completion';
import {PromptData} from './copilot';

/**
 * Providers supported by Copilot.
 */
export type Provider = 'openai' | 'groq' | 'anthropic' | 'google' | 'deepseek';

export type DeepSeekChatCompletionType = {
    choices: {
        text: string;
    }[];
};

export type DeepSeekChatCompletionCreateParamsBase = {
    model: (typeof MODEL_IDS)['v3'];
    prompt: string;
    suffix: string;
    temperature: number;
    max_tokens: number;
};

/**
 * Core type mapping for provider-specific implementations
 */
export interface ProviderImplementationMap {
    openai: {
        Model: 'gpt-4o' | 'gpt-4o-mini' | 'o1-mini';
        Params: OpenAIChatCompletionCreateParamsBase;
        Completion: OpenAIChatCompletionType;
    };
    groq: {
        Model: 'llama-3-70b';
        Params: GroqChatCompletionCreateParamsBase;
        Completion: GroqChatCompletionType;
    };
    anthropic: {
        Model: 'claude-3-5-sonnet' | 'claude-3-5-haiku' | 'claude-3-haiku';
        Params: AnthropicChatCompletionCreateParamsBase;
        Completion: AnthropicChatCompletionType;
    };
    google: {
        Model: 'gemini-1.5-flash' | 'gemini-1.5-flash-8b' | 'gemini-1.5-pro';
        Params: GoogleChatCompletionCreateParamsBase;
        Completion: GoogleChatCompletionType;
    };
    deepseek: {
        Model: 'v3';
        Params: DeepSeekChatCompletionCreateParamsBase;
        Completion: DeepSeekChatCompletionType;
    };
}

/**
 * Models available for each provider (maintained as individual exports)
 */
export type OpenAIModel = ProviderImplementationMap['openai']['Model'];
export type GroqModel = ProviderImplementationMap['groq']['Model'];
export type AnthropicModel = ProviderImplementationMap['anthropic']['Model'];
export type GoogleModel = ProviderImplementationMap['google']['Model'];
export type DeepSeekModel = ProviderImplementationMap['deepseek']['Model'];

/**
 * Union of all predefined Copilot models
 */
export type Model = {
    [K in Provider]: ProviderImplementationMap[K]['Model'];
}[Provider];

/**
 * Utility types for provider-specific implementations
 */
export type PickModel<P extends Provider> =
    ProviderImplementationMap[P]['Model'];
export type PickChatCompletionCreateParams<P extends Provider> =
    ProviderImplementationMap[P]['Params'];
export type PickChatCompletion<P extends Provider> =
    ProviderImplementationMap[P]['Completion'];

/**
 * Consolidated chat completion types (maintained as individual exports)
 */
export type ChatCompletionCreateParams = {
    [K in Provider]: ProviderImplementationMap[K]['Params'];
}[Provider];
export type ChatCompletion = {
    [K in Provider]: ProviderImplementationMap[K]['Completion'];
}[Provider];

/**
 * Individual provider type aliases (preserved from original)
 */
export type OpenAIChatCompletionCreateParams =
    OpenAIChatCompletionCreateParamsBase;
export type DeepSeekChatCompletionCreateParams =
    DeepSeekChatCompletionCreateParamsBase;
export type GroqChatCompletionCreateParams = GroqChatCompletionCreateParamsBase;
export type AnthropicChatCompletionCreateParams =
    AnthropicChatCompletionCreateParamsBase;
export type GoogleChatCompletionCreateParams =
    GoogleChatCompletionCreateParamsBase;
export type OpenAIChatCompletion = OpenAIChatCompletionType;
export type DeepSeekChatCompletion = DeepSeekChatCompletionType;
export type GroqChatCompletion = GroqChatCompletionType;
export type AnthropicChatCompletion = AnthropicChatCompletionType;
export type GoogleChatCompletion = GoogleChatCompletionType;

export interface ProviderHandler<P extends Provider> {
    createEndpoint(model: PickModel<P>, apiKey: string): string;
    createRequestBody(
        model: PickModel<P>,
        prompt: PromptData,
        completionMetadata: CompletionMetadata,
    ): PickChatCompletionCreateParams<P>;
    createHeaders(apiKey: string): Record<string, string>;
    parseCompletion(completion: PickChatCompletion<P>): string | null;
}
