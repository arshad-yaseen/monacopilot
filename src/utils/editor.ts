import {CursorPosition, EditorModel} from '../types';

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
): string => {
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

/**
 * Keeps a specified number of lines from the given text.
 *
 * @example
 * keepNLines('Line 1\nLine 2\nLine 3', 2); // 'Line 1\nLine 2'
 * keepNLines('Line 1\nLine 2\nLine 3', 2, { from: 'end' }); // 'Line 2\nLine 3'
 * keepNLines('\n\n\n\n\n\n\n\n', 2); // '\n\n'
 * keepNLines('Line 1\n\nLine 2\n\nLine 3', 2); // 'Line 1\n\nLine 2'
 * keepNLines('Line 1\n\nLine 2\n\nLine 3', 2, { from: 'end' }); // '\n\nLine 2\n\nLine 3'
 * keepNLines('Line 1\nLine 2\nLine 3', -1); // ''
 */
export const keepNLines = (
  text: string,
  maxLinesCount: number,
  options: {
    from?: 'start' | 'end';
  } = {},
): string => {
  if (maxLinesCount <= 0) {
    return '';
  }

  const lines = text.split('\n');
  const totalLines = lines.length;

  if (maxLinesCount >= totalLines) {
    return text;
  }

  if (options.from === 'end') {
    const linesToKeep = lines.slice(-maxLinesCount);
    if (linesToKeep.every(line => line === '')) {
      return '\n'.repeat(maxLinesCount);
    }
    return linesToKeep.join('\n');
  }

  const linesToKeep = lines.slice(0, maxLinesCount);

  if (linesToKeep.every(line => line === '')) {
    return '\n'.repeat(maxLinesCount);
  }
  return linesToKeep.join('\n');
};
