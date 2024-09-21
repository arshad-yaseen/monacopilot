import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {CursorPosition, EditorModel} from '../src/types';
import {
  hasWhitespaceAfterCursor,
  isCursorAtStartWithTextAround,
  isNonPunctuationCharAfterCursor,
} from '../src/utils/context-parser';
import {mockModel} from './mock';

describe('Context Parser Utilities', () => {
  let mdl: EditorModel;

  beforeEach(() => {
    mdl = mockModel;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('hasWhitespaceAfterCursor', () => {
    it('should return true if there is a whitespace after the cursor', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 4};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('let x = 5;');

      const result = hasWhitespaceAfterCursor(pos, mdl);
      expect(result).toBe(true);
    });

    it('should return false if there is no whitespace after the cursor', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 3};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('const y = 10;');

      const result = hasWhitespaceAfterCursor(pos, mdl);
      expect(result).toBe(false);
    });

    it('should handle cursor at the end of the line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 18};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('function add(a, b)');

      const result = hasWhitespaceAfterCursor(pos, mdl);
      expect(result).toBe(false);
    });

    it('should handle empty line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('');

      const result = hasWhitespaceAfterCursor(pos, mdl);
      expect(result).toBe(false);
    });
  });

  describe('isNonPunctuationCharAfterCursor', () => {
    it('should return true if the character after the cursor is not a punctuation and is not empty', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 7};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'const array = [1, 2, 3];',
      );

      const result = isNonPunctuationCharAfterCursor(pos, mdl);
      expect(result).toBe(true);
    });

    it('should return false if the character after the cursor is a punctuation', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 12};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'if (x === 5) { return true; }',
      );

      const result = isNonPunctuationCharAfterCursor(pos, mdl);
      expect(result).toBe(false);
    });

    it('should return false if there is no character after the cursor', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 22};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('console.log("Hello");');

      const result = isNonPunctuationCharAfterCursor(pos, mdl);
      expect(result).toBe(false);
    });

    it('should return false if the character after the cursor is whitespace', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 3};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'if (condition) { doSomething(); }',
      );

      const result = isNonPunctuationCharAfterCursor(pos, mdl);
      expect(result).toBe(false);
    });

    it('should handle empty line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('');

      const result = isNonPunctuationCharAfterCursor(pos, mdl);
      expect(result).toBe(false);
    });
  });

  describe('isCursorAtStartWithTextAround', () => {
    it('should return true if the cursor is at the start of the line with text around it', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'function multiply(a, b) { return a * b; }',
      );

      const result = isCursorAtStartWithTextAround(pos, mdl);
      expect(result).toBe(true);
    });

    it('should return false if the cursor is not at the start of the line', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 5};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'const result = array.map(item => item * 2);',
      );

      const result = isCursorAtStartWithTextAround(pos, mdl);
      expect(result).toBe(false);
    });

    it('should return false if there is no text around the cursor', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('');

      const result = isCursorAtStartWithTextAround(pos, mdl);
      expect(result).toBe(false);
    });

    it('should handle cursor at the start of the line with only whitespace around', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue('   ');

      const result = isCursorAtStartWithTextAround(pos, mdl);
      expect(result).toBe(false);
    });

    it('should handle cursor at the start of the line with text after it', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        '   class MyClass extends BaseClass {',
      );

      const result = isCursorAtStartWithTextAround(pos, mdl);
      expect(result).toBe(true);
    });

    it('should handle cursor at the start of the line with text before it', () => {
      const pos: CursorPosition = {lineNumber: 1, column: 1};
      vi.spyOn(mdl, 'getLineContent').mockReturnValue(
        'import { useState, useEffect } from "react";   ',
      );

      const result = isCursorAtStartWithTextAround(pos, mdl);
      expect(result).toBe(true);
    });
  });
});
