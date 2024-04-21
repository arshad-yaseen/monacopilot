import Config from '../classes/config';
import {COMPLETION_CODE_KEY} from '../constants/completion';
import {EditorModelType, EditorPositionType} from '../types/common';
import {
  CompletionProviderType,
  CompletionRequestParams,
} from '../types/completion';
import {objectToString, parseJson} from '../utils/common';
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
}): Promise<string | null | undefined> => {
  if (!isValidCompletion(position, model, language) || !code) {
    return null;
  }

  const endpoint = Config.getEndpoint();

  if (!endpoint) {
    return null;
  }

  const body = {
    code: extractCodeForCompletion(code, position),
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

// Extract the completion code from the response based on the provider
const extractCompletionFromResponse = (
  data: any,
): string | null | undefined => {
  const completion: Record<CompletionProviderType, string> = {
    openai: data?.choices?.[0]?.message?.content,
  };

  const provider = Config.getProvider();

  try {
    const completionCode = parseJson(completion[provider])[COMPLETION_CODE_KEY];

    if (typeof completionCode === 'object') {
      return objectToString(completionCode);
    } else {
      return completionCode;
    }
  } catch (e) {
    return null;
  }
};

// Adjust code string with cursor position placeholder
export const extractCodeForCompletion = (
  code: string,
  cursorPosition: EditorPositionType,
): string => {
  const lines = code.split('\n');
  const {lineNumber, column} = cursorPosition;

  lines[lineNumber - 1] =
    lines[lineNumber - 1].substring(0, column - 1) +
    `// Cursor is here at line ${lineNumber}, column ${column}` +
    lines[lineNumber - 1].substring(column - 1);

  return lines.join('\n');
};
// Compute a cache key based on the cursor's position and preceding text
export const computeCacheKeyForCompletion = (
  {lineNumber, column}: EditorPositionType,
  code: string,
): string => {
  const codeUntilCursor = code.substring(0, column - 1);
  return `${lineNumber}:${column}:${codeUntilCursor}`;
};
