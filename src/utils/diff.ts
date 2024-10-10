import {
  DIFF_ADDED_LINE_CLASS,
  DIFF_DECORATION_DEFAULT_OPTIONS,
  DIFF_DELETED_LINE_CLASS,
} from '../constants/editor';
import {
  EditorDecorationsCollection,
  EditorDeltaDecoration,
  EditorSelection,
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
 * Applies diff decorations to the editor based on the differences between original and modified text,
 * but only within the specified selection range.
 *
 * @param editor - The Monaco editor instance to apply decorations to.
 * @param originalText - The original text within the selection range.
 * @param modifiedText - The modified text within the selection range.
 * @param selection - The selection range within which to apply the diff decorations.
 * @returns An object with methods to apply and clear decorations.
 */
export const applyDiffDecorations = (
  editor: StandaloneCodeEditor,
  originalText: string,
  modifiedText: string,
  selection: EditorSelection,
): {clear: () => void} | null => {
  const diffs = getDiffs(originalText, modifiedText);
  const model = editor.getModel();

  if (!model) return null;

  const decorations: EditorDeltaDecoration[] = [];
  const newLines: string[] = [];
  let lineNumber = selection.startLineNumber;

  diffs.forEach((diff, index) => {
    const {type, line} = diff;
    const contentLength = line.length;
    let rangeStartColumn = 1;
    let rangeEndColumn = contentLength + 1;

    // Adjust columns for the first and last lines
    if (index === 0) {
      rangeStartColumn = selection.startColumn;
    }
    if (index === diffs.length - 1) {
      rangeEndColumn = selection.endColumn;
    }

    if (type === 'equal') {
      newLines.push(line);
      lineNumber++;
    } else if (type === 'deleted') {
      newLines.push(line);
      decorations.push({
        range: createRange(
          lineNumber,
          rangeStartColumn,
          lineNumber,
          rangeEndColumn,
        ),
        options: {
          ...DIFF_DECORATION_DEFAULT_OPTIONS,
          className: DIFF_DELETED_LINE_CLASS,
        },
      });
      lineNumber++;
    } else if (type === 'added') {
      newLines.push(line);
      decorations.push({
        range: createRange(
          lineNumber,
          rangeStartColumn,
          lineNumber,
          rangeEndColumn,
        ),
        options: {
          ...DIFF_DECORATION_DEFAULT_OPTIONS,
          className: DIFF_ADDED_LINE_CLASS,
        },
      });
      lineNumber++;
    }
  });

  const newSelectionText = newLines.join('\n');
  let decorationsCollection: EditorDecorationsCollection | null = null;

  // Calculate the modified range
  const modifiedEndLineNumber = selection.startLineNumber + newLines.length - 1;
  const modifiedEndColumn =
    newLines.length > 1
      ? newLines[newLines.length - 1].length + 1
      : selection.endColumn;

  const modifiedRange = createRange(
    selection.startLineNumber,
    selection.startColumn,
    modifiedEndLineNumber,
    modifiedEndColumn,
  );

  model.pushEditOperations(
    [],
    [{range: selection, text: newSelectionText}],
    () => null,
  );
  decorationsCollection = editor.createDecorationsCollection(decorations);

  return {
    clear: () => {
      if (decorationsCollection) {
        decorationsCollection.clear();
      }
      model.pushEditOperations(
        [],
        [{range: modifiedRange, text: originalText}],
        () => null,
      );
    },
  };
};
