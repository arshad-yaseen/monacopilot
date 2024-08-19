import {EditorModel, EditorPosition} from '../types';
import {getTextBeforeCursor} from '../utils';

/**
 * This class is responsible for formatting code completions
 * to ensure that they are displayed correctly in the editor.
 */
export class CompletionFormatter {
  private readonly model: Readonly<EditorModel>;
  private readonly cursorPosition: Readonly<EditorPosition>;
  private originalCompletion: string = '';
  private formattedCompletion: string = '';

  private constructor(
    model: Readonly<EditorModel>,
    position: Readonly<EditorPosition>,
  ) {
    this.model = model;
    this.cursorPosition = position;
  }

  public static create(
    model: Readonly<EditorModel>,
    position: Readonly<EditorPosition>,
  ): CompletionFormatter {
    return new CompletionFormatter(model, position);
  }

  public setCompletion(completion: string): CompletionFormatter {
    this.originalCompletion = completion;
    this.formattedCompletion = completion;
    return this;
  }

  public ignoreBlankLines(): CompletionFormatter {
    if (
      this.formattedCompletion.trimStart() === '' &&
      this.originalCompletion !== '\n'
    ) {
      this.formattedCompletion = this.formattedCompletion.trim();
    }
    return this;
  }

  private normalise(text: string): string {
    return text?.trim() ?? '';
  }

  public removeDuplicatesFromStartOfCompletion(): CompletionFormatter {
    const before = getTextBeforeCursor(this.cursorPosition, this.model).trim();
    const completion = this.normalise(this.formattedCompletion);

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

    if (startOverlapLength > 0) {
      this.formattedCompletion =
        this.formattedCompletion.slice(startOverlapLength);
    }

    return this;
  }

  public preventDuplicateLines(): CompletionFormatter {
    for (
      let nextLineIndex = this.cursorPosition.lineNumber + 1;
      nextLineIndex < this.cursorPosition.lineNumber + 3 &&
      nextLineIndex < this.model.getLineCount();
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

  public removeInvalidLineBreaks(): CompletionFormatter {
    this.formattedCompletion = this.formattedCompletion.trimEnd();
    return this;
  }

  public removeMarkdownCodeSyntax(): CompletionFormatter {
    const markdownCodeRegex = /^```[\s\S]*?\n([\s\S]*?)\n```$/;
    const match = this.formattedCompletion.match(markdownCodeRegex);

    if (match) {
      this.formattedCompletion = match[1].trim();
    }

    return this;
  }

  public trimStart(): CompletionFormatter {
    const firstNonSpaceIndex = this.formattedCompletion.search(/\S/);
    if (firstNonSpaceIndex > this.cursorPosition.column - 1) {
      this.formattedCompletion =
        this.formattedCompletion.slice(firstNonSpaceIndex);
    }
    return this;
  }

  public build(): string {
    return this.formattedCompletion;
  }
}
