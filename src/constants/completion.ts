import {CompletionModelType} from '../types/completion';

export const COMPLETION_SYSTEM_PROMPT = `Based on the code surrounding the current cursor position, generate a code snippet that fits contextually. Return only the code snippet, without any explanatory text or additional information.`;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType = 'llama3-70b-8192';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
