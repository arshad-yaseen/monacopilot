import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {CursorPosition, EditorModel} from '../src/types';
import {isCursorAtStartWithTextAround} from '../src/utils/context-parser';
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
