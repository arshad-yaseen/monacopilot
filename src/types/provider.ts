import {CompletionMetadata} from './completion';
import {
  CopilotProvider,
  PickChatCompletion,
  PickChatCompletionCreateParams,
  PickCopilotModel,
  PromptData,
} from './copilot';

export interface ProviderHandler<P extends CopilotProvider> {
  createEndpoint(model: PickCopilotModel<P>, apiKey: string): string;
  createRequestBody(
    model: PickCopilotModel<P>,
    prompt: PromptData,
    completionMetadata: CompletionMetadata,
  ): PickChatCompletionCreateParams<P>;
  createHeaders(apiKey: string): Record<string, string>;
  parseCompletion(completion: PickChatCompletion<P>): string | null;
}
