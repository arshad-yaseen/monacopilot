import {CursorPosition, EditorModel, EditorRange, Monaco} from '../types';

export class CompletionRange {
  constructor(private monaco: Monaco) {}

  /**
   * Calculates the range where the completion should be inserted in the editor.
   *
   * @param pos - The current cursor position in the editor.
   * @param completion - The text of the completion to be inserted.
   * @param mdl - The Monaco editor text model.
   * @returns The range where the completion should be inserted.
   */
  public computeInsertionRange(
    pos: CursorPosition,
    completion: string,
    mdl: EditorModel,
  ): EditorRange {
    // Handle empty completion
    if (!completion) {
      return new this.monaco.Range(
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
      return new this.monaco.Range(
        pos.lineNumber,
        pos.column,
        pos.lineNumber,
        pos.column,
      );
    }

    // Handle empty remaining text
    if (afterLength === 0) {
      return new this.monaco.Range(
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

    return new this.monaco.Range(
      startPosition.lineNumber,
      startPosition.column,
      endPosition.lineNumber,
      endPosition.column,
    );
  }

  /**
   * Calculates the range for caching when there's no overlap with existing text.
   * @param pos - The current cursor position.
   * @param completion - The completion text.
   * @returns The range for caching the completion.
   */
  public computeCacheRange(
    pos: CursorPosition,
    completion: string,
  ): EditorRange {
    const startLineNumber = pos.lineNumber;
    const startColumn = pos.column;
    const completionLines = completion.split('\n');
    const lastLineIndex = completionLines.length - 1;

    const endLineNumber = startLineNumber + lastLineIndex;
    const endColumn =
      lastLineIndex === 0
        ? startColumn + completionLines[0].length // Single-line completion
        : completionLines[lastLineIndex].length + 1; // Multi-line completion

    return new this.monaco.Range(
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
    );
  }
}
