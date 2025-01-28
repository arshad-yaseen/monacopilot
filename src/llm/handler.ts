import {CompletionMetadata, PromptData} from '../types';
import {
  Model,
  PickChatCompletion,
  PickChatCompletionCreateParams,
  PickModel,
  Provider,
} from './types';

export abstract class BaseProviderHandler<P extends Provider> {
  abstract createEndpoint(model: Model, apiKey?: string): string;

  abstract createRequestBody(
    model: PickModel<P>,
    prompt: PromptData,
    completionMetadata: CompletionMetadata,
  ): PickChatCompletionCreateParams<P>;

  abstract createHeaders(apiKey: string): Record<string, string>;

  abstract parseCompletion(completion: PickChatCompletion<P>): string | null;
}
