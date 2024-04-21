import {EditorModelType, EditorPositionType} from '../../types/common';
import {getCharAtPosition} from './common';

export const isAnythingAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
): boolean => {
  const line = model.getLineContent(position.lineNumber);
  const charAfterCursor = getCharAtPosition(line, position.column - 1);

  return charAfterCursor !== '';
};

export const isCodeAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
): boolean => {
  const acceptableAfterCursor = new Set(['"', "'", '}', ']', ')', ',', ' ']);
  const line = model.getLineContent(position.lineNumber);
  const charAfterCursor = getCharAtPosition(line, position.column - 1);

  return !acceptableAfterCursor.has(charAfterCursor) && !!charAfterCursor;
};

export const isLineEnd = (
  position: EditorPositionType,
  model: EditorModelType,
): boolean => {
  const lineEndRegex = /^[a-zA-Z]+$/;
  const lineEndCharacters = new Set([';', '{', '}', ']', ')']);
  const line = model.getLineContent(position.lineNumber);
  const charBeforeCursor = getCharAtPosition(line, position.column - 2);

  return (
    lineEndRegex.test(charBeforeCursor) ||
    lineEndCharacters.has(charBeforeCursor)
  );
};
