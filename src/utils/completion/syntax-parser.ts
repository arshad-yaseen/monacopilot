import {EditorModel, EditorPosition} from '../../types/common';

export const isCodeAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  // Characters that are acceptable to be after the cursor
  const acceptableCharacters = ['"', "'", '}', ']', ')', ',', ' '];

  const line = model.getLineContent(position.lineNumber);

  const charAfterCursor = line.slice(position.column - 1)[0];

  if (!charAfterCursor || acceptableCharacters.includes(charAfterCursor)) {
    return false;
  }

  return true;
};

export const isLineEnd = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const lineEndCharacters = [';', '{', '}', ']', ')'];

  const line = model.getLineContent(position.lineNumber);

  const charBeforeCursor = line
    .slice(0, position.column - 1)
    .trim()
    .slice(-1);

  if (lineEndCharacters.includes(charBeforeCursor)) {
    return true;
  }

  return false;
};
