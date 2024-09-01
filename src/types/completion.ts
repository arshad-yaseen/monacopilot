import {
  Message as AnthropicChatCompletion,
  MessageCreateParams as AnthropicChatCompletionCreateParamsBase,
} from '@anthropic-ai/sdk/resources';
import type {
  ChatCompletion as GroqChatCompletion,
  ChatCompletionCreateParamsBase as GroqChatCompletionCreateParamsBase,
} from 'groq-sdk/resources/chat/completions';
import {
  ChatCompletion as OpenAIChatCompletion,
  ChatCompletionCreateParamsBase as OpenAIChatCompletionCreateParamsBase,
} from 'openai/resources/chat/completions';

import {Endpoint, ExternalContext, Filename, Technologies} from './copilot';
import {CursorPosition, EditorModel, EditorRange} from './monaco';

export type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini';
export type GroqModel = 'llama-3-70b';
export type AnthropicModel =
  | 'claude-3.5-sonnet'
  | 'claude-3-opus'
  | 'claude-3-haiku'
  | 'claude-3-sonnet';

export type CompletionModel = OpenAIModel | GroqModel | AnthropicModel;

export type CompletionProvider = 'openai' | 'groq' | 'anthropic';

export type ChatCompletionCreateParams =
  | OpenAIChatCompletionCreateParamsBase
  | GroqChatCompletionCreateParamsBase
  | AnthropicChatCompletionCreateParamsBase;

export type ChatCompletion =
  | OpenAIChatCompletion
  | GroqChatCompletion
  | AnthropicChatCompletion;

export type PickChatCompletionCreateParams<T extends CompletionProvider> =
  T extends 'openai'
    ? OpenAIChatCompletionCreateParamsBase
    : T extends 'groq'
      ? GroqChatCompletionCreateParamsBase
      : T extends 'anthropic'
        ? AnthropicChatCompletionCreateParamsBase
        : never;

export type PickChatCompletion<T extends CompletionProvider> =
  T extends 'openai'
    ? OpenAIChatCompletion
    : T extends 'groq'
      ? GroqChatCompletion
      : T extends 'anthropic'
        ? AnthropicChatCompletion
        : never;

export type LocalPredictionSnippets = Record<string, string>;
export interface LocalPrediction {
  language: string;
  snippets: LocalPredictionSnippets;
}

export interface CompletionRequest {
  completionMetadata: CompletionMetadata;
}
export interface CompletionResponse {
  completion: string | null;
  error?: string;
}

export type CompletionMode = 'fill-in-the-middle' | 'completion';

export interface CompletionMetadata {
  language: string | undefined;
  filename: Filename | undefined;
  technologies: Technologies | undefined;
  externalContext: ExternalContext | undefined;
  textAfterCursor: string;
  textBeforeCursor: string;
  editorState: {
    completionMode: CompletionMode;
  };
}

export interface FetchCompletionItemParams {
  text: string;
  language: string;
  endpoint: Endpoint;
  filename?: Filename;
  technologies?: Technologies;
  externalContext?: ExternalContext;
  model: EditorModel;
  position: CursorPosition;
}

export interface CompletionCacheItem {
  completion: string;
  range: EditorRange;
  textBeforeCursorInLine: string;
}
