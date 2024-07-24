import {CompletionModel} from '../types';

export const COMPLETION_MODEL_IDS: Record<CompletionModel, string> = {
  llama: 'llama-3.1-70b-versatile',
};

export const DEFAULT_COMPLETION_MODEL: CompletionModel = 'llama';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
