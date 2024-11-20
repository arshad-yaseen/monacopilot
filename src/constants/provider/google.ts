import {GoogleModel} from '../../types';

export const MAX_TOKENS_BY_ANTHROPIC_MODEL: Record<GoogleModel, number> = {
  'gemini-1.5-flash': 8192,
  'gemini-1.5-flash-8b': 8192,
  'gemini-1.5-pro': 8192,
} as const;
