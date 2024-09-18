import {
  COPILOT_MODEL_IDS,
  COPILOT_PROVIDER_ENDPOINT_MAP,
  DEFAULT_COPILOT_TEMPERATURE,
} from '../constants';
import {MAX_TOKENS_BY_ANTHROPIC_MODEL} from '../constants/provider/anthropic';
import {
  AnthropicModel,
  ChatCompletion,
  CopilotModel,
  CopilotProvider,
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
      temperature: DEFAULT_COPILOT_TEMPERATURE,
      messages,
    };
  },

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }),

  parseCompletion: completion => {
    if (!completion.choices?.length) {
      return null;
    }

    return completion.choices[0].message.content;
  },
};

const groqHandler: ProviderHandler<'groq'> = {
  createRequestBody: (model, prompt) => ({
    model: getModelId(model),
    temperature: DEFAULT_COPILOT_TEMPERATURE,
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
      return null;
    }
    return completion.choices[0].message.content;
  },
};

const anthropicHandler: ProviderHandler<'anthropic'> = {
  createRequestBody: (model, prompt) => ({
    model: getModelId(model),
    temperature: DEFAULT_COPILOT_TEMPERATURE,
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
    if (!completion.content || typeof completion.content !== 'string') {
      return null;
    }
    return completion.content;
  },
};

const providerHandlers: Record<
  CopilotProvider,
  ProviderHandler<CopilotProvider>
> = {
  openai: openaiHandler,
  groq: groqHandler,
  anthropic: anthropicHandler,
};

/**
 * Creates a request body for different copilot providers.
 */
export const createRequestBody = (
  model: CopilotModel,
  provider: CopilotProvider,
  prompt: {system: string; user: string},
): PickChatCompletionCreateParams<CopilotProvider> => {
  const handler = providerHandlers[provider];
  return handler.createRequestBody(model, prompt);
};

/**
 * Creates headers for different copilot providers.
 */
export const createProviderHeaders = (
  apiKey: string,
  provider: CopilotProvider,
): Record<string, string> => {
  const handler = providerHandlers[provider];
  return handler.createHeaders(apiKey);
};

/**
 * Parses the chat completion response from different providers.
 */
export const parseProviderChatCompletion = (
  completion: ChatCompletion,
  provider: CopilotProvider,
): string | null => {
  const handler = providerHandlers[provider];
  return handler.parseCompletion(completion);
};

/**
 * Gets the model ID for a given copilot model name to be used in the API request.
 */
const getModelId = (model: CopilotModel): string => COPILOT_MODEL_IDS[model];

/**
 * Gets the copilot endpoint for a given provider.
 */
export const getCopilotProviderEndpoint = (provider: CopilotProvider): string =>
  COPILOT_PROVIDER_ENDPOINT_MAP[provider];

/**
 * Computes the maximum number of tokens for Anthropic models.
 */
const computeAnthropicMaxTokens = (model: AnthropicModel): number =>
  MAX_TOKENS_BY_ANTHROPIC_MODEL[model] || 4096;
