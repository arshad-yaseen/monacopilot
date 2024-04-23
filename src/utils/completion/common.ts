import {EditorPositionType} from '../../types/common';

export const getCharAtPosition = (line: string, position: number) =>
  line[position] || '';

export const getLastLineLength = (text: string): number => {
  const lines = text.split('\n');
  return lines[lines.length - 1].length;
};

export const getCursorPostionLabel = ({
  lineNumber,
  column,
}: EditorPositionType) => {
  return `Line ${lineNumber}, Column ${column}`;
};

export const sanitizeCompletionCode = (code: string): string => {
  code = code.replace(/\\n/g, '\n');

  if (code.startsWith('```') && code.endsWith('```')) {
    return code.slice(3, -3);
  }

  return code;
};
