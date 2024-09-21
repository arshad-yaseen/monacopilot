import {ErrorContext, handleError} from '../../error';
import {
  CompletionMetadata,
  CompletionMode,
  CompletionRequestBody,
  CompletionResponse,
  CursorPosition,
  EditorModel,
  ExternalContext,
  FetchCompletionItemParams,
} from '../../types';
import {
  getTextAfterCursor,
  getTextBeforeCursor,
  HTTP,
  keepNLines,
} from '../../utils';

const CONTENT_TYPE_JSON = 'application/json';

/**
 * Fetches a completion item from the API.
 * @param {FetchCompletionItemParams} params - The parameters for fetching the completion item.
 * @returns {Promise<string | null>} The completion item or null if an error occurs or the request is aborted.
 */
export const fetchCompletionItem = async ({
  filename,
  endpoint,
  language,
  technologies,
  externalContext,
  mdl,
  pos,
  maxContextLines,
}: FetchCompletionItemParams): Promise<string | null> => {
  try {
    const {completion} = await HTTP.POST<
      CompletionResponse,
      CompletionRequestBody
    >(
      endpoint,
      {
        completionMetadata: constructCompletionMetadata({
          filename,
          pos,
          mdl,
          language,
          technologies,
          externalContext,
          maxContextLines,
        }),
      },
      {
        headers: {'Content-Type': CONTENT_TYPE_JSON},
        error: 'Error while fetching completion item',
      },
    );

    return completion;
  } catch (err) {
    handleError(err, ErrorContext.FETCH_COMPLETION_ITEM);

    return null;
  }
};

/**
 * Constructs the metadata required for fetching a completion item.
 */
export const constructCompletionMetadata = ({
  filename,
  pos,
  mdl,
  language,
  technologies,
  externalContext,
  maxContextLines,
}: Omit<
  FetchCompletionItemParams,
  'text' | 'endpoint' | 'token' | 'abortSignal'
>): CompletionMetadata => {
  const completionMode = determineCompletionMode(pos, mdl);

  /**
   * Retrieves and optionally limits text based on the cursor position.
   */
  const getLimitedText = (
    getText: (pos: CursorPosition, mdl: EditorModel) => string,
    pos: CursorPosition,
    mdl: EditorModel,
    maxLines?: number,
    options?: {from?: 'start' | 'end'},
  ): string => {
    const text = getText(pos, mdl);
    if (!maxLines) return text;
    return keepNLines(text, maxLines, options);
  };

  /**
   * Processes external contexts by limiting their content lines if required.
   */
  const processExternalContexts = (
    contexts: ExternalContext[] | undefined,
    maxLines?: number,
  ): ExternalContext[] | undefined => {
    if (!maxLines || !contexts) {
      return contexts;
    }

    return contexts.map(({content, ...rest}) => ({
      ...rest,
      content: keepNLines(content, maxLines),
    }));
  };

  const textBeforeCursor = getLimitedText(
    getTextBeforeCursor,
    pos,
    mdl,
    maxContextLines,
    {from: 'end'},
  );
  const textAfterCursor = getLimitedText(
    getTextAfterCursor,
    pos,
    mdl,
    maxContextLines,
  );

  // Process external contexts with limited lines
  const limitedExternalContext = processExternalContexts(
    externalContext,
    maxContextLines,
  );

  return {
    filename,
    language,
    technologies,
    externalContext: limitedExternalContext,
    textBeforeCursor,
    textAfterCursor,
    cursorPosition: pos,
    editorState: {
      completionMode,
    },
  };
};

/**
 * Determines the completion mode based on the cursor position and editor model.
 * @param {CursorPosition} pos - The cursor position in the editor.
 * @param {EditorModel} mdl - The editor model.
 * @returns {CompletionMode} The determined completion mode.
 */
const determineCompletionMode = (
  pos: CursorPosition,
  mdl: EditorModel,
): CompletionMode => {
  const textBeforeCursor = getTextBeforeCursor(pos, mdl);
  const textAfterCursor = getTextAfterCursor(pos, mdl);

  return textBeforeCursor && textAfterCursor
    ? 'fill-in-the-middle'
    : 'completion';
};
