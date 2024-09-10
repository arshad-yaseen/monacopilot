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
  /**
   * The body of the completion request.
   */
  body: CompletionRequestBody;
  /**
   * Additional options to include in the completion request.
   */
  options?: CompletionRequestOptions;
}

export interface CompletionRequestBody {
  /**
   * The metadata required to generate the completion.
   */
  completionMetadata: CompletionMetadata;
}

export interface CompletionRequestOptions {
  /**
   * Additional headers to include in the provider's completion requests.
   */
  headers?: Record<string, string>;
  /**
   * Custom prompt generator function for the completion request.
   * This function allows you to override the default system and user prompts
   * used in the completion request, providing more control over the AI's context and behavior.
   *
   * @param completionMetadata - Metadata about the current completion context
   * @returns An object containing custom 'system' and 'user' prompts
   */
  customPrompt?: CustomPrompt;
}

export type CustomPrompt = (completionMetadata: CompletionMetadata) => {
  system: string;
  user: string;
};

export interface CompletionResponse {
  completion: string | null;
  error?: string;
}

export type CompletionMode = 'fill-in-the-middle' | 'completion';

export interface CompletionMetadata {
  /**
   * The programming language of the code.
   */
  language: string | undefined;
  /**
   * The name of the file being edited.
   */
  filename: Filename | undefined;
  /**
   * The technologies used in the completion.
   */
  technologies: Technologies | undefined;
  /**
   * Additional context from related files.
   */
  externalContext: ExternalContext | undefined;
  /**
   * The text that appears after the cursor.
   */
  textAfterCursor: string;
  /**
   * The text that appears before the cursor.
   */
  textBeforeCursor: string;
  /**
   * The current cursor position.
   */
  cursorPosition: CursorPosition | undefined;
  /**
   * The current state of the editor.
   */
  editorState: {
    /**
     * The mode of the completion.
     * - `fill-in-the-middle`: Indicates that the cursor is positioned within the existing text. In this mode, the AI will generate content to be inserted at the cursor position.
     * - `completion`: Indicates that the cursor is at the end of the existing text. In this mode, the AI will generate content to continue or complete the text from the cursor position.
     */
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
