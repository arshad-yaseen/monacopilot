import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {CursorPosition, EditorModel} from '../src/types';
import {keepNLines} from '../src/utils';
import {
  getCharAfterCursor,
  getCharBeforeCursor,
  getTextAfterCursorInLine,
  getTextBeforeCursorInLine,
} from '../src/utils/editor';
import {mockModel} from './mock';

describe('Editor Utilities', () => {
  let mdl: EditorModel;

  beforeEach(() => {
    mdl = mockModel;
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
});
