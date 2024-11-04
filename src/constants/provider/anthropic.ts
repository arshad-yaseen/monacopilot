import {AnthropicModel} from '../../types';

export const MAX_TOKENS_BY_ANTHROPIC_MODEL: Record<AnthropicModel, number> = {
  'claude-3-5-sonnet': 8192,
  'claude-3-5-haiku': 8192,
  'claude-3-haiku': 4096,
} as const;
