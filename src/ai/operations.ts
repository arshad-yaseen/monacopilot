import {CompletionMetadata, PromptData} from '../types';
import {BaseProviderHandler} from './handler';
import {AnthropicHandler} from './handlers/anthropic';
import {DeepseekHandler} from './handlers/deepseek';
import {GoogleHandler} from './handlers/google';
import {GroqHandler} from './handlers/groq';
import {OpenAIHandler} from './handlers/openai';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  PickModel,
  Provider,
} from './types';

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
  completionMetadata: CompletionMetadata,
): ChatCompletionCreateParams =>
  providerHandlers[provider].createRequestBody(
    model,
    prompt,
    completionMetadata,
  );

export const createProviderHeaders = <P extends Provider>(
  apiKey: string,
  provider: P,
): Record<string, string> => providerHandlers[provider].createHeaders(apiKey);

export const parseProviderChatCompletion = <P extends Provider>(
  completion: ChatCompletion,
  provider: P,
): string | null => providerHandlers[provider].parseCompletion(completion);
