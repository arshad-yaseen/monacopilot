import {EditorModel, EditorPosition} from '../../types';
import {
  getCharAfterCursor,
  getTextAfterCursorInLine,
  getTextBeforeCursorInLine,
} from '../editor';

const DEFAULT_RECENT_COMPLETION_THRESHOLD = 500; // ms

const ACCEPTABLE_CHARS_AFTER_CURSOR = new Set([
  '"',
  "'",
  '`',
  '{',
  '}',
  '[',
  ']',
  '(',
  ')',
  ',',
  ' ',
  ':',
  '.',
]);

export const hasWhitespaceAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const charAfterCursor = getCharAfterCursor(position, model);
  return charAfterCursor === ' ';
};

export const isCharAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const charAfterCursor = getCharAfterCursor(position, model);

  return (
    !ACCEPTABLE_CHARS_AFTER_CURSOR.has(charAfterCursor) && !!charAfterCursor
  );
};

export const isCursorAtStartWithTextAround = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const codeAfterCursorInCurrentLine = getTextAfterCursorInLine(
    position,
    model,
  ).trim();
  const codeBeforeCursorInCurrentLine = getTextBeforeCursorInLine(
    position,
    model,
  ).trim();

  return (
    position.column <= 3 &&
    (codeAfterCursorInCurrentLine !== '' ||
      codeBeforeCursorInCurrentLine !== '')
  );
};

export const isLastCompletionTooRecent = (
  lastCompletionTime: number,
  currentTime: number,
  threshold: number = DEFAULT_RECENT_COMPLETION_THRESHOLD,
): boolean => {
  return currentTime - lastCompletionTime < threshold;
};
