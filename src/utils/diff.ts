// utils/diff.ts
import {
  DIFF_ADDED_LINE_CLASS,
  DIFF_DECORATION_DEFAULT_OPTIONS,
  DIFF_DELETED_LINE_CLASS,
} from '../constants/editor';
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
 *
 * @param seq1 - The first sequence.
 * @param seq2 - The second sequence.
 * @returns An array of Diff objects representing the LCS.
 */
export const computeLCS = (seq1: string[], seq2: string[]): Diff[] => {
  const m = seq1.length;
  const n = seq2.length;
  const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

  // Build the LCS dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (seq1[i - 1] === seq2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find the diff
  let i = m;
  let j = n;
  const edits: Diff[] = [];

  while (i > 0 && j > 0) {
    if (seq1[i - 1] === seq2[j - 1]) {
      edits.unshift({type: 'equal', line: seq1[i - 1]});
      i--;
      j--;
    } else if (dp[i][j] === dp[i - 1][j]) {
      edits.unshift({type: 'deleted', line: seq1[i - 1]});
      i--;
    } else {
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
 * @param originalText - The original text to compare.
 * @param modifiedText - The modified text to compare against the original.
 * @returns An array of Diff objects representing the differences between the texts.
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
 * @param editor - The Monaco editor instance to apply decorations to.
 * @param originalText - The original text before modifications.
 * @param modifiedText - The modified text to compare against the original.
 * @returns An object with methods to apply and clear decorations.
 */
export const diffDecorations = (
  editor: StandaloneCodeEditor,
  originalText: string,
  modifiedText: string,
): {apply: () => void; clear: () => void} | null => {
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
  let decorationsCollection: EditorDecorationsCollection | null = null;

  return {
    apply: () => {
      model.pushEditOperations(
        [],
        [{range: model.getFullModelRange(), text: newValue}],
        () => null,
      );
      decorationsCollection = editor.createDecorationsCollection(decorations);
    },
    clear: () => {
      if (decorationsCollection) {
        decorationsCollection.clear();
      }
      model.pushEditOperations(
        [],
        [{range: model.getFullModelRange(), text: originalText}],
        () => null,
      );
    },
  };
};
