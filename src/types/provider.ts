import {
  CopilotProvider,
  PickChatCompletion,
  PickChatCompletionCreateParams,
  PickCopilotModel,
  PromptData,
} from './copilot';

export interface ProviderHandler<T extends CopilotProvider> {
  createEndpoint(
    endpoint: string | undefined,
    model: PickCopilotModel<T>,
    apiKey: string,
  ): string;
  createRequestBody(
    model: PickCopilotModel<T>,
    prompt: PromptData,
  ): PickChatCompletionCreateParams<T>;
  createHeaders(apiKey: string): Record<string, string>;
  parseCompletion(completion: PickChatCompletion<T>): string | null;
}
