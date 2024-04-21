import {CompletionModelType, CompletionProviderType} from '../types/completion';

export const _COMPLETION_SERVER_BASE_URL =
  'https://completion-server.arshadpyaseen.workers.dev';

export const COMPLETION_CODE_KEY = 'continued_code';
export const PROMPT_CURSOR_PLACEHOLDER = '{cursor}';
export const PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER =
  '{language_or_framework}';

export const COMPLETION_SYSTEM_PROMPT = `As an adept ${PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER} developer, you are continuing a code snippet. Your cursor is at ${PROMPT_CURSOR_PLACEHOLDER}. Please ensure that your completion adheres to the coding conventions and styles typical for ${PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER}. Specifically, provide the minimal necessary code that logically and syntactically follows from the previous lines. Avoid adding any wrappers, function calls, or additional text unless explicitly required by the code context.`;

export const COMPLETION_FUNCTION_CALL = {
  name: 'code_completer',
  description:
    'Provides a precise and minimal continuation of the existing code, ensuring the completion is syntactically correct and directly follows from the given context without adding unnecessary elements.',
  parameters: {
    type: 'object',
    properties: {
      [COMPLETION_CODE_KEY]: {
        type: 'string',
        description: `For example, if the input code is 'if(random > 0.5) { console.log(${PROMPT_CURSOR_PLACEHOLDER})', the expected completion would simply be "'Random number is greater than 0.5';" ensuring it fits directly within the existing logical structure and follows typical JavaScript conventions.`,
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
