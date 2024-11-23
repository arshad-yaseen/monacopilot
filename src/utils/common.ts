/**
 * Joins an array of strings with commas and 'and' for the last element.
 *
 * @param arr - The array of strings to join
 * @returns The joined string
 */
export const joinWithAnd = (
  arr: string[] | readonly string[] | undefined,
): string => {
  if (!arr || arr.length === 0) {
    return '';
  }

  if (arr.length === 1) {
    return arr[0];
  }

  return `${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}`;
};

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
