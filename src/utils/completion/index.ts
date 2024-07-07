import {CompletionFormatter} from '../../classes';
import {
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorPosition,
  EditorRange,
} from '../../types';
import {getCharAfterCursor, getLastLineColumnCount} from '../editor';

export * from './cache';
export * from './context-parser';

/**
 * Computes the range to insert the completion in the editor.
 */
export const computeCompletionInsertRange = (
  completion: string,
  range: EditorRange,
  position: EditorPosition,
  model: EditorModel,
): EditorRange => {
  const newLineCount = (completion.match(/\n/g) || []).length;
  const lastLineColumnCount = getLastLineColumnCount(completion);
  const charAfterCursor = getCharAfterCursor(position, model);

  return {
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: position.lineNumber + newLineCount,
    endColumn: !completion.includes(charAfterCursor)
      ? position.column
      : position.lineNumber === range.startLineNumber && newLineCount === 0
        ? position.column + lastLineColumnCount
        : lastLineColumnCount,
  };
};

export const formatCompletion = (
  model: EditorModel,
  position: EditorPosition,
  completion: string,
): string => {
  const formatter = new CompletionFormatter(model, position);
  return formatter.format(completion);
};

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
});
