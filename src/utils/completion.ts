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
 * @param model - The Monaco editor text model.
 * @param completion - The text of the completion to be inserted.
 * @returns The range where the completion should be inserted.
 */
export const computeCompletionInsertionRange = (
  pos: CursorPosition,
  mdl: EditorModel,
  completion: string,
): EditorRange => {
  // Handle empty completion
  if (!completion) {
    return {
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column,
    };
  }

  // Get the offset in the model where the cursor is currently located.
  const startOffset = mdl.getOffsetAt(pos);

  // Get the text from the cursor position to the end of the document.
  const remainingText = mdl.getValue().substring(startOffset);

  // Initialize overlap lengths
  let prefixOverlapLength = 0;
  let suffixOverlapLength = 0;
  let maxOverlapLength = 0;

  const completionLength = completion.length;
  const remainingLength = remainingText.length;

  // If Cursor at the end of the document
  if (startOffset >= mdl.getValue().length) {
    return {
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column,
    };
  }

  // If Remaining text is empty
  if (remainingLength === 0) {
    return {
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column,
    };
  }

  const maxPossibleOverlap = Math.min(completionLength, remainingLength);

  // Find the longest prefix overlap
  for (let i = 0; i < maxPossibleOverlap; i++) {
    if (completion[i] !== remainingText[i]) {
      break;
    }
    prefixOverlapLength++;
  }

  // Find the longest suffix overlap
  for (let i = 1; i <= maxPossibleOverlap; i++) {
    const completionSuffix = completion.slice(-i);
    const textPrefix = remainingText.slice(0, i);
    if (completionSuffix === textPrefix) {
      suffixOverlapLength = i;
    }
  }

  // Determine the maximum overlap
  maxOverlapLength = Math.max(prefixOverlapLength, suffixOverlapLength);

  // If both overlaps are zero, check for internal overlaps
  if (maxOverlapLength === 0) {
    for (let i = 1; i < completionLength; i++) {
      const completionSub = completion.substring(i);
      if (remainingText.startsWith(completionSub)) {
        maxOverlapLength = completionLength - i;
        break;
      }
    }
  }

  // Calculate the end offset where the overlapping text ends.
  const endOffset = startOffset + maxOverlapLength;

  // Get the end position in the model corresponding to the end offset.
  const endPosition = mdl.getPositionAt(endOffset);

  return {
    startLineNumber: pos.lineNumber,
    startColumn: pos.column,
    endLineNumber: endPosition.lineNumber,
    endColumn: endPosition.column,
  };
};

export const formatCompletion = (completion: string): string => {
  return CompletionFormatter.create(completion)
    .removeMarkdownCodeSyntax()
    .removeExcessiveNewlines()
    .removeInvalidLineBreaks()
    .build();
};

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
});
