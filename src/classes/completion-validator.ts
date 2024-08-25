import {CursorPosition, EditorModel} from '../types';
import {
  isCursorAtStartWithTextAround,
  isNonPunctuationCharAfterCursor,
} from '../utils';

export class CompletionValidator {
  private cursorPosition: CursorPosition;
  private model: EditorModel;

  /**
   * Initializes the validator with the current cursor position, editor model, and language.
   * @param cursorPosition - The current cursor position.
   * @param model - The editor model.
   * @param language - The language of the editor.
   */
  constructor(cursorPosition: CursorPosition, model: EditorModel) {
    this.cursorPosition = cursorPosition;
    this.model = model;
  }

  /**
   * Determines whether completions should be provided based on various conditions.
   * @returns {boolean} - True if completions should be provided, false otherwise.
   */
  public shouldProvideCompletions(): boolean {
    return (
      !isNonPunctuationCharAfterCursor(this.cursorPosition, this.model) &&
      //
      !isCursorAtStartWithTextAround(this.cursorPosition, this.model)
    );
  }
}
