import {
  CHAT_COMPLETION_ENDPOINT_BY_PROVIDER,
  COMPLETION_MODEL_IDS,
  DEFAULT_COMPLETION_TEMPERATURE,
} from '../constants';
import {MAX_TOKENS_BY_ANTHROPIC_MODEL} from '../constants/provider/anthropic';
import {
  AnthropicModel,
  ChatCompletion,
  CompletionModel,
  CompletionProvider,
  CompletionResponse,
  PickChatCompletionCreateParams,
  ProviderHandler,
} from '../types';

const openaiHandler: ProviderHandler<'openai'> = {
  createRequestBody: (model, prompt) => {
    const isO1Model = model === 'o1-preview' || model === 'o1-mini';
    const messages = isO1Model
      ? [{role: 'user' as const, content: prompt.user}]
      : [
          {role: 'system' as const, content: prompt.system},
          {role: 'user' as const, content: prompt.user},
        ];

    return {
      model: getModelId(model),
      temperature: DEFAULT_COMPLETION_TEMPERATURE,
      messages,
    };
  },

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }),

  parseCompletion: completion => {
    if (!completion.choices?.length) {
      return {
        completion: null,
        error: 'No completion found in the OpenAI response',
      };
    }
    return {completion: completion.choices[0].message.content};
  },
};

const groqHandler: ProviderHandler<'groq'> = {
  createRequestBody: (model, prompt) => ({
    model: getModelId(model),
    temperature: DEFAULT_COMPLETION_TEMPERATURE,
    messages: [
      {role: 'system' as const, content: prompt.system},
      {role: 'user' as const, content: prompt.user},
    ],
  }),

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }),

  parseCompletion: completion => {
    if (!completion.choices?.length) {
      return {
        completion: null,
        error: 'No completion found in the Groq response',
      };
    }
    return {completion: completion.choices[0].message.content};
  },
};

const anthropicHandler: ProviderHandler<'anthropic'> = {
  createRequestBody: (model, prompt) => ({
    model: getModelId(model),
    temperature: DEFAULT_COMPLETION_TEMPERATURE,
    system: prompt.system,
    messages: [{role: 'user' as const, content: prompt.user}],
    max_tokens: computeAnthropicMaxTokens(model as AnthropicModel),
  }),

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
  }),

  parseCompletion: completion => {
    if (!completion.content) {
      return {
        completion: null,
        error: 'No completion found in the Anthropic response',
      };
    }
    if (typeof completion.content !== 'string') {
      return {
        completion: null,
        error: 'Completion content is not a string',
      };
    }
    return {completion: completion.content};
  },
};

const providerHandlers: Record<
  CompletionProvider,
  ProviderHandler<CompletionProvider>
> = {
  openai: openaiHandler,
  groq: groqHandler,
  anthropic: anthropicHandler,
};

/**
 * Creates a request body for different completion providers.
 */
export const createRequestBody = (
  model: CompletionModel,
  provider: CompletionProvider,
  prompt: {system: string; user: string},
): PickChatCompletionCreateParams<CompletionProvider> => {
  const handler = providerHandlers[provider];
  if (!handler) {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  return handler.createRequestBody(model, prompt);
};

/**
 * Creates headers for different completion providers.
 */
export const createProviderHeaders = (
  apiKey: string,
  provider: CompletionProvider,
): Record<string, string> => {
  const handler = providerHandlers[provider];
  if (!handler) {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  return handler.createHeaders(apiKey);
};

/**
 * Parses the completion response from different providers.
 */
export const parseProviderChatCompletion = (
  completion: ChatCompletion,
  provider: CompletionProvider,
): CompletionResponse => {
  const handler = providerHandlers[provider];
  if (!handler) {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  return handler.parseCompletion(completion);
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
