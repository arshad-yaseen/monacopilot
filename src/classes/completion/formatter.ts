import {CLOSING_BRACKETS, OPENING_BRACKETS} from '../../constants';
import {Bracket, EditorModel, EditorPosition} from '../../types';
import {getLineCount, getTextBeforeCursor} from '../../utils';

export class CompletionFormatter {
  private formattedCompletion = '';
  private originalCompletion = '';
  private model: EditorModel;
  private cursorPosition: EditorPosition;
  private lineCount: number;

  constructor(model: EditorModel, position: EditorPosition) {
    this.model = model;
    this.cursorPosition = position;
    this.lineCount = getLineCount(model);
  }

  // Check if the open and close brackets are a matching pair
  private isMatchingPair = (open?: Bracket, close?: string): boolean => {
    return (
      (open === '(' && close === ')') ||
      (open === '[' && close === ']') ||
      (open === '{' && close === '}')
    );
  };

  // Match the completion brackets to ensure they are balanced
  private matchCompletionBrackets = (): CompletionFormatter => {
    let accumulatedCompletion = '';
    const openBrackets: Bracket[] = [];
    for (const character of this.originalCompletion) {
      if (OPENING_BRACKETS.includes(character)) {
        openBrackets.push(character);
      }

      if (CLOSING_BRACKETS.includes(character)) {
        if (
          openBrackets.length &&
          this.isMatchingPair(openBrackets[openBrackets.length - 1], character)
        ) {
          openBrackets.pop();
        } else {
          break;
        }
      }
      accumulatedCompletion += character;
    }

    // If the brackets are not balanced, return the original completion, otherwise return the matched completion
    this.formattedCompletion =
      accumulatedCompletion.trimEnd() || this.originalCompletion.trimEnd();

    return this;
  };

  private ignoreBlankLines = (): CompletionFormatter => {
    // If the completion is a blank line, return an empty string
    if (
      this.formattedCompletion.trimStart() === '' &&
      this.originalCompletion !== '\n'
    ) {
      this.formattedCompletion = this.formattedCompletion.trim();
    }
    return this;
  };

  // Remove leading and trailing whitespace from the text
  private normalise = (text: string) => text?.trim();

  private removeDuplicateStartOfSuggestions(): this {
    // Remove the text that is already present in the editor from the completion
    const before = getTextBeforeCursor(this.cursorPosition, this.model).trim();

    const completion = this.normalise(this.formattedCompletion);

    const maxLength = Math.min(completion.length, before.length);
    let overlapLength = 0;

    for (let length = 1; length <= maxLength; length++) {
      const endOfBefore = before.substring(before.length - length);
      const startOfCompletion = completion.substring(0, length);
      if (endOfBefore === startOfCompletion) {
        overlapLength = length;
      }
    }

    // Remove the overlapping part from the start of completion
    if (overlapLength > 0) {
      this.formattedCompletion =
        this.formattedCompletion.substring(overlapLength);
    }

    return this;
  }

  // Remove duplicate lines that are already present in the editor
  private preventDuplicateLines = (): CompletionFormatter => {
    let nextLineIndex = this.cursorPosition.lineNumber + 1;
    while (
      nextLineIndex < this.cursorPosition.lineNumber + 3 &&
      nextLineIndex < this.lineCount
    ) {
      const line = this.model.getLineContent(nextLineIndex);
      if (this.normalise(line) === this.normalise(this.originalCompletion)) {
        this.formattedCompletion = '';
        return this;
      }
      nextLineIndex++;
    }
    return this;
  };

  // Remove newlines after spaces or newlines
  public removeInvalidLineBreaks = (): CompletionFormatter => {
    if (this.formattedCompletion.endsWith('\n')) {
      this.formattedCompletion = this.formattedCompletion.trimEnd();
    }
    return this;
  };

  private trimStart = () => {
    const firstNonSpaceIndex = this.formattedCompletion.search(/\S/);

    /* If the first non-space character is in front of the cursor, remove it */
    if (firstNonSpaceIndex > this.cursorPosition.column - 1) {
      this.formattedCompletion =
        this.formattedCompletion.substring(firstNonSpaceIndex);
    }

    return this;
  };

  public format = (completion: string): string => {
    this.formattedCompletion = '';
    this.originalCompletion = completion;

    this.matchCompletionBrackets()
      .ignoreBlankLines()
      .removeDuplicateStartOfSuggestions()
      .preventDuplicateLines()
      .removeInvalidLineBreaks()
      .trimStart();

    return this.formattedCompletion;
  };
}
