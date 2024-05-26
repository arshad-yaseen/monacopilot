import {CONTEXTUAL_FILTER_ACCEPT_THRESHOLD} from '../../constants/contextual-filter';
import {getContextualFilterScore} from '../../helpers/contextual-filter';
import {EditorModel, EditorPosition} from '../../types/common';
import {
  getCodeBeforeAndAfterCursor,
  isAfterCursorWhitespace,
  isCharAfterCursor,
  isCursorAtStartWithCodeAround,
} from './syntax-parser';

/**
 * Determines if the auto-completion should be triggered based on the editor state,
 * cursor position, and user behavior.
 */
export const isValidCompletion = (
  cursorPosition: EditorPosition,
  model: EditorModel,
  language: string | undefined,
): boolean => {
  return (
    contextualScore(cursorPosition, model, language) >
      CONTEXTUAL_FILTER_ACCEPT_THRESHOLD &&
    !isCharAfterCursor(cursorPosition, model) &&
    !isCursorAtStartWithCodeAround(cursorPosition, model)
  );
};

// Compute the contextual score for the current editor state
const contextualScore = (
  cursorPosition: EditorPosition,
  model: EditorModel,
  language: string | undefined,
) => {
  const {codeBeforeCursor} = getCodeBeforeAndAfterCursor(cursorPosition, model);
  const afterCursorWhitespace = isAfterCursorWhitespace(cursorPosition, model);
  const documentLength = model.getValueLength();
  const promptEndPos = model.getOffsetAt(cursorPosition);

  return getContextualFilterScore({
    properties: {
      afterCursorWhitespace: afterCursorWhitespace ? 'true' : 'false',
      languageId: language,
    },
    measurements: {
      documentLength,
      promptEndPos,
    },
    prefix: codeBeforeCursor,
  });
};
