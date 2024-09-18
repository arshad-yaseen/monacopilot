import {
  CopilotProvider,
  PickChatCompletion,
  PickChatCompletionCreateParams,
  PickCopilotModel,
  PromptData,
} from './copilot';

export interface ProviderHandler<T extends CopilotProvider> {
  createRequestBody(
    model: PickCopilotModel<T>,
    prompt: PromptData,
  ): PickChatCompletionCreateParams<T>;

  createHeaders(apiKey: string): Record<string, string>;

  parseCompletion(completion: PickChatCompletion<T>): string | null;
}
