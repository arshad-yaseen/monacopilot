import {
  CompletionProvider,
  CompletionResponse,
  PickChatCompletion,
  PickChatCompletionCreateParams,
  PickCompletionModel,
  PromptData,
} from './completion';

export interface ProviderHandler<T extends CompletionProvider> {
  createRequestBody(
    model: PickCompletionModel<T>,
    prompt: PromptData,
  ): PickChatCompletionCreateParams<T>;

  createHeaders(apiKey: string): Record<string, string>;

  parseCompletion(completion: PickChatCompletion<T>): CompletionResponse;
}
