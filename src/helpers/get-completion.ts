import type {EditorModel, EditorPosition} from '../types/common';
import type {
  CompletionMetadata,
  CompletionRequest,
  CompletionResponse,
  FetchCompletionItemParams,
} from '../types/completion';
import {
  determineCompletionMode,
  getCodeBeforeAndAfterCursor,
} from '../utils/completion/syntax-parser';
import {isValidCompletion} from '../utils/completion/validate-completion';
import HTTP from '../utils/http';

export const fetchCompletionItem = async ({
  filename,
  endpoint,
  code,
  language,
  technologies,
  externalContext,
  model,
  position,
  token,
}: FetchCompletionItemParams): Promise<string | null> => {
  if (!isValidCompletion(position, model, language) || !code) {
    return null;
  }

  const controller = new AbortController();

  if (token.isCancellationRequested) {
    controller.abort();
    return null;
  }

  const {completion, error} = await HTTP.POST<
    CompletionResponse,
    CompletionRequest
  >(
    endpoint,
    {
      completionMetadata: constructCompletionMetadata({
        filename,
        position,
        model,
        language,
        technologies,
        externalContext,
      }),
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      error: 'Error while fetching completion item',
      signal: controller.signal,
    },
  );

  if (error || !completion) {
    return null;
  }

  return completion;
};

// Construct completion metadata based on the cursor position and code.
// This metadata is used to generate the completion code from LLM models.
export const constructCompletionMetadata = ({
  filename,
  position,
  model,
  language,
  technologies,
  externalContext,
}: Pick<
  FetchCompletionItemParams,
  | 'filename'
  | 'position'
  | 'model'
  | 'language'
  | 'technologies'
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
    technologies,
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
export const computeCompletionCacheKey = (
  cursorPosition: EditorPosition,
  model: EditorModel,
): string => {
  const {codeBeforeCursor} = getCodeBeforeAndAfterCursor(cursorPosition, model);

  return `${cursorPosition.lineNumber}:${cursorPosition.column}:${codeBeforeCursor}`;
};
