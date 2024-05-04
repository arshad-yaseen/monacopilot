import * as monaco from 'monaco-editor';

import {EditorModelType, EditorPositionType} from '../types/common';
import {
  CompletionMetadata,
  CompletionRequestParams,
  GroqCompletion,
} from '../types/completion';
import {EndpointType, FrameworkType} from '../types/editor-props';
import {sanitizeCompletionCode} from '../utils/completion/common';
import {
  determineCompletionMode,
  getCodeBeforeAndAfterCursor,
} from '../utils/completion/syntax-parser';
import {isValidCompletion} from '../utils/completion/validate-completion';
import {POST} from '../utils/http';

export const fetchCompletionItem = async ({
  endpoint,
  code,
  language,
  framework,
  model,
  position,
  token,
}: {
  code: string;
  language: string;
  endpoint: EndpointType;
  framework: FrameworkType | undefined;
  model: EditorModelType;
  position: EditorPositionType;
  token: monaco.CancellationToken;
}) => {
  if (!isValidCompletion(position, model, language) || !code) {
    return null;
  }

  const abortController = new AbortController();

  const data = await POST<GroqCompletion, CompletionRequestParams>(
    endpoint,
    {
      completionMetadata: constructCompletionMetadata(
        position,
        model,
        language,
        framework,
      ),
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      error: 'Error while fetching completion item',
      signal: abortController.signal,
    },
  );

  if (token.isCancellationRequested) {
    abortController.abort();
    return null;
  }

  if (data.error) {
    return null;
  }

  return sanitizeCompletionCode(data.choices[0].message.content);
};

// Construct completion metadata based on the cursor position and code.
// This metadata is used to generate the completion code from LLM models.
export const constructCompletionMetadata = (
  position: EditorPositionType,
  model: EditorModelType,
  language: string,
  framework: FrameworkType | undefined,
): CompletionMetadata => {
  const {lineNumber, column} = position;
  const completionMode = determineCompletionMode(position, model);

  const {codeBeforeCursor, codeAfterCursor} = getCodeBeforeAndAfterCursor(
    position,
    model,
  );

  return {
    language,
    framework: framework || undefined,
    cursorPosition: {
      lineNumber: lineNumber,
      columnNumber: column,
    },
    codeBeforeCursor,
    codeAfterCursor,
    editorState: {
      completionMode,
    },
  };
};

// Compute a cache key based on the cursor's position and preceding text
// This key is used to cache completion results for the same code context
export const computeCacheKeyForCompletion = (
  {lineNumber, column}: EditorPositionType,
  model: EditorModelType,
): string => {
  const codeUntilCursor = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: lineNumber,
    endColumn: column,
  });

  return `${lineNumber}:${column}:${codeUntilCursor}`;
};
