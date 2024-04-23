import {EditorModelType, EditorPositionType} from '../types/common';
import {
  CompletionMetadata,
  CompletionRequestParams,
  GroqCompletion,
} from '../types/completion';
import {FrameworkType} from '../types/editor-props';
import {sanitizeCompletionCode} from '../utils/completion/common';
import {
  getCodeBeforeAndAfterCursor,
  isFillInMode,
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
}: {
  endpoint: string;
  code: string;
  language: string;
  framework: FrameworkType | undefined;
  model: EditorModelType;
  position: EditorPositionType;
}) => {
  if (!isValidCompletion(position, model, language) || !code) {
    return null;
  }

  const data = await POST<GroqCompletion, CompletionRequestParams>(
    endpoint,
    {
      completionMetadata: constructCompletionMetadata(
        code,
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
    },
  );

  if (data.error) {
    return null;
  }

  return sanitizeCompletionCode(data.choices[0].message.content);
};

// Construct completion metadata based on the cursor position and code.
// This metadata is used to generate the completion code from LLM models.
export const constructCompletionMetadata = (
  code: string,
  position: EditorPositionType,
  model: EditorModelType,
  language: string,
  framework: FrameworkType | undefined,
): CompletionMetadata => {
  const {lineNumber, column} = position;
  const completionMode = isFillInMode(position, model) ? 'fill-in' : 'extend';

  const {codeBeforeCursor, codeAfterCursor} = getCodeBeforeAndAfterCursor(
    position,
    model,
  );

  return {
    language,
    framework: framework || undefined,
    cursorPosition: {
      line: lineNumber,
      column,
    },
    codeBeforeCursor,
    codeAfterCursor,
    editorState: {
      completionMode,
      codeLengthBeforeCursor: codeBeforeCursor.length,
      totalCodeLength: code.length,
    },
  };
};

// Compute a cache key based on the cursor's position and preceding text
// This key is used to cache completion results for the same code context
export const computeCacheKeyForCompletion = (
  {lineNumber, column}: EditorPositionType,
  code: string,
): string => {
  const codeUntilCursor = code.substring(0, column - 1);
  return `${lineNumber}:${column}:${codeUntilCursor}`;
};
