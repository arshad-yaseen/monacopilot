import {Position} from 'monaco-editor';

import {isCodeAfterCursor, isLineEnd} from './syntax-parser';

/** Determines if the auto-completion should be triggered based on the editor state, cursor position, and user behavior. */
export const isValidCompletion = (
  code: string,
  cursorPosition: Position,
): boolean => {
  if (isLineEnd(code, cursorPosition)) {
    return false;
  }

  if (isCodeAfterCursor(code, cursorPosition)) {
    return false;
  }

  return true;
};
