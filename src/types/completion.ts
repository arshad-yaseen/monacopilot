import {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from 'groq-sdk/resources/chat/completions';

import {ExternalContextType, FilenameType, FrameworkType} from './editor-props';

export type CompletionModelType = 'llama';
export type GroqCompletionCreateParams = ChatCompletionCreateParamsBase;
export type GroqCompletion = ChatCompletion & {error?: string};

export type LocalPredictionSnippets = Record<string, string>;

export interface LocalPrediction {
  language: string;
  snippets: LocalPredictionSnippets;
}

export interface CompletionRequestParams {
  completionMetadata: CompletionMetadata;
}

export type CompletionMode = 'fill-in-the-middle' | 'completion';

export interface CompletionMetadata {
  language: string | undefined;
  filename: FilenameType | undefined;
  framework: FrameworkType | undefined;
  externalContext: ExternalContextType | undefined;
  codeAfterCursor: string;
  codeBeforeCursor: string;
  editorState: {
    completionMode: CompletionMode;
  };
}

export interface ContextualFilterProperties {
  afterCursorWhitespace?: string;
  languageId?: string;
}

export interface ContextualFilterMeasurements {
  documentLength?: number;
  promptEndPos?: number;
}

export interface ContextualFilterContext {
  properties: ContextualFilterProperties;
  measurements: ContextualFilterMeasurements;
  prefix?: string;
}
