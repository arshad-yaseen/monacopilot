import type {PromptData} from '../types/copilot';
import type {
    ChatCompletion,
    ChatCompletionCreateParams,
    PickModel,
    Provider,
} from '../types/llm';
import {BaseProviderHandler} from './handler';
import {AnthropicHandler} from './providers/anthropic';
import {DeepseekHandler} from './providers/deepseek';
import {GoogleHandler} from './providers/google';
import {GroqHandler} from './providers/groq';
import {OpenAIHandler} from './providers/openai';

const providerHandlers: {[P in Provider]: BaseProviderHandler<P>} = {
    openai: new OpenAIHandler(),
    groq: new GroqHandler(),
    anthropic: new AnthropicHandler(),
    google: new GoogleHandler(),
    deepseek: new DeepseekHandler(),
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
): ChatCompletionCreateParams =>
    providerHandlers[provider].createRequestBody(model, prompt);

export const createProviderHeaders = <P extends Provider>(
    apiKey: string,
    provider: P,
): Record<string, string> => providerHandlers[provider].createHeaders(apiKey);

export const parseProviderChatCompletion = <P extends Provider>(
    completion: ChatCompletion,
    provider: P,
): string | null => providerHandlers[provider].parseCompletion(completion);
