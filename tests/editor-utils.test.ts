import {describe, expect, it, vi} from 'vitest';

import {CursorPosition} from '../src/types';
import {
  getCharAfterCursor,
  getCharBeforeCursor,
  getCursorPositionLabel,
  getLastLineColumnCount,
  getTextAfterCursorInLine,
  getTextBeforeCursorInLine,
} from '../src/utils/editor';
import {model} from './mock';

describe('Editor Utilities', () => {
  describe('getCharBeforeCursor', () => {
    it('should return the character before the cursor', () => {
      const position: CursorPosition = {lineNumber: 1, column: 10};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'let x = 5; let y = 10;',
      );

      const result = getCharBeforeCursor(position, model);
      expect(result).toBe('5');
    });

    it('should return undefined if cursor is at the start of the line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue('const PI = 3.14159;');

      const result = getCharBeforeCursor(position, model);
      expect(result).toBeUndefined();
    });
  });

  describe('getCharAfterCursor', () => {
    it('should return the character after the cursor', () => {
      const position: CursorPosition = {lineNumber: 1, column: 11};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'console.log("Hello, World!");',
      );

      const result = getCharAfterCursor(position, model);
      expect(result).toBe('g');
    });

    it('should return undefined if cursor is at the end of the line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 30};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'console.log("Hello, World!");',
      );

      const result = getCharAfterCursor(position, model);
      expect(result).toBeUndefined();
    });
  });

  describe('getTextAfterCursorInLine', () => {
    it('should return the text after the cursor in the current line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 17};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'function multiply(a, b) { return a * b; }',
      );

      const result = getTextAfterCursorInLine(position, model);
      expect(result).toBe('y(a, b) { return a * b; }');
    });

    it('should return an empty string if cursor is at the end of the line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 42};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'function multiply(a, b) { return a * b; }',
      );

      const result = getTextAfterCursorInLine(position, model);
      expect(result).toBe('');
    });
  });

  describe('getTextBeforeCursorInLine', () => {
    it('should return the text before the cursor in the current line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 20};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'const array = [1, 2, 3, 4, 5];',
      );

      const result = getTextBeforeCursorInLine(position, model);
      expect(result).toBe('const array = [1, 2');
    });

    it('should return an empty string if cursor is at the start of the line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'const array = [1, 2, 3, 4, 5];',
      );

      const result = getTextBeforeCursorInLine(position, model);
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

  describe('getCursorPositionLabel', () => {
    it('should return the correct label for the cursor position', () => {
      const position: CursorPosition = {lineNumber: 5, column: 10};
      const result = getCursorPositionLabel(position);
      expect(result).toBe('Line 5, Column 10');
    });

    it('should handle first line and column correctly', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      const result = getCursorPositionLabel(position);
      expect(result).toBe('Line 1, Column 1');
    });
  });
});
