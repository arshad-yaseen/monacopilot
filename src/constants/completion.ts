import {
  CompletionModel,
  CompletionProvider,
  GroqCompletionCreateParamsExcludingModelAndMessages,
} from '../types';

export const COMPLETION_MODEL_IDS: Record<CompletionModel, string> = {
  llama: 'llama3-70b-8192',
  'gpt-4o-mini': 'gpt-4o-mini',
};

export const COMPLETION_PROVIDER_MODEL_MAP: Record<
  CompletionProvider,
  CompletionModel[]
> = {
  groq: ['llama'],
  openai: ['gpt-4o-mini'],
};

export const DEFAULT_COMPLETION_MODEL: CompletionModel = 'llama';
export const DEFAULT_COMPLETION_PROVIDER: CompletionProvider = 'groq';

export const COMPLETION_API_ENDPOINT: Record<CompletionProvider, string> = {
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions',
};

export const DEFAULT_COMPLETION_CREATE_PARAMS: GroqCompletionCreateParamsExcludingModelAndMessages =
  {
    temperature: 0.3,
  };
