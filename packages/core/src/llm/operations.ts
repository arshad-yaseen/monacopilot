import type { PromptData } from "../types/copilot";
import type {
    Completion,
    CompletionCreateParams,
    PickModel,
    Provider,
} from "../types/llm";
import type { BaseCopilotMetadata } from "../types/metadata";
import type { BaseProviderHandler } from "./handler";
import { MistralHandler } from "./providers/mistral";

const providerHandlers: { [P in Provider]: BaseProviderHandler<P> } = {
    mistral: new MistralHandler(),
};

export const createProviderEndpoint = <P extends Provider>(
    model: PickModel<P>,
    apiKey: string,
    provider: P,
): string => providerHandlers[provider].createEndpoint(model, apiKey);

export const createRequestBody = <P extends Provider>(
    model: PickModel<P>,
    provider: P,
    prompt: PromptData,
    metadata: BaseCopilotMetadata,
): CompletionCreateParams =>
    providerHandlers[provider].createRequestBody(model, prompt, metadata);

export const createProviderHeaders = <P extends Provider>(
    apiKey: string,
    provider: P,
): Record<string, string> => providerHandlers[provider].createHeaders(apiKey);

export const parseProviderCompletion = <P extends Provider>(
    completion: Completion,
    provider: P,
): string | null => providerHandlers[provider].parseCompletion(completion);
