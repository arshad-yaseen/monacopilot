import {
  CursorPosition,
  EditorModel,
  EditorRange,
  EditorSelection,
  StandaloneCodeEditor,
} from '../types';

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
 * Gets the number of columns in the last line of the text.
 * @param {string} text - The text content.
 * @returns {number} The number of columns in the last line.
 */
export const getLastLineColumnCount = (text: string): number => {
  const lines = text.split('\n');
  return lines[lines.length - 1].length + 1;
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
 * Checks if the current line is empty.
 * @param {number} lineNumber - The line number to check.
 * @param {EditorModel} mdl - The editor model.
 * @returns {boolean} True if the line is empty, false otherwise.
 */
export const isLineEmpty = (lineNumber: number, mdl: EditorModel): boolean => {
  const lineContent = mdl.getLineContent(lineNumber);
  return lineContent.trim() === '';
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

/**
 * Creates an EditorRange object with the given start and end positions.
 *
 * @param {number} startLineNumber - The line number where the range starts.
 * @param {number} startColumn - The column number where the range starts.
 * @param {number} endLineNumber - The line number where the range ends.
 * @param {number} endColumn - The column number where the range ends.
 * @returns {EditorRange} An object representing the range in the editor.
 */
export const createRange = (
  startLineNumber: number,
  startColumn: number,
  endLineNumber: number,
  endColumn: number,
): EditorRange => {
  return {
    startLineNumber,
    startColumn,
    endLineNumber,
    endColumn,
  };
};

/**
 * Calculates the range where the text should be inserted in the editor.
 *
 * @param position - The current cursor position in the editor.
 * @param model - The Monaco editor text model.
 * @param completion - The text of the completion to be inserted.
 * @returns The range where the text should be inserted.
 */
export const computeInsertionRange = (
  pos: CursorPosition,
  mdl: EditorModel,
  completion: string,
): EditorRange => {
  // Handle empty completion
  if (!completion) {
    return createRange(pos.lineNumber, pos.column, pos.lineNumber, pos.column);
  }

  // Get the offset in the model where the cursor is currently located.
  const startOffset = mdl.getOffsetAt(pos);

  // Get the text from the cursor position to the end of the document.
  const remainingText = mdl.getValue().substring(startOffset);

  // Initialize overlap lengths
  let prefixOverlapLength = 0;
  let suffixOverlapLength = 0;
  let maxOverlapLength = 0;

  const completionLength = completion.length;
  const remainingLength = remainingText.length;

  // If Cursor at the end of the document
  if (startOffset >= mdl.getValue().length) {
    return createRange(pos.lineNumber, pos.column, pos.lineNumber, pos.column);
  }

  // If Remaining text is empty
  if (remainingLength === 0) {
    return createRange(pos.lineNumber, pos.column, pos.lineNumber, pos.column);
  }

  const maxPossibleOverlap = Math.min(completionLength, remainingLength);

  // Find the longest prefix overlap
  for (let i = 0; i < maxPossibleOverlap; i++) {
    if (completion[i] !== remainingText[i]) {
      break;
    }
    prefixOverlapLength++;
  }

  // Find the longest suffix overlap
  for (let i = 1; i <= maxPossibleOverlap; i++) {
    const completionSuffix = completion.slice(-i);
    const textPrefix = remainingText.slice(0, i);
    if (completionSuffix === textPrefix) {
      suffixOverlapLength = i;
    }
  }

  // Determine the maximum overlap
  maxOverlapLength = Math.max(prefixOverlapLength, suffixOverlapLength);

  // If both overlaps are zero, check for internal overlaps
  if (maxOverlapLength === 0) {
    for (let i = 1; i < completionLength; i++) {
      const completionSub = completion.substring(i);
      if (remainingText.startsWith(completionSub)) {
        maxOverlapLength = completionLength - i;
        break;
      }
    }
  }

  // Calculate the end offset where the overlapping text ends.
  const endOffset = startOffset + maxOverlapLength;

  // Get the end position in the model corresponding to the end offset.
  const endPosition = mdl.getPositionAt(endOffset);

  return createRange(
    pos.lineNumber,
    pos.column,
    endPosition.lineNumber,
    endPosition.column,
  );
};

export const removeSelection = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
) => {
  editor.setSelection({
    startLineNumber: selection.startLineNumber,
    startColumn: selection.startColumn,
    endLineNumber: selection.startLineNumber,
    endColumn: selection.startColumn,
  });
};
