import {
  CHAT_COMPLETION_ENDPOINT_BY_PROVIDER,
  COMPLETION_MODEL_IDS,
  DEFAULT_COMPLETION_TEMPERATURE,
} from '../constants';
import {MAX_TOKENS_BY_ANTHROPIC_MODEL} from '../constants/provider/anthropic';
import {
  AnthropicModel,
  ChatCompletion,
  CompletionMetadata,
  CompletionModel,
  CompletionProvider,
  CompletionResponse,
  CustomPrompt,
  PickChatCompletion,
  PickChatCompletionCreateParams,
} from '../types';
import generatePrompt from './prompt';

/**
 * Creates a request body for different completion providers.
 */
export const createRequestBody = (
  completionMetadata: CompletionMetadata,
  model: CompletionModel,
  provider: CompletionProvider,
  customPrompt?: CustomPrompt,
): PickChatCompletionCreateParams<CompletionProvider> => {
  const {system: systemPrompt, user: userPrompt} = {
    ...generatePrompt(completionMetadata),
    ...customPrompt?.(completionMetadata),
  };

  const commonParams = {
    model: getModelId(model),
    temperature: DEFAULT_COMPLETION_TEMPERATURE,
  };

  const isO1Model = model === 'o1-preview' || model === 'o1-mini';

  const messages = isO1Model
    ? // OpenAI o1 series models do not support system messages
      [{role: 'user', content: userPrompt}]
    : [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: userPrompt},
      ];

  const providerParams = {
    openai: {messages},
    groq: {messages},
    anthropic: {
      system: systemPrompt,
      messages: [{role: 'user', content: userPrompt}],
      max_tokens: computeAnthropicMaxTokens(model as AnthropicModel),
    },
  };

  return {
    ...commonParams,
    ...providerParams[provider],
  } as PickChatCompletionCreateParams<CompletionProvider>;
};

/**
 * Creates headers for different completion providers.
 */
export const createProviderHeaders = (
  apiKey: string,
  provider: CompletionProvider,
): Record<string, string> => {
  const commonHeaders = {
    'Content-Type': 'application/json',
  };

  const providerHeaders = {
    openai: {Authorization: `Bearer ${apiKey}`},
    groq: {Authorization: `Bearer ${apiKey}`},
    anthropic: {'x-api-key': apiKey, 'anthropic-version': '2023-06-01'},
  };

  return {...commonHeaders, ...providerHeaders[provider]};
};

/**
 * Parses the completion response from different providers.
 */
export const parseProviderChatCompletion = (
  completion: ChatCompletion,
  provider: CompletionProvider,
): CompletionResponse => {
  const handlers: Record<
    CompletionProvider,
    (comp: any) => CompletionResponse
  > = {
    openai: parseOpenAICompletion,
    groq: parseGroqCompletion,
    anthropic: parseAnthropicCompletion,
  };

  const handler = handlers[provider];
  if (!handler) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  return handler(completion as PickChatCompletion<typeof provider>);
};

export const parseOpenAICompletion = (
  completion: PickChatCompletion<'openai'>,
): CompletionResponse => {
  if (!completion.choices?.length) {
    return {
      completion: null,
      error: 'No completion found in the openai response',
    };
  }
  return {completion: completion.choices[0].message.content};
};

export const parseGroqCompletion = (
  completion: PickChatCompletion<'groq'>,
): CompletionResponse => {
  if (!completion.choices?.length) {
    return {
      completion: null,
      error: 'No completion found in the groq response',
    };
  }
  return {completion: completion.choices[0].message.content};
};

export const parseAnthropicCompletion = (
  completion: PickChatCompletion<'anthropic'>,
): CompletionResponse => {
  if (!completion.content) {
    return {
      completion: null,
      error: 'No completion found in the anthropic response',
    };
  }
  if (typeof completion.content !== 'string') {
    return {completion: null, error: 'Completion content is not a string'};
  }
  return {completion: completion.content};
};

/**
 * Gets the model ID for a given completion model name to be used in the API request.
 */
const getModelId = (model: CompletionModel): string =>
  COMPLETION_MODEL_IDS[model];

/**
 * Gets the chat completion endpoint for a given provider.
 */
export const getProviderCompletionEndpoint = (
  provider: CompletionProvider,
): string => CHAT_COMPLETION_ENDPOINT_BY_PROVIDER[provider];

/**
 * Computes the maximum number of tokens for Anthropic models.
 */
const computeAnthropicMaxTokens = (model: AnthropicModel): number =>
  MAX_TOKENS_BY_ANTHROPIC_MODEL[model] || 4096;
