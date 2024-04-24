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
  // Replace all occurrences of literal "\n" with actual newline characters
  code = code.replace(/\\n/g, '\n');

  // Check for common quoting patterns and remove matching quotes from both ends
  const quotePatterns = ['"', "'", '`'];
  for (const quote of quotePatterns) {
    if (code.startsWith(quote.repeat(3))) {
      return code.slice(3, -3);
    } else if (code.startsWith(quote) && code.endsWith(quote)) {
      code = code.slice(1, -1);
    }
  }

  return code;
};
