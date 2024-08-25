import {CompletionFormatter} from '../classes';
import {
  CursorPosition,
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorRange,
} from '../types';
import {getCharAfterCursor, getLastLineColumnCount} from './editor';

/**
 * Computes the range to insert the completion in the editor.
 */
export const computeCompletionInsertRange = (
  completion: string,
  range: EditorRange,
  position: CursorPosition,
  model: EditorModel,
): EditorRange => {
  const newLineCount = (completion.match(/\n/g) || []).length;
  const lastLineColumnCount = getLastLineColumnCount(completion);
  const charAfterCursor = getCharAfterCursor(position, model);

  return {
    // Start line is always the current cursor position's line
    startLineNumber: position.lineNumber,
    // Start column is always the current cursor position's column
    startColumn: position.column,
    // End line is calculated by adding the number of new lines in the completion
    endLineNumber: position.lineNumber + newLineCount,
    // End column calculation is more complex:
    endColumn: !completion.includes(charAfterCursor)
      ? position.column // If the completion doesn't include the char after cursor, end at current position
      : position.lineNumber === range.startLineNumber && newLineCount === 0
        ? position.column + (lastLineColumnCount - 1) // If on same line and no new lines, add last line column count
        : lastLineColumnCount, // Otherwise, use the last line column count of the completion
  };
};

export function formatCompletion(completion: string): string {
  return CompletionFormatter.create(completion)
    .removeMarkdownCodeSyntax()
    .removeExcessiveNewlines()
    .removeInvalidLineBreaks()
    .build();
}

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
});
