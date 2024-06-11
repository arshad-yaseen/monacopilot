import type {EditorPosition} from '../types/common';

export const getCharAtPosition = (line: string, position: number) =>
  line[position] || '';

export const getLastLineLength = (text: string): number => {
  return text.split('\n')[text.split('\n').length - 1].length;
};

export const getCursorPostionLabel = ({lineNumber, column}: EditorPosition) => {
  return `Line ${lineNumber}, Column ${column}`;
};

export const getLine = (text: string, lineNumber: number): string => {
  return text.split('\n')[lineNumber - 1];
};
