import {CopilotModel, CopilotProvider} from '../types';

export const COPILOT_PROVIDERS = [
  'groq',
  'openai',
  'anthropic',
  'google',
  'deepseek',
] as const;

export const COPILOT_MODEL_IDS: Record<CopilotModel, string> = {
  'llama-3-70b': 'llama3-70b-8192',
  'gpt-4o': 'gpt-4o-2024-08-06',
  'gpt-4o-mini': 'gpt-4o-mini',
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20241022',
  'claude-3-haiku': 'claude-3-haiku-20240307',
  'claude-3-5-haiku': 'claude-3-5-haiku-20241022',
  'o1-mini': 'o1-mini',
  'gemini-1.5-flash-8b': 'gemini-1.5-flash-8b',
  'gemini-1.5-flash': 'gemini-1.5-flash',
  'gemini-1.5-pro': 'gemini-1.5-pro',
  chat: 'deepseek-chat',
} as const;

export const COPILOT_PROVIDER_MODEL_MAP: Record<
  CopilotProvider,
  CopilotModel[]
> = {
  groq: ['llama-3-70b'],
  openai: ['gpt-4o', 'gpt-4o-mini', 'o1-mini'],
  anthropic: ['claude-3-5-sonnet', 'claude-3-haiku', 'claude-3-5-haiku'],
  google: ['gemini-1.5-flash-8b', 'gemini-1.5-pro', 'gemini-1.5-flash'],
  deepseek: ['chat'],
} as const;

export const COPILOT_PROVIDER_ENDPOINT_MAP: Record<CopilotProvider, string> = {
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions',
  anthropic: 'https://api.anthropic.com/v1/messages',
  google: 'https://generativelanguage.googleapis.com/v1beta/models',
  deepseek: 'https://api.deepseek.com/beta/completions',
} as const;
