import {DEFAULT_COMPLETION_MODEL} from '../constants/completion';
import {CompletionModelType} from '../types/completion';

/**
 * Configuration class to store the following:
 * `endpoint`: The API endpoint to fetch the completion item that is provided by the user.
 * `model`: The LLM model to use for completion.
 * `provider`: The provider of the LLM model.
 */
class Config {
  private static endpoint: string | undefined;
  private static model: CompletionModelType = DEFAULT_COMPLETION_MODEL;

  public static getEndpoint(): string | undefined {
    return this.endpoint;
  }

  public static setEndpoint(value: string | undefined): void {
    this.endpoint = value;
  }

  public static getModel(): CompletionModelType {
    return this.model;
  }

  public static setModel(value: CompletionModelType): void {
    this.model = value;
  }
}

export default Config;
