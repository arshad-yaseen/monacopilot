import {logError} from '../../logger';
import {
  CompletionMode,
  CompletionRequestBody,
  CompletionResponse,
  ConstructCompletionMetadataParams,
  CursorPosition,
  EditorModel,
  FetchCompletionItemParams,
  LoggerContext,
  RelatedFile,
} from '../../types';
import {
  getCharAfterCursor,
  getTextAfterCursor,
  getTextAfterCursorInLine,
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
  mdl,
  pos,
  ...options
}: FetchCompletionItemParams): Promise<string | null> => {
  const {endpoint, requestOptions, onError} = options;

  const {headers} = requestOptions ?? {};

  try {
    const {completion, error} = await HTTP.POST<
      CompletionResponse,
      CompletionRequestBody
    >(
      endpoint,
      {
        completionMetadata: constructCompletionMetadata({
          pos,
          mdl,
          options,
        }),
      },
      {
        headers: {
          'Content-Type': CONTENT_TYPE_JSON,
          ...headers,
        },
        fallbackError: 'Error while fetching completion item',
      },
    );

    if (error) {
      throw new Error(error);
    }

    return completion;
  } catch (err) {
    if (onError) {
      onError(err as Error);
    } else {
      logError(err, LoggerContext.FETCH_COMPLETION_ITEM);
    }

    return null;
  }
};

/**
 * Constructs the metadata required for fetching a completion item.
 */
export const constructCompletionMetadata = ({
  pos,
  mdl,
  options,
}: ConstructCompletionMetadataParams) => {
  const {filename, language, technologies, relatedFiles, maxContextLines} =
    options;

  const completionMode = determineCompletionMode(pos, mdl);

  // Determine the divisor based on the presence of related files
  const hasRelatedFiles = !!relatedFiles?.length;
  const divisor = hasRelatedFiles ? 3 : 2;
  const adjustedMaxContextLines = maxContextLines
    ? Math.floor(maxContextLines / divisor)
    : undefined;

  const limitText = (
    getTextFn: (pos: CursorPosition, mdl: EditorModel) => string,
    maxLines?: number,
    options?: {from?: 'start' | 'end'},
  ): string => {
    const text = getTextFn(pos, mdl);
    return maxLines ? keepNLines(text, maxLines, options) : text;
  };

  const processRelatedFiles = (
    files?: RelatedFile[],
    maxLines?: number,
  ): RelatedFile[] | undefined => {
    if (!files || !maxLines) return files;

    return files.map(({content, ...rest}) => ({
      ...rest,
      content: keepNLines(content, maxLines),
    }));
  };

  // Retrieve and limit text around the cursor position
  const textBeforeCursor = limitText(
    getTextBeforeCursor,
    adjustedMaxContextLines,
    {
      from: 'end',
    },
  );
  const textAfterCursor = limitText(
    getTextAfterCursor,
    adjustedMaxContextLines,
  );

  // Process related files with the adjusted maximum lines
  const limitedRelatedFiles = processRelatedFiles(
    relatedFiles,
    adjustedMaxContextLines,
  );

  return {
    filename,
    language,
    technologies,
    relatedFiles: limitedRelatedFiles,
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
  const charAfterCursor = getCharAfterCursor(pos, mdl);
  const textAfterCursor = getTextAfterCursorInLine(pos, mdl);

  if (charAfterCursor) {
    return 'insert';
  }

  if (textAfterCursor.trim()) {
    return 'complete';
  }

  return 'continue';
};
