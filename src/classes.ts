import {DEFAULT_COMPLETION_MODEL} from './constants';
import {CompletionModelType, CompletionProviderType} from './types';

/**
 * Handles the storage and retrieval of the completion model and associated key.
 */
export class CompletionModel {
  private static _provider: CompletionProviderType | undefined;
  private static _model: CompletionModelType | undefined;
  private static _apiKey: string | undefined;

  private constructor() {}

  public static init(
    provider?: CompletionProviderType,
    model?: CompletionModelType,
    apiKey?: string,
  ): void {
    CompletionModel._provider = provider;
    CompletionModel._model = model;
    CompletionModel._apiKey = apiKey;
  }

  public static get provider(): CompletionProviderType | undefined {
    return this._provider;
  }

  public static set provider(value: CompletionProviderType | undefined) {
    this._provider = value;
  }

  public static get model(): CompletionModelType {
    return this._model ?? DEFAULT_COMPLETION_MODEL;
  }

  public static set model(value: CompletionModelType | undefined) {
    this._model = value;
  }

  public static get apiKey(): string | undefined {
    return this._apiKey;
  }

  public static set apiKey(value: string | undefined) {
    this._apiKey = value;
  }
}
