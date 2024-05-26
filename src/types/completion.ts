import {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from 'groq-sdk/resources/chat/completions';

import {ExternalContext, Filename, Technologies} from './editor-props';

export type CompletionModel = 'llama';

export type GroqCompletionCreateParams = ChatCompletionCreateParamsBase;
export type GroqCompletion = ChatCompletion & {error?: string};

export type LocalPredictionSnippets = Record<string, string>;
export interface LocalPrediction {
  language: string;
  snippets: LocalPredictionSnippets;
}

export interface CompletionRequest {
  completionMetadata: CompletionMetadata;
}
export interface CompletionResponse {
  completion?: string;
  error?: string;
}

export type CompletionMode = 'fill-in-the-middle' | 'completion';

export interface CompletionMetadata {
  language: string | undefined;
  filename: Filename | undefined;
  technologies: Technologies | undefined;
  externalContext: ExternalContext | undefined;
  codeAfterCursor: string;
  codeBeforeCursor: string;
  editorState: {
    completionMode: CompletionMode;
  };
}

export interface ContextualFilterContext {
  properties: {
    afterCursorWhitespace?: string;
    languageId?: string;
  };
  measurements: {
    documentLength?: number;
    promptEndPos?: number;
  };
  prefix?: string;
}
