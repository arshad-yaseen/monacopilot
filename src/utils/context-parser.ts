import {PUNCTUATIONS} from '../constants';
import {CursorPosition, EditorModel} from '../types';
import {
  getCharAfterCursor,
  getTextAfterCursorInLine,
  getTextBeforeCursorInLine,
} from './editor';

/**
 * Checks if there is whitespace after the cursor.
 * @returns {boolean} True if there is whitespace after the cursor, false otherwise.
 */
export const hasWhitespaceAfterCursor = (
  position: CursorPosition,
  model: EditorModel,
): boolean => getCharAfterCursor(position, model) === ' ';

/**
 * Checks if the character after the cursor is not a punctuation and is not empty.
 * @returns {boolean} True if the character after the cursor is not a punctuation and is not empty, false otherwise.
 */
export const isNonPunctuationCharAfterCursor = (
  position: CursorPosition,
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
  position: CursorPosition,
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
