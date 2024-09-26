import {ErrorContext, handleError} from '../../error';
import {
  CompletionMetadata,
  CompletionMode,
  CompletionRequestBody,
  CompletionResponse,
  CursorPosition,
  EditorModel,
  FetchCompletionItemParams,
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
  filename,
  endpoint,
  language,
  technologies,
  relatedFiles,
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
          relatedFiles,
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
  relatedFiles,
  maxContextLines,
}: Omit<
  FetchCompletionItemParams,
  'text' | 'endpoint' | 'token' | 'abortSignal'
>): CompletionMetadata => {
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
