import {EditorModelType, EditorPositionType} from '../../types/common';
import {getCharAtPosition} from './common';

/** Check if there is anything after the cursor
 * That is, if there is any character after the cursor position
 */
export const isAnythingAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
): boolean => {
  const line = model.getLineContent(position.lineNumber);
  const charAfterCursor = getCharAtPosition(line, position.column - 1);

  return charAfterCursor !== '';
};

/** Check if there is code after the cursor */
export const isCodeAfterCursor = (
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
  ]);
  const line = model.getLineContent(position.lineNumber);
  const charAfterCursor = getCharAtPosition(line, position.column - 1);

  return !acceptableCharsAfterCursor.has(charAfterCursor) && !!charAfterCursor;
};

/** Check if the cursor is in a position where the code needs to be filled in*/
export const isFillInMode = (
  position: EditorPositionType,
  model: EditorModelType,
) => {
  const currentLine = model.getLineContent(position.lineNumber);
  const index = position.column - 1; // Convert to 0-based index

  const textBeforeCursor = currentLine.substring(0, index).trim();
  const textAfterCursor = currentLine.substring(index).trim();

  // Conditions that likely indicate "fill-in" mode.
  const openSymbols = '({[=,<>&|!'; // Open symbols that might need completion
  const closeSymbols = ')}];'; // Closing symbols that might indicate the need for completion before them

  return (
    openSymbols.includes(textBeforeCursor.slice(-1)) ||
    closeSymbols.includes(textAfterCursor.charAt(0))
  );
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
    endColumn: model.getLineMaxColumn(position.lineNumber),
  });

  return {codeBeforeCursor, codeAfterCursor};
};
