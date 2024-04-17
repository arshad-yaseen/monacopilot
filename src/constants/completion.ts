import {CompletionModelType, CompletionProviderType} from '../types/completion';

export const COMPLETION_CODE_KEY = 'continued_code';

export const COMPLETION_SYSTEM_PROMPT =
  'You are an intelligent {language_or_framework} coder currently writing code. Your cursor is now at {cursor}.';

export const COMPLETION_FUNCTION_CALL = {
  name: 'code_completer', // Name of the function
  description: 'Continues the existing code based on its current state.', // Describes what the function does
  parameters: {
    type: 'object', // Specifies that parameters should be an object
    properties: {
      [COMPLETION_CODE_KEY]: {
        type: 'string', // Specifies that the completion code should be a string
        description: 'The code snippet to insert at the cursor.', // Describes what the key holds
      },
    },
    required: [COMPLETION_CODE_KEY], // Lists required properties in the object
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
