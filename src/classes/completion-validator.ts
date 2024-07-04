import {CONTEXTUAL_FILTER_ACCEPT_THRESHOLD} from '../constants';
import {getContextualFilterScore} from '../helpers';
import {EditorModel, EditorPosition} from '../types';
import {
  getCodeBeforeAndAfterCursor,
  isAfterCursorWhitespace,
  isCharAfterCursor,
  isCursorAtStartWithCodeAround,
  isLastCompletionTooRecent,
} from '../utils/completion';

export class CompletionValidator {
  private cursorPosition: EditorPosition;
  private model: EditorModel;
  private language: string;
  private lastCompletionTime: number;

  /**
   * Initializes the validator with the current cursor position, editor model,
   * and timestamps of the last completion.
   */
  constructor(
    cursorPosition: EditorPosition,
    model: EditorModel,
    language: string,
    lastCompletionTime: number,
  ) {
    this.cursorPosition = cursorPosition;
    this.model = model;
    this.language = language;
    this.lastCompletionTime = lastCompletionTime;
  }

  /**
   * Calculates the contextual score for the current editor state to determine if completions should be provided.
   */
  public calculateContextualScore(
    cursorPosition: EditorPosition,
    model: EditorModel,
    language: string,
  ): number {
    const {codeBeforeCursor} = getCodeBeforeAndAfterCursor(
      cursorPosition,
      model,
    );
    const afterCursorWhitespace = isAfterCursorWhitespace(
      cursorPosition,
      model,
    );
    const documentLength = model.getValueLength();
    const promptEndPos = model.getOffsetAt(cursorPosition);

    return getContextualFilterScore({
      properties: {
        afterCursorWhitespace: String(afterCursorWhitespace),
        languageId: language,
      },
      measurements: {
        documentLength,
        promptEndPos,
      },
      prefix: codeBeforeCursor,
    });
  }

  /**
   * Determines whether code completions should be provided based on various conditions.
   * @returns {boolean} - True if completions should be provided, false otherwise.
   */
  public shouldProvideCompletions(): boolean {
    const currentTime = Date.now();

    return (
      this.calculateContextualScore(
        this.cursorPosition,
        this.model,
        this.language,
      ) > CONTEXTUAL_FILTER_ACCEPT_THRESHOLD &&
      //
      !isCharAfterCursor(this.cursorPosition, this.model) &&
      //
      !isCursorAtStartWithCodeAround(this.cursorPosition, this.model) &&
      //
      !isLastCompletionTooRecent(this.lastCompletionTime, currentTime)
    );
  }
}
