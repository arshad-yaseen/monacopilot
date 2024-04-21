import Config from '../classes/config';
import {
  COMPLETION_CODE_KEY,
  PROMPT_CURSOR_PLACEHOLDER,
} from '../constants/completion';
import {EditorModelType, EditorPositionType} from '../types/common';
import {
  CompletionProviderType,
  CompletionRequestParams,
} from '../types/completion';
import {parseJson} from '../utils/common';
import {isValidCompletion} from '../utils/completion/validate-completion';

export const fetchCompletionItem = async ({
  code,
  language,
  framework,
  model,
  position,
}: CompletionRequestParams & {
  model: EditorModelType;
  position: EditorPositionType;
}) => {
  if (!isValidCompletion(position, model) || !code) {
    return null;
  }

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

const extractCompletionFromResponse = (
  data: any,
): string | undefined | null => {
  const completion: Record<CompletionProviderType, string> = {
    openai: data.choices[0].message.function_call.arguments,
  };

  const provider = Config.getProvider();

  return parseJson(completion[provider])[COMPLETION_CODE_KEY];
};

// Extract the code from the editor value and insert a {cursor} placeholder at the cursor position
export const extractCodeForCompletion = (
  code: string,
  cursorPosition: EditorPositionType,
) => {
  const lineNumber = cursorPosition.lineNumber - 1;
  const column = cursorPosition.column - 1;

  const lines = code.split('\n');

  lines[lineNumber] =
    lines[lineNumber].substring(0, column) +
    PROMPT_CURSOR_PLACEHOLDER +
    lines[lineNumber].substring(column);

  return lines.join('\n');
};

export const computeCacheKeyForCompletion = (
  cursorPosition: EditorPositionType,
  code: string,
) => {
  const codeUntilCursor = code.substring(0, cursorPosition.column - 1);
  return `${cursorPosition.lineNumber}:${cursorPosition.column}:${codeUntilCursor}`;
};
