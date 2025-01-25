import {COPILOT_MODEL_IDS, COPILOT_PROVIDER_ENDPOINT_MAP} from '../constants';
import {
  DEFAULT_COMPLETION_MAX_TOKENS,
  DEFAULT_COMPLETION_TEMPERATURE,
} from '../constants/completion';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  CompletionMetadata,
  CopilotModel,
  CopilotProvider,
  PickChatCompletion,
  PickCopilotModel,
  PromptData,
  ProviderHandler,
} from '../types';

/* OpenAI Handler */
const openaiHandler: ProviderHandler<'openai'> = {
  createEndpoint: () => COPILOT_PROVIDER_ENDPOINT_MAP.openai,

  createRequestBody: (model, prompt) => {
    const isO1Model = model === 'o1-mini';
    return {
      model: getModelId(model),
      ...(!isO1Model && {temperature: DEFAULT_COMPLETION_TEMPERATURE}),
      max_completion_tokens: DEFAULT_COMPLETION_MAX_TOKENS,
      messages: [
        {role: 'system', content: prompt.system},
        {role: 'user', content: prompt.user},
      ],
    };
  },

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }),

  parseCompletion: completion =>
    completion.choices?.[0]?.message.content ?? null,
};

/* Groq Handler */
const groqHandler: ProviderHandler<'groq'> = {
  createEndpoint: () => COPILOT_PROVIDER_ENDPOINT_MAP.groq,

  createRequestBody: (model, prompt) => ({
    model: getModelId(model),
    temperature: DEFAULT_COMPLETION_TEMPERATURE,
    max_tokens: DEFAULT_COMPLETION_MAX_TOKENS,
    messages: [
      {role: 'system', content: prompt.system},
      {role: 'user', content: prompt.user},
    ],
  }),

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }),

  parseCompletion: completion =>
    completion.choices?.[0]?.message.content ?? null,
};

/* Anthropic Handler */
const anthropicHandler: ProviderHandler<'anthropic'> = {
  createEndpoint: () => COPILOT_PROVIDER_ENDPOINT_MAP.anthropic,

  createRequestBody: (model, prompt) => ({
    model: getModelId(model),
    temperature: DEFAULT_COMPLETION_TEMPERATURE,
    system: prompt.system,
    messages: [{role: 'user', content: prompt.user}],
    max_tokens: DEFAULT_COMPLETION_MAX_TOKENS,
  }),

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
  }),

  parseCompletion: completion => {
    const c = completion.content?.[0];
    if (c && 'text' in c) {
      return c.text;
    }
    return null;
  },
};

/* Google Handler */
const googleHandler: ProviderHandler<'google'> = {
  createEndpoint: (model, apiKey) =>
    `${COPILOT_PROVIDER_ENDPOINT_MAP.google}/${model}:generateContent?key=${apiKey}`,

  createRequestBody: (model, prompt) => ({
    model: getModelId(model),
    system_instruction: {parts: [{text: prompt.system}]},
    generationConfig: {
      temperature: DEFAULT_COMPLETION_TEMPERATURE,
      maxOutputTokens: DEFAULT_COMPLETION_MAX_TOKENS,
    },
    contents: [{parts: [{text: prompt.user}]}],
  }),

  createHeaders: () => ({
    'Content-Type': 'application/json',
  }),

  parseCompletion: completion =>
    completion.candidates?.[0]?.content?.parts?.[0]?.text ?? null,
};

/* DeepSeek Handler */
const deepseekHandler: ProviderHandler<'deepseek'> = {
  createEndpoint: () => COPILOT_PROVIDER_ENDPOINT_MAP.deepseek,

  createRequestBody: (model, _, completionMetadata) => ({
    model: getModelId(model),
    prompt: completionMetadata.textBeforeCursor,
    suffix: completionMetadata.textAfterCursor,
    temperature: DEFAULT_COMPLETION_TEMPERATURE,
    max_tokens: DEFAULT_COMPLETION_MAX_TOKENS,
  }),

  createHeaders: apiKey => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }),

  parseCompletion: completion =>
    typeof completion.choices?.[0]?.text === 'string'
      ? completion.choices[0].text
      : null,
};

const providerHandlers: {[P in CopilotProvider]: ProviderHandler<P>} = {
  openai: openaiHandler,
  groq: groqHandler,
  anthropic: anthropicHandler,
  google: googleHandler,
  deepseek: deepseekHandler,
};

export const createProviderEndpoint = <P extends CopilotProvider>(
  model: PickCopilotModel<P>,
  apiKey: string,
  provider: P,
): string => providerHandlers[provider].createEndpoint(model, apiKey);

export const createRequestBody = <P extends CopilotProvider>(
  model: PickCopilotModel<P>,
  provider: P,
  prompt: PromptData,
  completionMetadata: CompletionMetadata,
): ChatCompletionCreateParams =>
  providerHandlers[provider].createRequestBody(
    model,
    prompt,
    completionMetadata,
  );

export const createProviderHeaders = <P extends CopilotProvider>(
  apiKey: string,
  provider: P,
): Record<string, string> => providerHandlers[provider].createHeaders(apiKey);

export const parseProviderChatCompletion = <P extends CopilotProvider>(
  completion: ChatCompletion,
  provider: P,
): string | null =>
  providerHandlers[provider].parseCompletion(
    completion as PickChatCompletion<P>,
  );

const getModelId = <M extends CopilotModel>(
  model: M,
): (typeof COPILOT_MODEL_IDS)[M] => COPILOT_MODEL_IDS[model];
