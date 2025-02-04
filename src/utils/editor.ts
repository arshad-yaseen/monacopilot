import {CursorPosition, EditorModel} from 'types/monaco';

/**
 * Gets the character before the cursor.
 * @returns {string} The character before the cursor.
 */
export const getCharBeforeCursor = (
  pos: CursorPosition,
  mdl: EditorModel,
): string => {
  const line = mdl.getLineContent(pos.lineNumber);
  return line[pos.column - 2];
};

/**
 * Gets the character after the cursor.
 * @returns {string} The character after the cursor.
 */
export const getCharAfterCursor = (
  pos: CursorPosition,
  mdl: EditorModel,
): string | undefined => {
  const line = mdl.getLineContent(pos.lineNumber);
  return line[pos.column - 1];
};

/**
 * Gets the text after the cursor in the current line.
 * @returns {string} The text after the cursor in the current line.
 */
export const getTextAfterCursorInLine = (
  pos: CursorPosition,
  mdl: EditorModel,
): string => {
  const line = mdl.getLineContent(pos.lineNumber);
  return line.slice(pos.column - 1);
};

/**
 * Gets the text before the cursor in the current line.
 * @returns {string} The text before the cursor in the current line.
 */
export const getTextBeforeCursorInLine = (
  pos: CursorPosition,
  mdl: EditorModel,
): string => {
  const line = mdl.getLineContent(pos.lineNumber);
  return line.slice(0, pos.column - 1);
};

/**
 * Gets the text before the cursor.
 * @returns {string} The text before the cursor.
 */
export const getTextBeforeCursor = (
  pos: CursorPosition,
  mdl: EditorModel,
): string =>
  mdl.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: pos.lineNumber,
    endColumn: pos.column,
  });

/**
 * Gets the text after the cursor.
 * @returns {string} The text after the cursor.
 */
export const getTextAfterCursor = (
  pos: CursorPosition,
  mdl: EditorModel,
): string =>
  mdl.getValueInRange({
    startLineNumber: pos.lineNumber,
    startColumn: pos.column,
    endLineNumber: mdl.getLineCount(),
    endColumn: mdl.getLineMaxColumn(mdl.getLineCount()),
  });
