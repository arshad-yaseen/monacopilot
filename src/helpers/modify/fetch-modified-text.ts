import {
  ConstructModifyMetadataParams,
  FetchModifiedTextParams,
  FetchModifiedTextReturn,
  ModifyApiRequestBody,
  ModifyApiResponse,
  ModifyMetadata,
} from '../../types';
import {
  getTextAfterCursor,
  getTextBeforeCursor,
  HTTP,
  keepNLines,
} from '../../utils';

const CONTENT_TYPE_JSON = 'application/json';

/**
 * Fetches the modified text from the API.
 * @param {Object} params - The parameters for the modify request.
 * @param {string} params.endpoint - The endpoint to fetch the modified text from.
 * @param {ModifyApiRequestBody} params.body - The body of the modify request.
 * @returns {Promise<string | null>} The modified text or null if an error occurs.
 * @throws {Error} If there's an error during the fetch operation.
 */
export const fetchModifiedText = async (
  params: FetchModifiedTextParams,
): Promise<FetchModifiedTextReturn> => {
  const {endpoint, body} = params;

  const {modifiedText, error} = await HTTP.POST<
    ModifyApiResponse,
    ModifyApiRequestBody
  >(endpoint, body, {
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
    fallbackError: 'Error while fetching modified text',
  });

  if (error) {
    throw new Error(error);
  }

  return {modifiedText};
};

/**
 * Constructs the metadata required for fetching a modified text.
 */
export const constructModifyMetadata = ({
  pos,
  mdl,
  selection,
  prompt,
  options,
}: ConstructModifyMetadataParams): ModifyMetadata => {
  const {context} = options;
  const {maxContextLines} = context ?? {};

  const textBeforeCursor = pos
    ? maxContextLines
      ? keepNLines(getTextBeforeCursor(pos, mdl), maxContextLines, {
          from: 'end',
        })
      : getTextBeforeCursor(pos, mdl)
    : null;

  const textAfterCursor = pos
    ? maxContextLines
      ? keepNLines(getTextAfterCursor(pos, mdl), maxContextLines)
      : getTextAfterCursor(pos, mdl)
    : null;

  return {
    textBeforeCursor,
    textAfterCursor,
    cursorPosition: pos,
    prompt,
    selectedText: !selection.isEmpty() ? mdl.getValueInRange(selection) : null,
    fullText: mdl.getValue(),
    selection,
    context,
  };
};
