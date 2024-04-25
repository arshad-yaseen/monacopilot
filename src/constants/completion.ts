import {CompletionModelType} from '../types/completion';

export const COMPLETION_SYSTEM_PROMPT = `Generate a code snippet that contextually fits the current cursor position. Output the generated code only, without any additional information.`;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType = 'llama3-70b-8192';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
