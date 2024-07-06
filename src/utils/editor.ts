import {EditorModel, EditorPosition} from '../types';

export const getWordBeforeCursor = (
  position: EditorPosition,
  model: EditorModel,
): string => {
  const textBeforeCursor = getTextBeforeCursor(position, model).trim();
  const words = textBeforeCursor.split(' ');
  return words[words.length - 1];
};

export const getCharAtPosition = (line: string, column: number): string =>
  line[column - 1];

export const getCharBeforeCursor = (
  position: EditorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line[position.column - 2];
};

export const getCharAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line[position.column - 1];
};

export const getTextAfterCursorInLine = (
  position: EditorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line.slice(position.column - 1);
};

export const getTextBeforeCursorInLine = (
  position: EditorPosition,
  model: EditorModel,
): string => {
  const line = model.getLineContent(position.lineNumber);
  return line.slice(0, position.column - 1);
};

export const getLastLineColumnCount = (text: string): number => {
  const lines = text.split('\n');
  return lines[lines.length - 1].length;
};

export const getCursorPositionLabel = ({
  lineNumber,
  column,
}: EditorPosition): string => `Line ${lineNumber}, Column ${column}`;

export const getTextBeforeCursor = (
  position: EditorPosition,
  model: EditorModel,
): string =>
  model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

export const getTextAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): string =>
  model.getValueInRange({
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: model.getLineCount(),
    endColumn: model.getLineMaxColumn(model.getLineCount()),
  });
