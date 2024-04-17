import {
  COMPLETION_FUNCTION_CALL,
  COMPLETION_SYSTEM_PROMPT,
} from '../constants/completion';
import {Framework} from '../types/common';
import {
  CompletionModelType,
  CompletionProviderType,
  CompletionRequestParams,
} from '../types/completion';

export const getProviderRequestHeaders = (
  provider: CompletionProviderType,
  apiKey: string,
): HeadersInit => {
  const headers: Record<CompletionProviderType, HeadersInit> = {
    openai: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };

  return headers[provider];
};

export const getProviderRequestBody = (
  data: CompletionRequestParams,
  provider: CompletionProviderType,
  model: CompletionModelType,
) => {
  const body: Record<CompletionProviderType, object> = {
    openai: {
      model,
      temperature: 0.1,
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(data.language, data.framework),
        },
        {
          role: 'user',
          content: data.code,
        },
      ],
      functions: [COMPLETION_FUNCTION_CALL],
    },
  };

  return body[provider];
};

const getSystemPrompt = (
  language: string | undefined,
  framework: Framework | undefined,
) => {
  return COMPLETION_SYSTEM_PROMPT.replaceAll(
    '{language_or_framework}',
    framework || language || '',
  );
};
