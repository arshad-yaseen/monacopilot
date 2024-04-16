import * as monaco from 'monaco-editor';

import Config from '../classes/config';
import {
  CompletionProviderType,
  CompletionRequestParams,
} from '../types/completion';

export const fetchCompletionItem = async ({
  code,
  language,
  token,
}: CompletionRequestParams & {token: monaco.CancellationToken}) => {
  const endpoint = Config.getEndpoint();
  const controller = new AbortController();

  const body = {
    code,
    language,
  } as CompletionRequestParams;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    signal: controller.signal,
  });

  if (token.isCancellationRequested) {
    controller.abort();

    return null;
  }

  const data = await response.json();

  return extractCompletionFromResponse(data);
};

const extractCompletionFromResponse = (data: any): string => {
  const completion: Record<CompletionProviderType, string> = {
    openai: data.choices[0].message.content,
    mistral: data.choices[0].message.content,
  };

  const provider = Config.getProvider();

  return parseCompletion(completion[provider]);
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
