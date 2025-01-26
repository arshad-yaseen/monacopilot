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

export class GoogleHandler extends BaseProviderHandler<'google'> {
  createEndpoint(model: PickModel<'google'>, apiKey: string): string {
    return `${PROVIDER_ENDPOINT_MAP.google}/${MODEL_IDS[model]}:generateContent?key=${apiKey}`;
  }

  createRequestBody(
    _: PickModel<'google'>,
    prompt: PromptData,
  ): PickChatCompletionCreateParams<'google'> {
    return {
      systemInstruction: prompt.system,
      generationConfig: {
        temperature: DEFAULT_COMPLETION_TEMPERATURE,
        maxOutputTokens: DEFAULT_COMPLETION_MAX_TOKENS,
      },
      contents: [
        {
          role: 'user',
          parts: [{text: prompt.user}],
        },
      ],
    };
  }

  createHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
    };
  }

  parseCompletion(completion: PickChatCompletion<'google'>): string | null {
    return completion.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  }
}
