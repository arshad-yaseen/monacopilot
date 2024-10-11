import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {CursorPosition, EditorModel} from '../src/types';
import {
  computeInsertionRange,
  createRange,
  getCharAfterCursor,
  getCharBeforeCursor,
  getLastLineColumnCount,
  getTextAfterCursorInLine,
  getTextBeforeCursorInLine,
  keepNLines,
} from '../src/utils/editor';
import {mockModel, mockPosition} from './mock';

describe('Editor Utilities', () => {
  let mdl: EditorModel;
  let pos: CursorPosition;

  beforeEach(() => {
    mdl = mockModel;
    pos = mockPosition;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getCharBeforeCursor', () => {
    it('should return the character before the cursor', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 10};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('let x = 5; let y = 10;');

      const result = getCharBeforeCursor(pos, mdl);
      expect(result).toBe('5');
    });

    it('should return undefined if cursor is at the start of the line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('const PI = 3.14159;');

      const result = getCharBeforeCursor(pos, mdl);
      expect(result).toBeUndefined();
    });
  });

  describe('getCharAfterCursor', () => {
    it('should return the character after the cursor', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 11};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'console.log("Hello, World!");',
      );

      const result = getCharAfterCursor(pos, mdl);
      expect(result).toBe('g');
    });

    it('should return undefined if cursor is at the end of the line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 30};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'console.log("Hello, World!");',
      );

      const result = getCharAfterCursor(pos, mdl);
      expect(result).toBeUndefined();
    });
  });

  describe('getTextAfterCursorInLine', () => {
    it('should return the text after the cursor in the current line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 17};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'function multiply(a, b) { return a * b; }',
      );

      const result = getTextAfterCursorInLine(pos, mdl);
      expect(result).toBe('y(a, b) { return a * b; }');
    });

    it('should return an empty string if cursor is at the end of the line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 42};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'function multiply(a, b) { return a * b; }',
      );

      const result = getTextAfterCursorInLine(pos, mdl);
      expect(result).toBe('');
    });
  });

  describe('getTextBeforeCursorInLine', () => {
    it('should return the text before the cursor in the current line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 20};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'const array = [1, 2, 3, 4, 5];',
      );

      const result = getTextBeforeCursorInLine(pos, mdl);
      expect(result).toBe('const array = [1, 2');
    });

    it('should return an empty string if cursor is at the start of the line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'const array = [1, 2, 3, 4, 5];',
      );

      const result = getTextBeforeCursorInLine(pos, mdl);
      expect(result).toBe('');
    });
  });

  describe('getLastLineColumnCount', () => {
    it('should return the number of columns in the last line', () => {
      const result = getLastLineColumnCount(
        'function greet(name) {\n  console.log(`Hello, ${name}!`);\n}',
      );
      expect(result).toBe(2);
    });

    it('should handle single-line text correctly', () => {
      const result = getLastLineColumnCount('const PI = 3.14159;');
      expect(result).toBe(20);
    });

    it('should handle empty string', () => {
      const result = getLastLineColumnCount('');
      expect(result).toBe(1);
    });

    it('should handle text ending with newline', () => {
      const result = getLastLineColumnCount('let x = 10;\nlet y = 20;\n');
      expect(result).toBe(1);
    });
  });

  describe('keepNLines', () => {
    it('should keep the specified number of lines from the start', () => {
      const text = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
      const result = keepNLines(text, 3);
      expect(result).toBe('Line 1\nLine 2\nLine 3');
    });

    it('should keep the specified number of lines from the end', () => {
      const text = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
      const result = keepNLines(text, 3, {from: 'end'});
      expect(result).toBe('Line 3\nLine 4\nLine 5');
    });

    it('should return the entire text if maxLinesCount is greater than the number of lines', () => {
      const text = 'Line 1\nLine 2\nLine 3';
      const result = keepNLines(text, 5);
      expect(result).toBe(text);
    });

    it('should handle empty string input', () => {
      const result = keepNLines('', 3);
      expect(result).toBe('');
    });

    it('should handle single-line input', () => {
      const text = 'Single line';
      const result = keepNLines(text, 3);
      expect(result).toBe(text);
    });

    it('should handle input with trailing newline', () => {
      const text = 'Line 1\nLine 2\nLine 3\n';
      const result = keepNLines(text, 2);
      expect(result).toBe('Line 1\nLine 2');
    });

    it('should handle maxLinesCount of 0', () => {
      const text = 'Line 1\nLine 2\nLine 3';
      const result = keepNLines(text, 0);
      expect(result).toBe('');
    });

    it('should handle negative maxLinesCount', () => {
      const text = 'Line 1\nLine 2\nLine 3';
      const result = keepNLines(text, -2);
      expect(result).toBe('');
    });

    it('should handle text with empty lines', () => {
      const text = 'Line 1\n\nLine 3\n\nLine 5';
      const result = keepNLines(text, 3);
      expect(result).toBe('Line 1\n\nLine 3');
    });

    it('should handle text with only newlines', () => {
      const text = '\n\n\n\n';
      const result = keepNLines(text, 2);
      expect(result).toBe('\n\n');
    });
  });

  describe('createRange', () => {
    it('creates a range with the same start and end positions', () => {
      const range = createRange(1, 1, 1, 1);
      expect(range).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      });
    });

    it('creates a range spanning multiple lines', () => {
      const range = createRange(1, 5, 3, 10);
      expect(range).toEqual({
        startLineNumber: 1,
        startColumn: 5,
        endLineNumber: 3,
        endColumn: 10,
      });
    });

    it('creates a range within a single line', () => {
      const range = createRange(5, 10, 5, 20);
      expect(range).toEqual({
        startLineNumber: 5,
        startColumn: 10,
        endLineNumber: 5,
        endColumn: 20,
      });
    });

    it('handles zero values correctly', () => {
      const range = createRange(0, 0, 0, 0);
      expect(range).toEqual({
        startLineNumber: 0,
        startColumn: 0,
        endLineNumber: 0,
        endColumn: 0,
      });
    });

    it('handles large numbers correctly', () => {
      const range = createRange(1000000, 5000000, 9999999, 9999999);
      expect(range).toEqual({
        startLineNumber: 1000000,
        startColumn: 5000000,
        endLineNumber: 9999999,
        endColumn: 9999999,
      });
    });
  });

  describe('computeInsertionRange', () => {
    it('should handle empty completion', () => {
      const result = computeInsertionRange(pos, mdl, '');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      });
    });

    it('should handle cursor at the end of the document', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(10);
      vi.spyOn(mdl, 'getValue').mockReturnValue('1234567890');

      const result = computeInsertionRange(pos, mdl, 'completion');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      });
    });

    it('should handle empty remaining text', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(10);
      vi.spyOn(mdl, 'getValue').mockReturnValue('1234567890');

      const result = computeInsertionRange(pos, mdl, 'completion');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      });
    });

    it('should find prefix overlap', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(5);
      vi.spyOn(mdl, 'getValue').mockReturnValue('abcdefghij');
      vi.spyOn(mdl, 'getPositionAt').mockReturnValue({
        lineNumber: 1,
        column: 8,
      } as any);

      const result = computeInsertionRange(pos, mdl, 'fghklm');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 8,
      });
    });

    it('should find suffix overlap', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(5);
      vi.spyOn(mdl, 'getValue').mockReturnValue('abcdefghij');
      vi.spyOn(mdl, 'getPositionAt').mockReturnValue({
        lineNumber: 1,
        column: 8,
      } as any);

      const result = computeInsertionRange(pos, mdl, 'xyzfgh');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 8,
      });
    });

    it('should find internal overlap', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(5);
      vi.spyOn(mdl, 'getValue').mockReturnValue('abcdefghij');
      vi.spyOn(mdl, 'getPositionAt').mockReturnValue({
        lineNumber: 1,
        column: 8,
      } as any);

      const result = computeInsertionRange(pos, mdl, 'xyzfghklm');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 8,
      });
    });

    it('should handle no overlap', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(5);
      vi.spyOn(mdl, 'getValue').mockReturnValue('abcdefghij');
      vi.spyOn(mdl, 'getPositionAt').mockReturnValue({
        lineNumber: 1,
        column: 5,
      } as any);

      const result = computeInsertionRange(pos, mdl, 'xyz');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 5,
      });
    });

    it('should handle multi-line text', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(10);
      vi.spyOn(mdl, 'getValue').mockReturnValue('line1\nline2\nline3');
      vi.spyOn(mdl, 'getPositionAt').mockReturnValue({
        lineNumber: 2,
        column: 3,
      } as any);

      const result = computeInsertionRange(pos, mdl, 'ne2\nlin');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 2,
        endColumn: 3,
      });
    });

    it('should handle completion longer than remaining text', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(5);
      vi.spyOn(mdl, 'getValue').mockReturnValue('abcdefghij');
      vi.spyOn(mdl, 'getPositionAt').mockReturnValue({
        lineNumber: 1,
        column: 10,
      } as any);

      const result = computeInsertionRange(pos, mdl, 'fghijklmnop');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 10,
      });
    });

    it('should handle completion shorter than remaining text', () => {
      vi.spyOn(mdl, 'getOffsetAt').mockReturnValue(5);
      vi.spyOn(mdl, 'getValue').mockReturnValue('abcdefghijklmnop');
      vi.spyOn(mdl, 'getPositionAt').mockReturnValue({
        lineNumber: 1,
        column: 8,
      } as any);

      const result = computeInsertionRange(pos, mdl, 'fgh');
      expect(result).toEqual({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 8,
      });
    });
  });
});
