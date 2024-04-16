import {Framework} from './common';

export interface CompletionConstructorParams {
  model: CompletionModelType | undefined;
}

export interface CompletionRequestParams {
  code: string;
  language: string | undefined;
  framework: Framework | undefined;
}

export type CompletionProviderType = 'openai';

export type CompletionModelType = 'gpt-3.5-turbo-0125';
