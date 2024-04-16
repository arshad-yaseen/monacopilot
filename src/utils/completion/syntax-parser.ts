import {EditorPosition} from '../../types/common';

/** Determines if the code after the cursor is a valid trigger for auto-completion. */
export const isCodeAfterCursor = (
  code: string,
  position: EditorPosition,
): boolean => {
  // Characters that are acceptable to be after the cursor
  const acceptableCharacters = ['"', "'", '}', ']', ')', ',', ' '];

  const line = code.split('\n')[position.lineNumber - 1];

  const charAfterCursor = line.slice(position.column - 1)[0];

  if (!charAfterCursor || acceptableCharacters.includes(charAfterCursor)) {
    return false;
  }

  return true;
};

/** Determines if the cursor is at the end of a line. */
export const isLineEnd = (code: string, position: EditorPosition): boolean => {
  const lineEndCharacters = [';', '{', '}', ']', ')'];

  const line = code.split('\n')[position.lineNumber - 1];

  const charBeforeCursor = line
    .slice(0, position.column - 1)
    .trim()
    .slice(-1);

  if (lineEndCharacters.includes(charBeforeCursor)) {
    return true;
  }

  return false;
};
