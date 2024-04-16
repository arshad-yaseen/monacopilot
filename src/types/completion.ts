export interface CompletionConstructorParams {
  model: CompletionModelType | undefined;
}

export interface CompletionRequestParams {
  code: string;
  language: string | undefined;
}

export type CompletionProviderType = 'openai' | 'mistral';

export type CompletionModelType =
  | 'gpt-3.5-turbo-0125'
  | 'open-mixtral-8x7b'
  | 'gpt-4-turbo-2024-04-09';