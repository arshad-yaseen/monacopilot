import {CursorPosition} from '../../types';

export class Position {
  readonly line: number;
  readonly character: number;

  constructor(line: number, character: number) {
    this.line = line;
    this.character = character;
  }

  // Convert a string offset into a Position (line and column)
  static fromOffset(text: string, offset: number): Position {
    const lines = text.substring(0, offset).split('\n');
    const line = lines.length - 1;
    const character = lines[lines.length - 1].length;
    return new Position(line, character);
  }

  // Convert a Position (line and column) to an offset in a string
  static toOffset(text: string, position: CursorPosition): number {
    const lines = text.split('\n');
    let offset = 0;

    for (let i = 0; i < position.line; i++) {
      offset += lines[i].length + 1; // +1 for the newline character
    }

    offset += position.character;
    return offset;
  }
}
