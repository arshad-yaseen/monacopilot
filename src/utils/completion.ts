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
  const textBeforeCursor = mdl.getValue().substring(0, startOffset);
  const textAfterCursor = mdl.getValue().substring(startOffset);

  let prefixOverlapLength = 0;
  let suffixOverlapLength = 0;
  let maxOverlapLength = 0;
  let startOverlapLength = 0;

  const completionLength = completion.length;
  const beforeLength = textBeforeCursor.length;
  const afterLength = textAfterCursor.length;

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
  if (afterLength === 0) {
    return new monaco.Range(
      pos.lineNumber,
      pos.column,
      pos.lineNumber,
      pos.column,
    );
  }

  // Find overlap with text before cursor
  const maxBeforeOverlap = Math.min(completionLength, beforeLength);
  for (let i = 1; i <= maxBeforeOverlap; i++) {
    const completionStart = completion.substring(0, i);
    const textEnd = textBeforeCursor.slice(-i);
    if (completionStart === textEnd) {
      startOverlapLength = i;
    }
  }

  // Find overlap with text after cursor
  const maxAfterOverlap = Math.min(completionLength, afterLength);

  // Find the longest prefix overlap with text after cursor
  for (let i = 0; i < maxAfterOverlap; i++) {
    if (completion[i] !== textAfterCursor[i]) break;
    prefixOverlapLength++;
  }

  // Find the longest suffix overlap with text after cursor
  for (let i = 1; i <= maxAfterOverlap; i++) {
    if (completion.slice(-i) === textAfterCursor.slice(0, i)) {
      suffixOverlapLength = i;
    }
  }

  maxOverlapLength = Math.max(prefixOverlapLength, suffixOverlapLength);

  // Check for internal overlaps if no prefix or suffix overlap
  if (maxOverlapLength === 0) {
    for (let i = 1; i < completionLength; i++) {
      if (textAfterCursor.startsWith(completion.substring(i))) {
        maxOverlapLength = completionLength - i;
        break;
      }
    }
  }

  // Calculate start and end positions
  const startPosition =
    startOverlapLength > 0
      ? mdl.getPositionAt(startOffset - startOverlapLength)
      : pos;
  const endOffset = startOffset + maxOverlapLength;
  const endPosition = mdl.getPositionAt(endOffset);

  return new monaco.Range(
    startPosition.lineNumber,
    startPosition.column,
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
