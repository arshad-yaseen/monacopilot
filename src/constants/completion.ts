import {
  CompletionModel,
  GroqCompletionCreateParamsExcludingModelAndMessages,
} from '../types';

export const COMPLETION_MODEL_IDS: Record<CompletionModel, string> = {
  llama: 'llama3-70b-8192',
};

export const DEFAULT_COMPLETION_MODEL: CompletionModel = 'llama';

export const GROQ_COMPLETION_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';

export const DEFAULT_COMPLETION_CREATE_PARAMS: GroqCompletionCreateParamsExcludingModelAndMessages =
  {
    temperature: 0.3,
  };
