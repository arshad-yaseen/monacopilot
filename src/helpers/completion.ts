import * as monaco from 'monaco-editor';

import {CompletionModelType, CompletionProviderType} from '../types';

interface GetCompletionFn {
  provider: CompletionProviderType;
  model: CompletionModelType;
  apiKey: string;
  language: string;
  value: string;
}

export const getCompletionItem = async ({
  provider,
  model,
  apiKey,
  language,
  value,
}: GetCompletionFn) => {
  const response = await fetch(PROVIDER_API_ENDPOINTS[provider], {
    method: 'POST',
    headers: getHeaders(provider, apiKey),
    body: JSON.stringify(getBody(provider, model, language, value)),
    mode: 'no-cors',
  });

  const completion = await response.json();

  console.log(completion);

  return parseCompletionResponse(completion, provider);
};

const PROVIDER_API_ENDPOINTS: Record<CompletionProviderType, string> = {
  anthropic: 'https://api.anthropic.com/v1/messages',
};

const parseCompletionResponse = (
  response: any,
  provider: CompletionProviderType,
) => {
  switch (provider) {
    case 'anthropic':
      return response.choices[0].message.content;
  }
};

const getBody = (
  provider: CompletionProviderType,
  model: CompletionModelType,
  language: string,
  value: string,
) => {
  switch (provider) {
    case 'anthropic':
      return {
        model: model,
        messages: [
          {
            role: 'user',
            content: `${generateCompletionPrompt(language)}\n\n${value}`,
          },
        ],
        temperature: 0.1,
        max_tokens: 50,
      };
  }
};

const getHeaders = (provider: CompletionProviderType, apiKey: string) => {
  let headers: Record<string, string> = {};

  switch (provider) {
    case 'anthropic':
      headers = {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      };
      break;
  }

  return {
    ...headers,
    'Content-Type': 'application/json',
  };
};

export const generateCompletionPrompt = (language: string) => {
  return `Given a snippet of ${language} code, suggest the next code of the code snippet provided to follow. Ensure the prediction is highly relevant and precise. Write me only the continuation code`;
};

export const getCompletionCacheKey = (
  position: monaco.Position,
  value: string,
) => `${position.lineNumber}:${position.column}:${value}`;
