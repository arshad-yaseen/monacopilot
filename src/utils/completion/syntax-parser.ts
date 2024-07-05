import {CompletionMode, EditorModel, EditorPosition} from '../../types';
import {getCharAtPosition} from '../editor';

const DEFAULT_RECENT_COMPLETION_THRESHOLD = 500; // ms

const ACCEPTABLE_CHARS_AFTER_CURSOR = new Set([
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

export const isAfterCursorWhitespace = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const line = model.getLineContent(position.lineNumber);
  const textAfterCursor = line.substring(position.column - 1);
  return /^\s*$/.test(textAfterCursor);
};

export const isCharAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
  const line = model.getLineContent(position.lineNumber);
  const charAfterCursor = getCharAtPosition(line, position.column - 1);
  return (
    !ACCEPTABLE_CHARS_AFTER_CURSOR.has(charAfterCursor) && !!charAfterCursor
  );
};

export const getCodeBeforeAndAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
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

export const isCursorAtStartWithCodeAround = (
  position: EditorPosition,
  model: EditorModel,
): boolean => {
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

export const determineCompletionMode = (
  position: EditorPosition,
  model: EditorModel,
): CompletionMode => {
  const currentLine = model.getLineContent(position.lineNumber);
  const [codeBeforeCursor, codeAfterCursor] = [
    currentLine.slice(0, position.column - 1).trim(),
    currentLine.slice(position.column - 1).trim(),
  ];

  return codeBeforeCursor && codeAfterCursor
    ? 'fill-in-the-middle'
    : 'completion';
};

export const isLastCompletionTooRecent = (
  lastCompletionTime: number,
  currentTime: number,
  threshold: number = DEFAULT_RECENT_COMPLETION_THRESHOLD,
): boolean => {
  return currentTime - lastCompletionTime < threshold;
};
