import {EditorModel, EditorPosition} from '../types';

export const getCharAtPosition = (line: string, column: number) => {
  return line[column - 1];
};

export const getLineCount = (model: EditorModel) => model.getLineCount();

export const getCharBeforeCursor = (
  position: EditorPosition,
  model: EditorModel,
) => {
  const line = model.getLineContent(position.lineNumber);
  return line[position.column - 2];
};

export const getCharAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
) => {
  const line = model.getLineContent(position.lineNumber);
  return line[position.column - 1];
};

export const getTextAfterCursorInLine = (
  position: EditorPosition,
  model: EditorModel,
) => {
  const line = model.getLineContent(position.lineNumber);
  return line.slice(position.column - 1);
};

export const getTextBeforeCursorInLine = (
  position: EditorPosition,
  model: EditorModel,
) => {
  const line = model.getLineContent(position.lineNumber);
  return line.slice(0, position.column - 1);
};

export const getLastLineColumnCount = (text: string): number => {
  const lastLine = text.split('\n')[text.split('\n').length - 1];
  return lastLine.length;
};

export const getCursorPostionLabel = ({lineNumber, column}: EditorPosition) => {
  return `Line ${lineNumber}, Column ${column}`;
};

export const getTextBeforeCursor = (
  position: EditorPosition,
  model: EditorModel,
): string => {
  return model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });
};

export const getTextAfterCursor = (
  position: EditorPosition,
  model: EditorModel,
): string => {
  return model.getValueInRange({
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: model.getLineCount(),
    endColumn: model.getLineMaxColumn(model.getLineCount()),
  });
};
