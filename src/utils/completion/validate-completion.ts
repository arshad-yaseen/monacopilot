import {EditorModelType, EditorPositionType} from '../../types/common';
import {isCodeAfterCursor, isLineEnd} from './syntax-parser';

/**
 * Determines if the auto-completion should be triggered based on the editor state,
 * cursor position, and user behavior.
 */
export const isValidCompletion = (
  cursorPosition: EditorPositionType,
  model: EditorModelType,
): boolean => {
  return (
    !isLineEnd(cursorPosition, model) &&
    !isCodeAfterCursor(cursorPosition, model)
  );
};
