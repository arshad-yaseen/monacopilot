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
  pos: CursorPosition,
  mdl: EditorModel,
): boolean => getCharAfterCursor(pos, mdl) === ' ';

/**
 * Checks if the character after the cursor is not a punctuation and is not empty.
 * @returns {boolean} True if the character after the cursor is not a punctuation and is not empty, false otherwise.
 */
export const isNonPunctuationCharAfterCursor = (
  pos: CursorPosition,
  mdl: EditorModel,
): boolean => {
  const charAfterCursor = getCharAfterCursor(pos, mdl);
  return !!charAfterCursor && !PUNCTUATIONS.has(charAfterCursor);
};

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
