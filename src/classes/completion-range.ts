import {CursorPosition, EditorModel, EditorRange, Monaco} from '../types';
import {
  getCharAfterCursor,
  getTextAfterCursor,
  getTextBeforeCursor,
} from '../utils';

export class CompletionRange {
  constructor(private monaco: Monaco) {}

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

    const charAfterCursor = getCharAfterCursor(pos, mdl);
    const completionFirstChar = completion[0];

    // If there's no non-whitespace character after the cursor, calculate range without overlap
    if (!charAfterCursor || completionFirstChar === charAfterCursor) {
      return this.calculateRangeWithoutOverlap(pos, completion);
    }

    const startOffset = mdl.getOffsetAt(pos);
    const textBeforeCursor = getTextBeforeCursor(pos, mdl);
    const textAfterCursor = getTextAfterCursor(pos, mdl);

    // Handle cursor at the end of the document or when there's no text after the cursor
    if (startOffset >= mdl.getValue().length || !textAfterCursor.length) {
      return new this.monaco.Range(
        pos.lineNumber,
        pos.column,
        pos.lineNumber,
        pos.column,
      );
    }

    // Calculate overlaps with text before and after the cursor
    const startOverlapLength = this.getSuffixOverlapLength(
      completion,
      textBeforeCursor,
    );
    const maxOverlapLength = this.computeMaxOverlapLength(
      completion,
      textAfterCursor,
    );

    // Calculate start and end positions based on overlaps
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

  // Calculates the range when there's no overlap with existing text
  private calculateRangeWithoutOverlap(
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

  // Computes the maximum overlap length with text after the cursor
  private computeMaxOverlapLength(
    completion: string,
    textAfterCursor: string,
  ): number {
    const prefixOverlapLength = this.getPrefixOverlapLength(
      completion,
      textAfterCursor,
    );
    const suffixOverlapLength = this.getSuffixPrefixOverlapLength(
      completion,
      textAfterCursor,
    );
    let maxOverlapLength = Math.max(prefixOverlapLength, suffixOverlapLength);

    // Check for internal overlaps if no prefix or suffix overlap is found
    if (maxOverlapLength === 0) {
      maxOverlapLength = this.getInternalOverlapLength(
        completion,
        textAfterCursor,
      );
    }

    return maxOverlapLength;
  }

  // Finds overlap where the suffix of 'textBeforeCursor' matches the prefix of 'completion'
  private getSuffixOverlapLength(
    completion: string,
    textBeforeCursor: string,
  ): number {
    const maxPossibleOverlap = Math.min(
      completion.length,
      textBeforeCursor.length,
    );
    let overlapLength = 0;

    for (let i = 1; i <= maxPossibleOverlap; i++) {
      if (completion.substring(0, i) === textBeforeCursor.slice(-i)) {
        overlapLength = i;
      }
    }

    return overlapLength;
  }

  // Finds the maximum length where the prefix of 'completion' matches 'textAfterCursor'
  private getPrefixOverlapLength(
    completion: string,
    textAfterCursor: string,
  ): number {
    const maxPossibleOverlap = Math.min(
      completion.length,
      textAfterCursor.length,
    );

    for (let i = 0; i < maxPossibleOverlap; i++) {
      if (completion[i] !== textAfterCursor[i]) {
        return i;
      }
    }

    return maxPossibleOverlap;
  }

  // Finds overlap where the suffix of 'completion' matches the prefix of 'textAfterCursor'
  private getSuffixPrefixOverlapLength(
    completion: string,
    textAfterCursor: string,
  ): number {
    const maxPossibleOverlap = Math.min(
      completion.length,
      textAfterCursor.length,
    );

    for (let i = maxPossibleOverlap; i > 0; i--) {
      if (completion.slice(-i) === textAfterCursor.slice(0, i)) {
        return i;
      }
    }

    return 0;
  }

  // Finds internal overlaps within 'completion' and 'textAfterCursor'
  private getInternalOverlapLength(
    completion: string,
    textAfterCursor: string,
  ): number {
    for (let i = 1; i < completion.length; i++) {
      if (textAfterCursor.startsWith(completion.substring(i))) {
        return completion.length - i;
      }
    }

    return 0;
  }
}
