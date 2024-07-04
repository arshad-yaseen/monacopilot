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
import HTTP from '../utils/http';

const CONTENT_TYPE_JSON = 'application/json';
const ERROR_MESSAGE = 'Error while fetching completion item';

export const fetchCompletionItem = async ({
  filename,
  endpoint,
  language,
  technologies,
  externalContext,
  model,
  position,
  token,
}: FetchCompletionItemParams): Promise<string | null> => {
  const controller = new AbortController();

  if (token.isCancellationRequested) {
    controller.abort();
    return null;
  }

  try {
    const {completion} = await HTTP.POST<CompletionResponse, CompletionRequest>(
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
        headers: {'Content-Type': CONTENT_TYPE_JSON},
        error: ERROR_MESSAGE,
        signal: controller.signal,
      },
    );

    return completion || null;
  } catch (error) {
    console.error(ERROR_MESSAGE, error);
    return null;
  }
};

export const constructCompletionMetadata = ({
  filename,
  position,
  model,
  language,
  technologies,
  externalContext,
}: Omit<
  FetchCompletionItemParams,
  'code' | 'endpoint' | 'token'
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
    editorState: {completionMode},
  };
};

export const computeCompletionCacheKey = (
  cursorPosition: EditorPosition,
  model: EditorModel,
): string => {
  const {codeBeforeCursor} = getCodeBeforeAndAfterCursor(cursorPosition, model);
  return `${cursorPosition.lineNumber}:${cursorPosition.column}:${codeBeforeCursor}`;
};
