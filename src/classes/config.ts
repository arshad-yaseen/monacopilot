import {DEFAULT_COMPLETION_MODEL} from '../constants/completion';
import type {CompletionModel} from '../types/completion';

/**
 * Configuration class to store the following:
 * `model`: The LLM model to use for completion.
 */
class Config {
  private static model: CompletionModel = DEFAULT_COMPLETION_MODEL;

  public static getModel(): CompletionModel {
    return this.model;
  }

  public static setModel(value: CompletionModel): void {
    this.model = value;
  }
}

export default Config;
