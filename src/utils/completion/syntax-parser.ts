import {EditorModelType, EditorPositionType} from '../../types/common';
import {CompletionMode} from '../../types/completion';
import {getCharAtPosition} from './common';

export const isAfterCursorWhitespace = (
  position: EditorPositionType,
  model: EditorModelType,
) => {
  const line = model.getLineContent(position.lineNumber);
  const index = position.column - 1;
  const textAfterCursor = line.substring(index);
  return /\s/.test(textAfterCursor);
};

/** Check if there is code after the cursor */
export const isCharAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
): boolean => {
  const acceptableCharsAfterCursor = new Set([
    '"',
    "'",
    '}',
    ']',
    ')',
    ',',
    ' ',
    ':',
    '.',
  ]);
  const line = model.getLineContent(position.lineNumber);
  const charAfterCursor = getCharAtPosition(line, position.column - 1);

  return !acceptableCharsAfterCursor.has(charAfterCursor) && !!charAfterCursor;
};

/** Get the before and after code of the cursor position */
export const getCodeBeforeAndAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
): {codeBeforeCursor: string; codeAfterCursor: string} => {
  const codeBeforeCursor = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

  const codeAfterCursor = model.getValueInRange({
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: model.getLineCount(),
    endColumn: model.getLineMaxColumn(model.getLineCount()),
  });

  return {codeBeforeCursor, codeAfterCursor};
};

/** Check if the cursor is at the start of the line with code around */
export const isCursorAtStartWithCodeAround = (
  position: EditorPositionType,
  model: EditorModelType,
) => {
  const currentLine = model.getLineContent(position.lineNumber);
  const codeAfterCursorInCurrentLine = currentLine
    .slice(position.column - 1)
    .trim();
  const codeBeforeCursorInCurrentLine = currentLine
    .slice(0, position.column - 1)
    .trim();

  return (
    position.column <= 3 &&
    (codeAfterCursorInCurrentLine !== '' ||
      codeBeforeCursorInCurrentLine !== '')
  );
};

/**
 * Determines the most suitable completion mode based on the cursor position and surrounding code context.
 *
 * @returns The completion mode ('fill-in-the-middle' | 'completion').
 */
export const determineCompletionMode = (
  position: EditorPositionType,
  model: EditorModelType,
): CompletionMode => {
  const {lineNumber, column} = position;

  const currentLine = model.getLineContent(lineNumber);

  const codeBeforeCursorInLine = currentLine.slice(0, column - 1).trim();
  const codeAfterCursorInLine = currentLine.slice(column - 1).trim();

  // Determine if there is content before or after the cursor in the current line
  const hasCodeBeforeCursor = codeBeforeCursorInLine.length > 0;
  const hasCodeAfterCursor = codeAfterCursorInLine.length > 0;

  // Determine fill-in-the-middle based on code presence
  if (hasCodeBeforeCursor && hasCodeAfterCursor) {
    return 'fill-in-the-middle';
  }

  return 'completion';
};
