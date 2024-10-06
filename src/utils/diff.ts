import {
  DIFF_ADDED_LINE_CLASS,
  DIFF_DECORATION_DEFAULT_OPTIONS,
  DIFF_DELETED_LINE_CLASS,
} from '../constants';
import {
  EditorDecorationsCollection,
  EditorDeltaDecoration,
  StandaloneCodeEditor,
} from '../types';
import {createRange} from './editor';

type DiffType = 'equal' | 'deleted' | 'added';

export interface Diff {
  type: DiffType;
  line: string;
}

/**
 * Computes the Longest Common Subsequence (LCS) of two sequences.
 * @param {string[]} seq1 - The first sequence.
 * @param {string[]} seq2 - The second sequence.
 * @returns {Diff[]} An array of Diff objects representing the LCS.
 */
export const computeLCS = (seq1: string[], seq2: string[]): Diff[] => {
  const m = seq1.length;
  const n = seq2.length;
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Build the LCS dp table
  for (let i = 0; i <= m; i++) {
    dp[i][0] = 0;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = 0;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (seq1[i - 1] === seq2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }

  // Backtrack to find the diff
  let i = m;
  let j = n;
  const edits: Diff[] = [];

  while (i > 0 && j > 0) {
    if (seq1[i - 1] === seq2[j - 1]) {
      // Characters match, move diagonally
      edits.unshift({type: 'equal', line: seq1[i - 1]});
      i--;
      j--;
    } else if (dp[i][j] === dp[i - 1][j]) {
      // Move up, character deleted from seq1
      edits.unshift({type: 'deleted', line: seq1[i - 1]});
      i--;
    } else {
      // Move left, character added in seq2
      edits.unshift({type: 'added', line: seq2[j - 1]});
      j--;
    }
  }

  // Handle any remaining characters in seq1 (deletions)
  while (i > 0) {
    edits.unshift({type: 'deleted', line: seq1[i - 1]});
    i--;
  }

  // Handle any remaining characters in seq2 (additions)
  while (j > 0) {
    edits.unshift({type: 'added', line: seq2[j - 1]});
    j--;
  }

  return edits;
};

/**
 * Computes the differences between two texts.
 *
 * @param {string} originalText - The original text to compare.
 * @param {string} modifiedText - The modified text to compare against the original.
 * @returns {Diff[]} An array of Diff objects representing the differences between the texts.
 */
export const getDiffs = (
  originalText: string,
  modifiedText: string,
): Diff[] => {
  const originalLines = originalText.split('\n');
  const modifiedLines = modifiedText.split('\n');
  return computeLCS(originalLines, modifiedLines);
};

/**
 * Applies diff decorations to the editor based on the differences between original and modified text.
 *
 * This function computes the differences between the original and modified text,
 * applies the changes to the editor, and adds decorations to highlight
 * added and deleted lines.
 *
 * @param {StandaloneCodeEditor} editor - The Monaco editor instance to apply decorations to.
 * @param {string} originalText - The original text before modifications.
 * @param {string} modifiedText - The modified text to compare against the original.
 */
export const applyDiffDecorations = (
  editor: StandaloneCodeEditor,
  originalText: string,
  modifiedText: string,
): EditorDecorationsCollection | null => {
  const diffs = getDiffs(originalText, modifiedText);
  const model = editor.getModel();

  if (!model) return null;

  const decorations: EditorDeltaDecoration[] = [];
  const newLines: string[] = [];
  let lineNumber = 1;

  diffs.forEach(diff => {
    const {type, line} = diff;
    const contentLength = line.length;

    if (type === 'equal') {
      newLines.push(line);
      lineNumber++;
    } else if (type === 'deleted') {
      newLines.push(line);
      decorations.push({
        range: createRange(lineNumber, 1, lineNumber, contentLength + 1),
        options: {
          ...DIFF_DECORATION_DEFAULT_OPTIONS,
          className: DIFF_DELETED_LINE_CLASS,
        },
      });
      lineNumber++;
    } else if (type === 'added') {
      newLines.push(line);
      decorations.push({
        range: createRange(lineNumber, 1, lineNumber, contentLength + 1),
        options: {
          ...DIFF_DECORATION_DEFAULT_OPTIONS,
          className: DIFF_ADDED_LINE_CLASS,
        },
      });
      lineNumber++;
    }
  });

  const newValue = newLines.join('\n');
  model.setValue(newValue);

  return editor.createDecorationsCollection(decorations);
};
