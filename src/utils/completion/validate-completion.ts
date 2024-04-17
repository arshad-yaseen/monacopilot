import {Position} from 'monaco-editor';

import {
  isCodeAfterCursor,
  isLetterBeforeCursor,
  isLineEnd,
} from './syntax-parser';

/** Determines if the auto-completion should be triggered based on the editor state, cursor position, and user behavior. */
export const isValidCompletion = (
  code: string,
  cursorPosition: Position,
): boolean => {
  // If the cursor is at the end of a line, do not trigger completion
  if (isLineEnd(code, cursorPosition)) {
    return false;
  }

  // If the code after the cursor is not valid, do not trigger completion
  // Such as letters, numbers, or special characters that are not part of a valid identifier
  if (isCodeAfterCursor(code, cursorPosition)) {
    return false;
  }

  // If the cursor is after a letter(a-z, A-Z), do not trigger completion
  if (isLetterBeforeCursor(code, cursorPosition)) {
    return false;
  }

  return true;
};
