import {COMPLETION_SYSTEM_PROMPT} from '../constants/completion';
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
      messages: [
        {
          role: 'system',
          content: getPrompt(data.language, data.framework),
        },
        {
          role: 'user',
          content: data.code,
        },
      ],
      response_format: {
        type: 'json_object',
      },
    },
  };

  return body[provider];
};

const getPrompt = (
  language: string | undefined,
  framework: Framework | undefined,
) => {
  return COMPLETION_SYSTEM_PROMPT.replaceAll(
    '{language_or_framework}',
    framework || language || '',
  );
};
