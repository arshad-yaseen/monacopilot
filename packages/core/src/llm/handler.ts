import type {PromptData} from '../types/copilot';
import type {
    Model,
    PickChatCompletion,
    PickChatCompletionCreateParams,
    PickModel,
    Provider,
} from '../types/llm';

export abstract class BaseProviderHandler<P extends Provider> {
    abstract createEndpoint(model: Model, apiKey?: string): string;

    abstract createRequestBody(
        model: PickModel<P>,
        prompt: PromptData,
    ): PickChatCompletionCreateParams<P>;

    abstract createHeaders(apiKey: string): Record<string, string>;

    abstract parseCompletion(completion: PickChatCompletion<P>): string | null;
}
