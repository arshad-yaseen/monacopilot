import {describe, expect, it} from 'vitest';

import {computeLCS, Diff, getDiffs} from '../src/utils/diff';

describe('computeLCS', () => {
  it('should return empty diff when both sequences are empty', () => {
    const seq1: string[] = [];
    const seq2: string[] = [];

    const expected: Diff[] = [];
    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should return all elements as added when original is empty', () => {
    const seq1: string[] = [];
    const seq2: string[] = ['line1', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'added', line: 'line1'},
      {type: 'added', line: 'line2'},
      {type: 'added', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should return all elements as deleted when modified is empty', () => {
    const seq1: string[] = ['line1', 'line2', 'line3'];
    const seq2: string[] = [];

    const expected: Diff[] = [
      {type: 'deleted', line: 'line1'},
      {type: 'deleted', line: 'line2'},
      {type: 'deleted', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should return equal diffs when sequences are identical', () => {
    const seq1: string[] = ['line1', 'line2', 'line3'];
    const seq2: string[] = ['line1', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should return all elements as added and deleted when sequences have no common elements', () => {
    const seq1: string[] = ['lineA', 'lineB', 'lineC'];
    const seq2: string[] = ['line1', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'added', line: 'line1'},
      {type: 'added', line: 'line2'},
      {type: 'added', line: 'line3'},
      {type: 'deleted', line: 'lineA'},
      {type: 'deleted', line: 'lineB'},
      {type: 'deleted', line: 'lineC'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  // Adjusted expected diffs in the following test cases

  it('should correctly compute diffs when sequences have some common elements', () => {
    const seq1 = ['line1', 'line2', 'line3', 'line4'];
    const seq2 = ['line1', 'lineA', 'line3', 'lineB'];

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'lineA'},
      {type: 'deleted', line: 'line2'},
      {type: 'equal', line: 'line3'},
      {type: 'added', line: 'lineB'},
      {type: 'deleted', line: 'line4'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should correctly handle sequences with duplicate elements', () => {
    const seq1 = ['line1', 'line2', 'line1', 'line3'];
    const seq2 = ['line1', 'line1', 'line4'];

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'deleted', line: 'line2'},
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'line4'},
      {type: 'deleted', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should handle additions at the beginning of the sequence', () => {
    const seq1 = ['line1', 'line2', 'line3'];
    const seq2 = ['lineA', 'lineB', 'line1', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'added', line: 'lineA'},
      {type: 'added', line: 'lineB'},
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should handle additions in the middle of the sequence', () => {
    const seq1 = ['line1', 'line2', 'line3'];
    const seq2 = ['line1', 'lineA', 'lineB', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'lineA'},
      {type: 'added', line: 'lineB'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should handle additions at the end of the sequence', () => {
    const seq1 = ['line1', 'line2', 'line3'];
    const seq2 = ['line1', 'line2', 'line3', 'lineA', 'lineB'];

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
      {type: 'added', line: 'lineA'},
      {type: 'added', line: 'lineB'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should handle deletions at the beginning of the sequence', () => {
    const seq1 = ['lineA', 'lineB', 'line1', 'line2', 'line3'];
    const seq2 = ['line1', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'deleted', line: 'lineA'},
      {type: 'deleted', line: 'lineB'},
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should handle deletions in the middle of the sequence', () => {
    const seq1 = ['line1', 'lineA', 'lineB', 'line2', 'line3'];
    const seq2 = ['line1', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'deleted', line: 'lineA'},
      {type: 'deleted', line: 'lineB'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });

  it('should handle deletions at the end of the sequence', () => {
    const seq1 = ['line1', 'line2', 'line3', 'lineA', 'lineB'];
    const seq2 = ['line1', 'line2', 'line3'];

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
      {type: 'deleted', line: 'lineA'},
      {type: 'deleted', line: 'lineB'},
    ];

    const result = computeLCS(seq1, seq2);
    expect(result).toEqual(expected);
  });
});

describe('getDiffs', () => {
  it('should return empty diff when both texts are empty', () => {
    const originalText = '';
    const modifiedText = '';

    const expected: Diff[] = [{type: 'equal', line: ''}];
    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should return all lines as added when original text is empty', () => {
    const originalText = '';
    const modifiedText = 'line1\nline2\nline3';

    const expected: Diff[] = [
      {type: 'added', line: 'line1'},
      {type: 'added', line: 'line2'},
      {type: 'added', line: 'line3'},
      {type: 'deleted', line: ''},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should return all lines as deleted when modified text is empty', () => {
    const originalText = 'line1\nline2\nline3';
    const modifiedText = '';

    const expected: Diff[] = [
      {type: 'added', line: ''},
      {type: 'deleted', line: 'line1'},
      {type: 'deleted', line: 'line2'},
      {type: 'deleted', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should correctly compute diffs when texts have some common lines', () => {
    const originalText = 'line1\nline2\nline3\nline4';
    const modifiedText = 'line1\nlineA\nline3\nlineB';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'lineA'},
      {type: 'deleted', line: 'line2'},
      {type: 'equal', line: 'line3'},
      {type: 'added', line: 'lineB'},
      {type: 'deleted', line: 'line4'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle texts with duplicate lines', () => {
    const originalText = 'line1\nline2\nline1\nline3';
    const modifiedText = 'line1\nline1\nline4';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'deleted', line: 'line2'},
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'line4'},
      {type: 'deleted', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle additions at the beginning of the text', () => {
    const originalText = 'line1\nline2\nline3';
    const modifiedText = 'lineA\nlineB\nline1\nline2\nline3';

    const expected: Diff[] = [
      {type: 'added', line: 'lineA'},
      {type: 'added', line: 'lineB'},
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle additions in the middle of the text', () => {
    const originalText = 'line1\nline2\nline3';
    const modifiedText = 'line1\nlineA\nlineB\nline2\nline3';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'lineA'},
      {type: 'added', line: 'lineB'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle additions at the end of the text', () => {
    const originalText = 'line1\nline2\nline3';
    const modifiedText = 'line1\nline2\nline3\nlineA\nlineB';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
      {type: 'added', line: 'lineA'},
      {type: 'added', line: 'lineB'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle deletions at the beginning of the text', () => {
    const originalText = 'lineA\nlineB\nline1\nline2\nline3';
    const modifiedText = 'line1\nline2\nline3';

    const expected: Diff[] = [
      {type: 'deleted', line: 'lineA'},
      {type: 'deleted', line: 'lineB'},
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle deletions in the middle of the text', () => {
    const originalText = 'line1\nlineA\nlineB\nline2\nline3';
    const modifiedText = 'line1\nline2\nline3';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'deleted', line: 'lineA'},
      {type: 'deleted', line: 'lineB'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle deletions at the end of the text', () => {
    const originalText = 'line1\nline2\nline3\nlineA\nlineB';
    const modifiedText = 'line1\nline2\nline3';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'equal', line: 'line2'},
      {type: 'equal', line: 'line3'},
      {type: 'deleted', line: 'lineA'},
      {type: 'deleted', line: 'lineB'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle texts with multiple consecutive additions and deletions', () => {
    const originalText = 'line1\nline2\nline3\nline4\nline5';
    const modifiedText = 'line1\nlineA\nlineB\nline3\nlineC\nline5';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'lineA'},
      {type: 'added', line: 'lineB'},
      {type: 'deleted', line: 'line2'},
      {type: 'equal', line: 'line3'},
      {type: 'added', line: 'lineC'},
      {type: 'deleted', line: 'line4'},
      {type: 'equal', line: 'line5'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle texts with empty lines', () => {
    const originalText = 'line1\n\nline3';
    const modifiedText = 'line1\nline2\nline3';

    const expected: Diff[] = [
      {type: 'equal', line: 'line1'},
      {type: 'added', line: 'line2'},
      {type: 'deleted', line: ''},
      {type: 'equal', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });

  it('should handle texts with different line endings', () => {
    const originalText = 'line1\r\nline2\r\nline3';
    const modifiedText = 'line1\nline2\nline3';

    const expected: Diff[] = [
      {type: 'added', line: 'line1'},
      {type: 'added', line: 'line2'},
      {type: 'deleted', line: 'line1\r'},
      {type: 'deleted', line: 'line2\r'},
      {type: 'equal', line: 'line3'},
    ];

    const result = getDiffs(originalText, modifiedText);
    expect(result).toEqual(expected);
  });
});
