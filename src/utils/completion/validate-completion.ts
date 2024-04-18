import {Position} from 'monaco-editor';

import {EditorModel} from '../../types/common';
import {isCodeAfterCursor, isLineEnd} from './syntax-parser';

/** Determines if the auto-completion should be triggered based on the editor state, cursor position, and user behavior. */
export const isValidCompletion = (
  cursorPosition: Position,
  model: EditorModel,
): boolean => {
  // If the cursor is at the end of a line, do not trigger completion
  if (isLineEnd(cursorPosition, model)) {
    return false;
  }

  // If the code after the cursor is not valid, do not trigger completion
  // Such as letters, numbers, or special characters that are not part of a valid identifier
  if (isCodeAfterCursor(cursorPosition, model)) {
    return false;
  }

  return true;
};
