import {CONTEXTUAL_FILTER_ACCEPT_THRESHOLD} from '../../constants/contextual-filter';
import {EditorModelType, EditorPositionType} from '../../types/common';
import {
  CodeContextualFilterManager,
  codeContextualFilterScore,
} from './contextual-filter';
import {isAnythingAfterCursor, isCodeAfterCursor} from './syntax-parser';

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
    !isCodeAfterCursor(cursorPosition, model)
  );
};

// Compute the contextual score for the current editor state
const codeContextualScore = (
  cursorPosition: EditorPositionType,
  model: EditorModelType,
  language: string | undefined,
) => {
  const code = model.getValue();
  const codeUntilCursor = code.substring(0, model.getOffsetAt(cursorPosition));
  const afterCursorWhitespace = isAnythingAfterCursor(cursorPosition, model);
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
    prefix: codeUntilCursor,
  });
};
