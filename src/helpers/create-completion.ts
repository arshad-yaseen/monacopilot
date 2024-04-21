import {
  COMPLETION_FUNCTION_CALL,
  COMPLETION_SYSTEM_PROMPT,
  PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER,
} from '../constants/completion';
import {FrameworkType} from '../types/common';
import {
  CompletionModelType,
  CompletionProviderType,
  CompletionRequestParams,
} from '../types/completion';

// Get request headers for different providers
export const getProviderRequestHeaders = (
  provider: CompletionProviderType,
  apiKey: string,
): HeadersInit => {
  const headers: {
    [key in CompletionProviderType]: HeadersInit;
  } = {
    openai: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };

  return headers[provider];
};

// Get request body depending on the provider
export const getProviderRequestBody = (
  data: CompletionRequestParams,
  provider: CompletionProviderType,
  model: CompletionModelType,
): object => {
  const body: {
    [key in CompletionProviderType]: object;
  } = {
    openai: {
      model,
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
      max_tokens: 50,
    },
  };

  return body[provider];
};

const getSystemPrompt = (
  language: string | undefined,
  framework: FrameworkType | undefined,
): string => {
  return COMPLETION_SYSTEM_PROMPT.replace(
    PROMPT_LANGUAGE_OR_FRAMEWORK_PLACEHOLDER,
    framework || language || 'General',
  );
};
