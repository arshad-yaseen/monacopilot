import * as monaco from 'monaco-editor';

import {Client} from '../../classes';
import {COMPLETION_PROVIDER_OF_} from '../../constants/completion';
import {
  CompletionProviderType,
  CompletionRequestParams,
  ProviderResponse,
} from '../../types/completion';

export const fetchCompletionItem = async ({
  code,
  language,
  token,
}: CompletionRequestParams) => {
  const endpoint = Client.getEndpoint();
  const controller = new AbortController();

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({code, language}),
    signal: controller.signal,
  });

  if (token.isCancellationRequested) {
    controller.abort();

    return null;
  }

  const data = await response.json();

  return getCompletionResponse(data);
};

const getCompletionResponse = (data: ProviderResponse): string => {
  let completion: string | null = '';

  switch (COMPLETION_PROVIDER_OF_[data.model] as CompletionProviderType) {
    case 'openai':
      completion = data.choices[0].message.content;
      break;
    case 'mistral':
      completion = data.choices[0].message.content;
      break;
  }

  return parseCompletion(completion);
};

const parseCompletion = (completion: string | null) => {
  if (!completion) {
    return null;
  }

  if (completion.startsWith('```json') && completion.endsWith('```')) {
    completion = completion.slice(7, -3);
  }

  try {
    return JSON.parse(completion).predicted_next_code;
  } catch (error) {
    return null;
  }
};

export const extractCodeForCompletion = (
  editorValue: string,
  cursorPosition: monaco.Position,
) => {
  const lineNumber = cursorPosition.lineNumber - 1;
  const column = cursorPosition.column - 1;

  const lines = editorValue.split('\n');

  lines[lineNumber] =
    lines[lineNumber].substring(0, column) +
    '{predict_code_here}' +
    lines[lineNumber].substring(column);

  return lines.join('\n');
};

export const computeCacheKeyForCompletion = (
  position: monaco.Position,
  value: string,
) => `${position.lineNumber}:${position.column}:${value}`;
