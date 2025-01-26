import {
  DEFAULT_COMPLETION_MAX_TOKENS,
  DEFAULT_COMPLETION_TEMPERATURE,
} from '../../constants/completion';
import {PromptData} from '../../types';
import {MODEL_IDS, PROVIDER_ENDPOINT_MAP} from '../base';
import {BaseProviderHandler} from '../handler';
import {
  PickChatCompletion,
  PickChatCompletionCreateParams,
  PickModel,
} from '../types';

export class GroqHandler extends BaseProviderHandler<'groq'> {
  createEndpoint(): string {
    return PROVIDER_ENDPOINT_MAP.groq;
  }

  createRequestBody(
    model: PickModel<'groq'>,
    prompt: PromptData,
  ): PickChatCompletionCreateParams<'groq'> {
    return {
      model: MODEL_IDS[model],
      temperature: DEFAULT_COMPLETION_TEMPERATURE,
      max_tokens: DEFAULT_COMPLETION_MAX_TOKENS,
      messages: [
        {role: 'system', content: prompt.system},
        {role: 'user', content: prompt.user},
      ],
    };
  }

  createHeaders(apiKey: string): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
  }

  parseCompletion(completion: PickChatCompletion<'groq'>): string | null {
    return completion.choices?.[0]?.message.content ?? null;
  }
}
