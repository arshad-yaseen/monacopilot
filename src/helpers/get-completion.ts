import {
  EditorModelType,
  EditorPositionType,
  FetchCompletionItemParams,
} from '../types/common';
import {
  CompletionMetadata,
  CompletionRequestParams,
  GroqCompletion,
} from '../types/completion';
import {
  determineCompletionMode,
  getCodeBeforeAndAfterCursor,
} from '../utils/completion/syntax-parser';
import {isValidCompletion} from '../utils/completion/validate-completion';
import {POST} from '../utils/http';

export const fetchCompletionItem = async ({
  filename,
  endpoint,
  code,
  language,
  framework,
  externalContext,
  model,
  position,
  token,
}: FetchCompletionItemParams) => {
  if (!isValidCompletion(position, model, language) || !code) {
    return null;
  }

  const abortController = new AbortController();

  const data = await POST<GroqCompletion, CompletionRequestParams>(
    endpoint,
    {
      completionMetadata: constructCompletionMetadata({
        filename,
        position,
        model,
        language,
        framework,
        externalContext,
      }),
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

  return data.choices[0].message.content;
};

// Construct completion metadata based on the cursor position and code.
// This metadata is used to generate the completion code from LLM models.
export const constructCompletionMetadata = ({
  filename,
  position,
  model,
  language,
  framework,
  externalContext,
}: Pick<
  FetchCompletionItemParams,
  | 'filename'
  | 'position'
  | 'model'
  | 'language'
  | 'framework'
  | 'externalContext'
>): CompletionMetadata => {
  const completionMode = determineCompletionMode(position, model);

  const {codeBeforeCursor, codeAfterCursor} = getCodeBeforeAndAfterCursor(
    position,
    model,
  );

  return {
    filename,
    language,
    framework: framework || undefined,
    externalContext,
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
  cursorPosition: EditorPositionType,
  model: EditorModelType,
): string => {
  const {codeBeforeCursor} = getCodeBeforeAndAfterCursor(cursorPosition, model);

  return `${cursorPosition.lineNumber}:${cursorPosition.column}:${codeBeforeCursor}`;
};
