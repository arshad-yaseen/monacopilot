import {CompletionFormatter} from '../classes';
import {
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorPosition,
  EditorRange,
} from '../types';
import {getCharAfterCursor, getLastLineColumnCount} from './editor';

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

export function formatCompletion(
  model: EditorModel,
  position: EditorPosition,
  completion: string,
): string {
  return CompletionFormatter.create(model, position)
    .setCompletion(completion)
    .ignoreBlankLines()
    .removeDuplicatesFromStartOfCompletion()
    .preventDuplicateLines()
    .removeInvalidLineBreaks()
    .trimStart()
    .build();
}

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
});
