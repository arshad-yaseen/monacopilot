import {CursorPosition, EditorModel} from '../types';

/**
 * Gets the character before the cursor.
 * @returns {string} The character before the cursor.
 */
export const getCharBeforeCursor = (
  position: CursorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line[position.column - 2];
};

/**
 * Gets the character after the cursor.
 * @returns {string} The character after the cursor.
 */
export const getCharAfterCursor = (
  position: CursorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line[position.column - 1];
};

/**
 * Gets the text after the cursor in the current line.
 * @returns {string} The text after the cursor in the current line.
 */
export const getTextAfterCursorInLine = (
  position: CursorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line.slice(position.column - 1);
};

/**
 * Gets the text before the cursor in the current line.
 * @returns {string} The text before the cursor in the current line.
 */
export const getTextBeforeCursorInLine = (
  position: CursorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line.slice(0, position.column - 1);
};

/**
 * Gets the number of columns in the last line of the text.
 * @param {string} text - The text content.
 * @returns {number} The number of columns in the last line.
 */
export const getLastLineColumnCount = (text: string): number => {
  const lines = text.split('\n');
  return lines[lines.length - 1].length + 1;
};

/**
 * Gets a label for the cursor position.
 * @returns {string} The label for the cursor position.
 */
export const getCursorPositionLabel = ({
  lineNumber,
  column,
}: CursorPosition): string => `Line ${lineNumber}, Column ${column}`;

/**
 * Gets the text before the cursor.
 * @returns {string} The text before the cursor.
 */
export const getTextBeforeCursor = (
  position: CursorPosition,
  model: EditorModel,
): string =>
  model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

/**
 * Gets the text after the cursor.
 * @returns {string} The text after the cursor.
 */
export const getTextAfterCursor = (
  position: CursorPosition,
  model: EditorModel,
): string =>
  model.getValueInRange({
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: model.getLineCount(),
    endColumn: model.getLineMaxColumn(model.getLineCount()),
  });
