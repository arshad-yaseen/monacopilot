import {err} from '../error';
import {
  CompletionMetadata,
  CompletionMode,
  CompletionRequest,
  CompletionResponse,
  EditorModel,
  EditorPosition,
  FetchCompletionItemParams,
} from '../types';
import {getTextAfterCursor, getTextBeforeCursor, HTTP} from '../utils';

const CONTENT_TYPE_JSON = 'application/json';

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
        error: 'Error while fetching completion item',
        signal: controller.signal,
      },
    );

    return completion || null;
  } catch (error) {
    err(error).completionError('Error while fetching completion item');
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
  'text' | 'endpoint' | 'token'
>): CompletionMetadata => {
  const completionMode = determineCompletionMode(position, model);

  const textBeforeCursor = getTextBeforeCursor(position, model);
  const textAfterCursor = getTextAfterCursor(position, model);

  return {
    filename,
    language,
    technologies,
    externalContext,
    textBeforeCursor,
    textAfterCursor,
    editorState: {completionMode},
  };
};

const determineCompletionMode = (
  position: EditorPosition,
  model: EditorModel,
): CompletionMode => {
  const textBeforeCursor = getTextBeforeCursor(position, model);
  const textAfterCursor = getTextAfterCursor(position, model);

  return textBeforeCursor && textAfterCursor
    ? 'fill-in-the-middle'
    : 'completion';
};
