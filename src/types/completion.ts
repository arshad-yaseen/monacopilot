import type {
  ChatCompletion as GroqChatCompletion,
  ChatCompletionCreateParamsBase as GroqChatCompletionCreateParamsBase,
} from 'groq-sdk/resources/chat/completions';
import {
  ChatCompletion as OpenAIChatCompletion,
  ChatCompletionCreateParamsBase as OpenAIChatCompletionCreateParamsBase,
} from 'openai/resources/chat/completions';

import {Endpoint, ExternalContext, Filename, Technologies} from './copilot';
import {EditorModel, EditorPosition, EditorRange} from './monaco';

export type CompletionModel = 'llama-3-70b' | 'gpt-4o';
export type CompletionProvider = 'openai' | 'groq';

export type CompletionCreateParams = Omit<
  OpenAIChatCompletionCreateParamsBase | GroqChatCompletionCreateParamsBase,
  'frequence_penalty'
>;
export type Completion = OpenAIChatCompletion | GroqChatCompletion;

export type CompletionCreateParamsExcludingModelAndMessages = Omit<
  CompletionCreateParams,
  'model' | 'messages'
>;

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
  position: EditorPosition;
}

export type CompletionCacheItem = {
  completion: string;
  range: EditorRange;
  textBeforeCursorInLine: string;
};
