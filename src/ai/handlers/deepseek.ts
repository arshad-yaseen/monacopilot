import {
  DEFAULT_COMPLETION_MAX_TOKENS,
  DEFAULT_COMPLETION_TEMPERATURE,
} from '../../constants/completion';
import {CompletionMetadata, PromptData} from '../../types';
import {MODEL_IDS, PROVIDER_ENDPOINT_MAP} from '../base';
import {BaseProviderHandler} from '../handler';
import {
  PickChatCompletion,
  PickChatCompletionCreateParams,
  PickModel,
} from '../types';

export class DeepseekHandler extends BaseProviderHandler<'deepseek'> {
  createEndpoint(): string {
    return PROVIDER_ENDPOINT_MAP.deepseek;
  }

  createRequestBody(
    model: PickModel<'deepseek'>,
    _: PromptData,
    completionMetadata: CompletionMetadata,
  ): PickChatCompletionCreateParams<'deepseek'> {
    return {
      model: MODEL_IDS[model],
      prompt: completionMetadata.textBeforeCursor,
      suffix: completionMetadata.textAfterCursor,
      temperature: DEFAULT_COMPLETION_TEMPERATURE,
      max_tokens: DEFAULT_COMPLETION_MAX_TOKENS,
    };
  }

  createHeaders(apiKey: string): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
  }

  parseCompletion(completion: PickChatCompletion<'deepseek'>): string | null {
    return typeof completion.choices?.[0]?.text === 'string'
      ? completion.choices[0].text
      : null;
  }
}
