import {CONTEXTUAL_FILTER_ACCEPT_THRESHOLD} from '../../constants/contextual-filter';
import {
  CodeContextualFilterManager,
  codeContextualFilterScore,
} from '../../helpers/contextual-filter';
import {EditorModelType, EditorPositionType} from '../../types/common';
import {
  getCodeBeforeAndAfterCursor,
  isCodeAfterCursor,
  isCursorAtStartWithCodeAhead,
  isEmptyAfterCursor,
} from './syntax-parser';

/**
 * Determines if the auto-completion should be triggered based on the editor state,
 * cursor position, and user behavior.
 */
export const isValidCompletion = (
  cursorPosition: EditorPositionType,
  model: EditorModelType,
  language: string | undefined,
): boolean => {
  return (
    codeContextualScore(cursorPosition, model, language) >
      CONTEXTUAL_FILTER_ACCEPT_THRESHOLD &&
    !isCodeAfterCursor(cursorPosition, model) &&
    !isCursorAtStartWithCodeAhead(cursorPosition, model)
  );
};

// Compute the contextual score for the current editor state
const codeContextualScore = (
  cursorPosition: EditorPositionType,
  model: EditorModelType,
  language: string | undefined,
) => {
  const code = model.getValue();
  const {codeBeforeCursor} = getCodeBeforeAndAfterCursor(cursorPosition, model);
  const afterCursorWhitespace = isEmptyAfterCursor(cursorPosition, model);
  const documentLength = code.length;
  const promptEndPos = model.getOffsetAt(cursorPosition);

  return codeContextualFilterScore({
    properties: {
      afterCursorWhitespace: afterCursorWhitespace.toString(),
      languageId: language,
    },
    measurements: {
      documentLength,
      promptEndPos,
    },
    get: (manager: typeof CodeContextualFilterManager) => new manager(),
    prefix: codeBeforeCursor,
  });
};
