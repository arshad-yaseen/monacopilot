import {describe, expect, it, vi} from 'vitest';

import {CursorPosition} from '../src/types';
import {
  hasWhitespaceAfterCursor,
  isCursorAtStartWithTextAround,
  isNonPunctuationCharAfterCursor,
} from '../src/utils/context-parser';
import {model} from './mock';

describe('Context Parser Utilities', () => {
  describe('hasWhitespaceAfterCursor', () => {
    it('should return true if there is a whitespace after the cursor', () => {
      const position: CursorPosition = {lineNumber: 1, column: 4};
      vi.spyOn(model, 'getLineContent').mockReturnValue('let x = 5;');

      const result = hasWhitespaceAfterCursor(position, model);
      expect(result).toBe(true);
    });

    it('should return false if there is no whitespace after the cursor', () => {
      const position: CursorPosition = {lineNumber: 1, column: 3};
      vi.spyOn(model, 'getLineContent').mockReturnValue('const y = 10;');

      const result = hasWhitespaceAfterCursor(position, model);
      expect(result).toBe(false);
    });

    it('should handle cursor at the end of the line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 18};
      vi.spyOn(model, 'getLineContent').mockReturnValue('function add(a, b)');

      const result = hasWhitespaceAfterCursor(position, model);
      expect(result).toBe(false);
    });

    it('should handle empty line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue('');

      const result = hasWhitespaceAfterCursor(position, model);
      expect(result).toBe(false);
    });
  });

  describe('isNonPunctuationCharAfterCursor', () => {
    it('should return true if the character after the cursor is not a punctuation and is not empty', () => {
      const position: CursorPosition = {lineNumber: 1, column: 7};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'const array = [1, 2, 3];',
      );

      const result = isNonPunctuationCharAfterCursor(position, model);
      expect(result).toBe(true);
    });

    it('should return false if the character after the cursor is a punctuation', () => {
      const position: CursorPosition = {lineNumber: 1, column: 12};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'if (x === 5) { return true; }',
      );

      const result = isNonPunctuationCharAfterCursor(position, model);
      expect(result).toBe(false);
    });

    it('should return false if there is no character after the cursor', () => {
      const position: CursorPosition = {lineNumber: 1, column: 22};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'console.log("Hello");',
      );

      const result = isNonPunctuationCharAfterCursor(position, model);
      expect(result).toBe(false);
    });

    it('should return false if the character after the cursor is whitespace', () => {
      const position: CursorPosition = {lineNumber: 1, column: 3};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'if (condition) { doSomething(); }',
      );

      const result = isNonPunctuationCharAfterCursor(position, model);
      expect(result).toBe(false);
    });

    it('should handle empty line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue('');

      const result = isNonPunctuationCharAfterCursor(position, model);
      expect(result).toBe(false);
    });
  });

  describe('isCursorAtStartWithTextAround', () => {
    it('should return true if the cursor is at the start of the line with text around it', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'function multiply(a, b) { return a * b; }',
      );

      const result = isCursorAtStartWithTextAround(position, model);
      expect(result).toBe(true);
    });

    it('should return false if the cursor is not at the start of the line', () => {
      const position: CursorPosition = {lineNumber: 1, column: 5};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'const result = array.map(item => item * 2);',
      );

      const result = isCursorAtStartWithTextAround(position, model);
      expect(result).toBe(false);
    });

    it('should return false if there is no text around the cursor', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue('');

      const result = isCursorAtStartWithTextAround(position, model);
      expect(result).toBe(false);
    });

    it('should handle cursor at the start of the line with only whitespace around', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue('   ');

      const result = isCursorAtStartWithTextAround(position, model);
      expect(result).toBe(false);
    });

    it('should handle cursor at the start of the line with text after it', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        '   class MyClass extends BaseClass {',
      );

      const result = isCursorAtStartWithTextAround(position, model);
      expect(result).toBe(true);
    });

    it('should handle cursor at the start of the line with text before it', () => {
      const position: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(model, 'getLineContent').mockReturnValue(
        'import { useState, useEffect } from "react";   ',
      );

      const result = isCursorAtStartWithTextAround(position, model);
      expect(result).toBe(true);
    });
  });
});
