import {COMPLETION_PROMPT} from '../constants/completion';
import {
  CompletionModelType,
  CompletionProviderType,
  CompletionRequestParams,
  ProviderRequestBody,
} from '../types/completion';

export const getProviderRequestHeaders = (
  provider: CompletionProviderType,
  apiKey: string,
): HeadersInit => {
  switch (provider) {
    case 'openai':
      return {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };
    case 'mistral':
      return {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };
    default:
      return {};
  }
};

export const getProviderRequestBody = (
  data: CompletionRequestParams,
  provider: CompletionProviderType,
  model: CompletionModelType,
): ProviderRequestBody => {
  let requestBody: ProviderRequestBody;

  switch (provider) {
    case 'openai':
      requestBody = {
        model,
        messages: [
          {
            role: 'system',
            content: getPrompt(data.language),
          },
          {
            role: 'user',
            content: data.code,
          },
        ],
        response_format: {
          type: 'json_object',
        },
      };
      break;
    case 'mistral':
      requestBody = {
        model,
        messages: [
          {
            role: 'system',
            content: getPrompt(data.language),
          },
          {
            role: 'user',
            content: data.code,
          },
        ],
        response_format: {
          type: 'json_object',
        },
      };
      break;
  }

  return requestBody;
};

const getPrompt = (language: string | undefined) =>
  COMPLETION_PROMPT.replace('{language}', language || '');
