import {EditorModel, EditorPosition} from '../../types';
import {getTextBeforeCursor} from '../../utils';

/**
 * This class is responsible for formatting code completions
 * to ensure that they are displayed correctly in the editor.
 */
export class CompletionFormatter {
  private formattedCompletion = '';
  private originalCompletion = '';
  private readonly model: EditorModel;
  private readonly cursorPosition: EditorPosition;
  private readonly lineCount: number;

  constructor(model: EditorModel, position: EditorPosition) {
    this.model = model;
    this.cursorPosition = position;
    this.lineCount = model.getLineCount();
  }

  // Remove blank lines from the completion
  private ignoreBlankLines(): this {
    if (
      this.formattedCompletion.trimStart() === '' &&
      this.originalCompletion !== '\n'
    ) {
      this.formattedCompletion = this.formattedCompletion.trim();
    }
    return this;
  }

  // Normalize code or text by trimming whitespace
  private normalise(text: string): string {
    return text?.trim() ?? '';
  }

  // Remove duplicates from the start of the completion
  private removeDuplicatesFromStartOfCompletion(): this {
    const before = getTextBeforeCursor(this.cursorPosition, this.model).trim();
    const completion = this.normalise(this.formattedCompletion);

    // Handle start duplicates
    let startOverlapLength = 0;
    const maxStartLength = Math.min(completion.length, before.length);
    for (let length = 1; length <= maxStartLength; length++) {
      const endOfBefore = before.slice(-length);
      const startOfCompletion = completion.slice(0, length);
      if (endOfBefore === startOfCompletion) {
        startOverlapLength = length;
      } else {
        break;
      }
    }

    // Apply the trimming
    if (startOverlapLength > 0) {
      this.formattedCompletion =
        this.formattedCompletion.slice(startOverlapLength);
    }

    return this;
  }

  // Prevent suggesting completions that duplicate existing lines
  private preventDuplicateLines(): this {
    for (
      let nextLineIndex = this.cursorPosition.lineNumber + 1;
      nextLineIndex < this.cursorPosition.lineNumber + 3 &&
      nextLineIndex < this.lineCount;
      nextLineIndex++
    ) {
      const line = this.model.getLineContent(nextLineIndex);
      if (this.normalise(line) === this.normalise(this.originalCompletion)) {
        this.formattedCompletion = '';
        return this;
      }
    }
    return this;
  }

  // Remove any trailing line breaks
  public removeInvalidLineBreaks(): this {
    this.formattedCompletion = this.formattedCompletion.trimEnd();
    return this;
  }

  // Remove leading whitespace that would push the completion past the cursor position
  private trimStart(): this {
    const firstNonSpaceIndex = this.formattedCompletion.search(/\S/);
    if (firstNonSpaceIndex > this.cursorPosition.column - 1) {
      this.formattedCompletion =
        this.formattedCompletion.slice(firstNonSpaceIndex);
    }
    return this;
  }

  // Apply all formatting rules to the completion
  public format(completion: string): string {
    this.originalCompletion = completion;
    this.formattedCompletion = completion;

    this.ignoreBlankLines()
      .removeDuplicatesFromStartOfCompletion()
      .preventDuplicateLines()
      .removeInvalidLineBreaks()
      .trimStart();

    return this.formattedCompletion;
  }
}
