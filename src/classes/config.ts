import {DEFAULT_COMPLETION_MODEL} from '../constants/completion';
import {CompletionModelType} from '../types/completion';

/**
 * Configuration class to store the following:
 * `model`: The LLM model to use for completion.
 */
class Config {
  private static model: CompletionModelType = DEFAULT_COMPLETION_MODEL;

  public static getModel(): CompletionModelType {
    return this.model;
  }

  public static setModel(value: CompletionModelType): void {
    this.model = value;
  }
}

export default Config;
