import {CompletionModel} from '../types/completion';

export const COMPLETION_MODEL_IDS: Record<CompletionModel, string> = {
  llama: 'llama3-70b-8192',
};

export const DEFAULT_COMPLETION_MODEL: CompletionModel = 'llama';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
