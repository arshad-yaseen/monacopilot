import type {
  MessageCreateParams as AnthropicChatCompletionCreateParamsBase,
  Message as AnthropicChatCompletionType,
} from '@anthropic-ai/sdk/resources';
import type {
  ModelParams as GoogleChatCompletionCreateParamsBase,
  GenerateContentResponse as GoogleChatCompletionType,
} from '@google/generative-ai';
import type {
  ChatCompletionCreateParamsBase as GroqChatCompletionCreateParamsBase,
  ChatCompletion as GroqChatCompletionType,
} from 'groq-sdk/resources/chat/completions';
import type {
  ChatCompletionCreateParamsBase as OpenAIChatCompletionCreateParamsBase,
  ChatCompletion as OpenAIChatCompletionType,
} from 'openai/resources/chat/completions';

import {
  DeepSeekChatCompletionCreateParamsBase,
  DeepSeekChatCompletionType,
} from './deepseek';

/**
 * Providers supported by Copilot.
 */
export type CopilotProvider =
  | 'openai'
  | 'groq'
  | 'anthropic'
  | 'google'
  | 'deepseek';

/**
 * Core type mapping for provider-specific implementations
 */
interface ProviderImplementationMap {
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
    Model: 'chat';
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
export type CopilotModel = {
  [K in CopilotProvider]: ProviderImplementationMap[K]['Model'];
}[CopilotProvider];

/**
 * Utility types for provider-specific implementations
 */
export type PickCopilotModel<T extends CopilotProvider> =
  ProviderImplementationMap[T]['Model'];
export type PickChatCompletionCreateParams<T extends CopilotProvider> =
  ProviderImplementationMap[T]['Params'];
export type PickChatCompletion<T extends CopilotProvider> =
  ProviderImplementationMap[T]['Completion'];

/**
 * Consolidated chat completion types (maintained as individual exports)
 */
export type ChatCompletionCreateParams = {
  [K in CopilotProvider]: ProviderImplementationMap[K]['Params'];
}[CopilotProvider];
export type ChatCompletion = {
  [K in CopilotProvider]: ProviderImplementationMap[K]['Completion'];
}[CopilotProvider];

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

/**
 * Data structure representing the prompt data.
 */
export interface PromptData {
  system: string;
  user: string;
}

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
  /** @deprecated Use `text` instead */
  completion?: string | null;
};

export interface CustomCopilotModel {
  /** Configuration function */
  config: CustomCopilotModelConfig;
  /** Response transformer */
  transformResponse: CustomCopilotModelTransformResponse;
}

/**
 * Enhanced Copilot options using mapped types
 */
type ProviderOptions<T extends CopilotProvider> = {
  provider: T;
  model: ProviderImplementationMap[T]['Model'];
};

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
