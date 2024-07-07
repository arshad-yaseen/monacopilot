// Import constants and types
import {PUNCTUATIONS} from '../../constants';
import {EditorModel, EditorPosition} from '../../types';
import {
  getCharAfterCursor,
  getTextAfterCursorInLine,
  getTextBeforeCursorInLine,
} from '../editor';

/**
 * Checks if there is whitespace after the cursor.
 * @returns {boolean} True if there is whitespace after the cursor, false otherwise.
 */
export const hasWhitespaceAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): boolean => getCharAfterCursor(position, model) === ' ';

/**
 * Checks if the character after the cursor is not a punctuation and is not empty.
 * @returns {boolean} True if the character after the cursor is not a punctuation and is not empty, false otherwise.
 */
export const isCharAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const charAfterCursor = getCharAfterCursor(position, model);
  return !!charAfterCursor && !PUNCTUATIONS.has(charAfterCursor);
};

/**
 * Checks if the cursor is at the start of the line with text around it.
 * @returns {boolean} True if the cursor is at the start of the line with text around it, false otherwise.
 */
export const isCursorAtStartWithTextAround = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const textAfterCursorInCurrentLine = getTextAfterCursorInLine(
    position,
    model,
  ).trim();
  const textBeforeCursorInCurrentLine = getTextBeforeCursorInLine(
    position,
    model,
  ).trim();
  return (
    position.column <= 3 &&
    (textAfterCursorInCurrentLine !== '' ||
      textBeforeCursorInCurrentLine !== '')
  );
};
