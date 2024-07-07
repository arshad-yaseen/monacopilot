import {EditorModel, EditorPosition} from '../../types';
import {
  isCharAfterCursor,
  isCursorAtStartWithTextAround,
} from '../../utils/completion';

export class CompletionValidator {
  private cursorPosition: EditorPosition;
  private model: EditorModel;

  /**
   * Initializes the validator with the current cursor position, editor model,
   * and timestamps of the last completion.
   * @param cursorPosition - The current cursor position.
   * @param model - The editor model.
   * @param language - The language of the editor.
   */
  constructor(cursorPosition: EditorPosition, model: EditorModel) {
    this.cursorPosition = cursorPosition;
    this.model = model;
  }

  /**
   * Determines whether completions should be provided based on various conditions.
   * @returns {boolean} - True if completions should be provided, false otherwise.
   */
  public shouldProvideCompletions(): boolean {
    return (
      !isCharAfterCursor(this.cursorPosition, this.model) &&
      //
      !isCursorAtStartWithTextAround(this.cursorPosition, this.model)
    );
  }
}
