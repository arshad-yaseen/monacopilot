import {CompletionFormatter} from '../classes';
import {
  CursorPosition,
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorRange,
  Monaco,
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
  monaco: Monaco,
  pos: CursorPosition,
  mdl: EditorModel,
  completion: string,
): EditorRange => {
  // Handle empty completion
  if (!completion) {
    return new monaco.Range(
      pos.lineNumber,
      pos.column,
      pos.lineNumber,
      pos.column,
    );
  }

  const startOffset = mdl.getOffsetAt(pos);
  const remainingText = mdl.getValue().substring(startOffset);

  let prefixOverlapLength = 0;
  let suffixOverlapLength = 0;
  let maxOverlapLength = 0;

  const completionLength = completion.length;
  const remainingLength = remainingText.length;

  // Handle cursor at the end of the document
  if (startOffset >= mdl.getValue().length) {
    return new monaco.Range(
      pos.lineNumber,
      pos.column,
      pos.lineNumber,
      pos.column,
    );
  }

  // Handle empty remaining text
  if (remainingLength === 0) {
    return new monaco.Range(
      pos.lineNumber,
      pos.column,
      pos.lineNumber,
      pos.column,
    );
  }

  const maxPossibleOverlap = Math.min(completionLength, remainingLength);

  // Find the longest prefix overlap
  for (let i = 0; i < maxPossibleOverlap; i++) {
    if (completion[i] !== remainingText[i]) break;
    prefixOverlapLength++;
  }

  // Find the longest suffix overlap
  for (let i = 1; i <= maxPossibleOverlap; i++) {
    if (completion.slice(-i) === remainingText.slice(0, i)) {
      suffixOverlapLength = i;
    }
  }

  maxOverlapLength = Math.max(prefixOverlapLength, suffixOverlapLength);

  // Check for internal overlaps if no prefix or suffix overlap
  if (maxOverlapLength === 0) {
    for (let i = 1; i < completionLength; i++) {
      if (remainingText.startsWith(completion.substring(i))) {
        maxOverlapLength = completionLength - i;
        break;
      }
    }
  }

  const endOffset = startOffset + maxOverlapLength;
  const endPosition = mdl.getPositionAt(endOffset);

  return new monaco.Range(
    pos.lineNumber,
    pos.column,
    endPosition.lineNumber,
    endPosition.column,
  );
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
