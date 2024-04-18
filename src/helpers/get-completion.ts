import * as monaco from 'monaco-editor';

import Config from '../classes/config';
import {COMPLETION_CODE_KEY} from '../constants/completion';
import {
  CompletionProviderType,
  CompletionRequestParams,
} from '../types/completion';
import {parseJson} from '../utils/common';

export const fetchCompletionItem = async ({
  code,
  language,
  framework,
}: CompletionRequestParams) => {
  const endpoint = Config.getEndpoint();

  if (!endpoint) {
    return null;
  }

  const body = {
    code,
    language,
    framework,
  } satisfies CompletionRequestParams;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return extractCompletionFromResponse(data);
};

const extractCompletionFromResponse = (data: any): string => {
  const completion: Record<CompletionProviderType, string> = {
    openai: data.choices[0].message.function_call.arguments,
  };

  const provider = Config.getProvider();

  return parseJson(completion[provider])[COMPLETION_CODE_KEY];
};

// Extract the code from the editor value and insert a {cursor} placeholder at the cursor position
export const extractCodeForCompletion = (
  editorValue: string,
  cursorPosition: monaco.Position,
) => {
  const lineNumber = cursorPosition.lineNumber - 1;
  const column = cursorPosition.column - 1;

  const lines = editorValue.split('\n');

  lines[lineNumber] =
    lines[lineNumber].substring(0, column) +
    '{cursor}' +
    lines[lineNumber].substring(column);

  return lines.join('\n');
};

export const computeCacheKeyForCompletion = (
  position: monaco.Position,
  code: string,
) => {
  const codeUntilCursor = code.substring(0, position.column - 1);
  return `${position.lineNumber}:${position.column}:${codeUntilCursor}`;
};
