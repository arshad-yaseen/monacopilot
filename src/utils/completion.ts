import {CompletionFormatter} from '../classes';
import {
  CursorPosition,
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorRange,
} from '../types';

/**
 * Calculates the range where the completion should be inserted in the editor.
 *
 * @param position - The current cursor position in the editor.
 * @param completionText - The text of the completion to be inserted.
 * @param model - The Monaco editor text model.
 * @returns The range where the completion should be inserted.
 */
export function computeCompletionInsertionRange(
  position: CursorPosition,
  completionText: string,
  model: EditorModel,
): EditorRange {
  // Get the offset in the model where the cursor is currently located.
  const startOffset = model.getOffsetAt(position);

  // Get the text from the current position to the end of the document.
  const remainingText = model.getValue().slice(startOffset);

  // Compare the completion text with the existing text to find overlap.
  let overlapLength = 0;
  const minLength = Math.min(completionText.length, remainingText.length);
  for (let i = 0; i < minLength; i++) {
    if (completionText[i] === remainingText[i]) {
      overlapLength++;
    } else {
      break;
    }
  }

  // Calculate the end offset where the overlapping text ends.
  const endOffset = startOffset + overlapLength;

  // Get the end position in the model corresponding to the end offset.
  const endPosition = model.getPositionAt(endOffset);

  return {
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: endPosition.lineNumber,
    endColumn: endPosition.column,
  };
}

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
