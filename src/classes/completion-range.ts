import {CursorPosition, EditorRange, Monaco} from '../types';

export class CompletionRange {
  private monaco: Monaco;

  constructor(monaco: Monaco) {
    this.monaco = monaco;
  }

  public computeInsertionRange(
    pos: CursorPosition,
    completion: string,
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

    // Calculate start and end positions
    const startLineNumber = pos.lineNumber;
    const startColumn = pos.column;

    // Split completion into lines to handle multi-line
    const completionLines = completion.split('\n');
    const lastLineIndex = completionLines.length - 1;

    // Calculate end position
    const endLineNumber = startLineNumber + lastLineIndex;
    const endColumn =
      lastLineIndex === 0
        ? startColumn + completionLines[0].length // Same line
        : completionLines[lastLineIndex].length + 1; // New line

    return new this.monaco.Range(
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
    );
  }
}
