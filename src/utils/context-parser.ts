import {CursorPosition, EditorModel} from '../types';
import {getTextAfterCursorInLine, getTextBeforeCursorInLine} from './editor';

/**
 * Checks if the cursor is at the start of the line with text around it.
 * @returns {boolean} True if the cursor is at the start of the line with text around it, false otherwise.
 */
export const isCursorAtStartWithTextAround = (
  pos: CursorPosition,
  mdl: EditorModel,
): boolean => {
  const textAfterCursorInCurrentLine = getTextAfterCursorInLine(
    pos,
    mdl,
  ).trim();
  const textBeforeCursorInCurrentLine = getTextBeforeCursorInLine(
    pos,
    mdl,
  ).trim();
  return (
    pos.column <= 3 &&
    (textAfterCursorInCurrentLine !== '' ||
      textBeforeCursorInCurrentLine !== '')
  );
};
