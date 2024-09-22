import {EditorRange} from '../../types';
import {Position} from './position';

export class Range {
  readonly start: Position;
  readonly end: Position;

  constructor(start: Position, end: Position) {
    this.start = start;
    this.end = end;
  }

  // Convert a string range (start and end offsets) to a Range object
  static fromOffsets(
    text: string,
    startOffset: number,
    endOffset: number,
  ): Range {
    const start = Position.fromOffset(text, startOffset);
    const end = Position.fromOffset(text, endOffset);
    return new Range(start, end);
  }

  // Convert a Range object to a start and end offset in the text
  static toOffsets(
    range: EditorRange,
    text: string,
  ): {startOffset: number; endOffset: number} {
    const startOffset = Position.toOffset(text, range.start);
    const endOffset = Position.toOffset(text, range.end);
    return {startOffset, endOffset};
  }
}
