import {CodeContextualFilterManager} from '../utils/completion/contextual-filter';
import {FrameworkType} from './common';

export interface CompletionConstructorParams {
  model: CompletionModelType | undefined;
}

export type LocalPredictionSnippets = {[prefix: string]: string};

export interface LocalPrediction {
  language: string;
  snippets: LocalPredictionSnippets;
}

export interface CompletionRequestParams {
  code: string;
  language: string | undefined;
  framework: FrameworkType | undefined;
}

export interface CodeContextualFilterProperties {
  afterCursorWhitespace?: string;
  languageId?: string;
}

export interface CodeContextualFilterMeasurements {
  documentLength?: number;
  promptEndPos?: number;
}

export interface CodeContextualFilterContext {
  properties: CodeContextualFilterProperties;
  measurements: CodeContextualFilterMeasurements;
  get: (
    manager: typeof CodeContextualFilterManager,
  ) => CodeContextualFilterManager;
  prefix?: string;
}

export type CompletionProviderType = 'openai';

export type CompletionModelType = 'gpt-3.5-turbo-0125';
