import {
  CompletionCreateParamsExcludingModelAndMessages,
  CompletionModel,
  CompletionProvider,
} from '../types';

export const COMPLETION_MODEL_IDS: Record<CompletionModel, string> = {
  'llama-3-70b': 'llama3-70b-8192',
  'gpt-4o': 'gpt-4o-2024-08-06',
  'gpt-4o-mini': 'gpt-4o-mini',
};

export const COMPLETION_PROVIDER_MODEL_MAP: Record<
  CompletionProvider,
  CompletionModel[]
> = {
  groq: ['llama-3-70b'],
  openai: ['gpt-4o', 'gpt-4o-mini'],
};

export const DEFAULT_COMPLETION_MODEL: CompletionModel = 'llama-3-70b';
export const DEFAULT_COMPLETION_PROVIDER: CompletionProvider = 'groq';

export const COMPLETION_API_ENDPOINT: Record<CompletionProvider, string> = {
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions',
};

export const DEFAULT_COMPLETION_CREATE_PARAMS: CompletionCreateParamsExcludingModelAndMessages =
  {
    temperature: 0.3,
  };
