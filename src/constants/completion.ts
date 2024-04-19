import {CompletionModelType, CompletionProviderType} from '../types/completion';

export const _COMPLETION_SERVER_BASE_URL =
  'https://completion-server.arshadpyaseen.workers.dev';

export const COMPLETION_CODE_KEY = 'continued_code';

export const COMPLETION_SYSTEM_PROMPT =
  'You are an intelligent {language_or_framework} coder currently writing code. Your cursor is now at {cursor}.';

export const COMPLETION_FUNCTION_CALL = {
  name: 'code_completer',
  description:
    'Continues the existing code based on its current state and context.',
  parameters: {
    type: 'object',
    properties: {
      [COMPLETION_CODE_KEY]: {
        type: 'string',
        description: 'The code you will write next.',
      },
    },
    required: [COMPLETION_CODE_KEY],
  },
};

export const DEFAULT_COMPLETION_MODEL: CompletionModelType =
  'gpt-3.5-turbo-0125';

export const PROVIDER_API_ENDPOINTS: Record<CompletionProviderType, string> = {
  openai: 'https://api.openai.com/v1/chat/completions',
};

export const COMPLETION_PROVIDER_OF_: Record<
  CompletionModelType,
  CompletionProviderType
> = {
  'gpt-3.5-turbo-0125': 'openai',
};
