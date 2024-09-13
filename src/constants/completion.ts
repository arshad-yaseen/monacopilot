import {CompletionModel, CompletionProvider} from '../types';

export const COMPLETION_MODEL_IDS: Record<CompletionModel, string> = {
  'llama-3-70b': 'llama3-70b-8192',
  'gpt-4o': 'gpt-4o-2024-08-06',
  'gpt-4o-mini': 'gpt-4o-mini',
  'claude-3.5-sonnet': 'claude-3.5-sonnet-20240620',
  'claude-3-opus': 'claude-3-opus-20240229',
  'claude-3-sonnet': 'claude-3-sonnet-20240229',
  'claude-3-haiku': 'claude-3-haiku-20240307',
  'o1-preview': 'o1-preview',
  'o1-mini': 'o1-mini',
} as const;

export const COMPLETION_PROVIDER_MODEL_MAP: Record<
  CompletionProvider,
  CompletionModel[]
> = {
  groq: ['llama-3-70b'],
  openai: ['gpt-4o', 'gpt-4o-mini', 'o1-preview', 'o1-mini'],
  anthropic: [
    'claude-3.5-sonnet',
    'claude-3-opus',
    'claude-3-haiku',
    'claude-3-sonnet',
  ],
} as const;

export const DEFAULT_COMPLETION_MODEL: CompletionModel = 'llama-3-70b' as const;
export const DEFAULT_COMPLETION_PROVIDER: CompletionProvider = 'groq' as const;

export const CHAT_COMPLETION_ENDPOINT_BY_PROVIDER: Record<
  CompletionProvider,
  string
> = {
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions',
  anthropic: 'https://api.anthropic.com/v1/messages',
} as const;

export const DEFAULT_COMPLETION_TEMPERATURE = 0.3 as const;
