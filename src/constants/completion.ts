import {CompletionModelType, CompletionProviderType} from '../types/completion';

export const _COMPLETION_SERVER_BASE_URL =
  'https://completion-server.arshadpyaseen.workers.dev';

export const COMPLETION_CODE_KEY = 'completion_code';
export const PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER =
  '{language_or_framework}';

export const COMPLETION_SYSTEM_PROMPT = `I'm working on a large-scale project using ${PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER}, where I have been coding for the past 4 hours. Now, I need to take a break and would like your help to continue from where I left off. Please analyze the context and the state of the code I've written so far. Start from the current cursor position and write the next segment of code. Return the code as the value of '${COMPLETION_CODE_KEY}' in a valid JSON object for easy parsing. Your understanding of ${PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER} as an intelligent developer will be crucial in providing the correct continuation.`;

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
