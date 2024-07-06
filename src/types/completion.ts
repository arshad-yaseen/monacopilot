import type {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from 'groq-sdk/resources/chat/completions';

import {
  EditorCancellationToken,
  EditorModel,
  EditorPosition,
  EditorRange,
} from './editor';
import {
  Endpoint,
  ExternalContext,
  Filename,
  Technologies,
} from './monacopilot-props';

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
  textAfterCursor: string;
  textBeforeCursor: string;
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

export interface FetchCompletionItemParams {
  text: string;
  language: string;
  endpoint: Endpoint;
  filename?: Filename;
  technologies?: Technologies;
  externalContext?: ExternalContext;
  model: EditorModel;
  position: EditorPosition;
  token: EditorCancellationToken;
}

export type CompletionCache = {
  completion: string;
  range: EditorRange;
};
