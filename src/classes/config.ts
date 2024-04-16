import {
  COMPLETION_PROVIDER_OF_,
  DEFAULT_COMPLETION_MODEL,
} from '../constants/completion';
import {CompletionModelType, CompletionProviderType} from '../types/completion';

class Config {
  private static endpoint: string | undefined;
  private static model: CompletionModelType = DEFAULT_COMPLETION_MODEL;

  public static getEndpoint(): string | undefined {
    return Config.endpoint;
  }

  public static setEndpoint(value: string): void {
    Config.endpoint = value;
  }

  public static getModel(): CompletionModelType {
    return Config.model;
  }

  public static setModel(value: CompletionModelType): void {
    Config.model = value;
  }

  public static getProvider(): CompletionProviderType {
    return COMPLETION_PROVIDER_OF_[Config.model];
  }
}

export default Config;
