import {
    DEFAULT_COPILOT_MAX_TOKENS,
    DEFAULT_COPILOT_TEMPERATURE,
} from '../../constants';
import type {PromptData} from '../../types/copilot';
import type {
    PickChatCompletion,
    PickChatCompletionCreateParams,
    PickModel,
} from '../../types/llm';
import {MODEL_IDS, PROVIDER_ENDPOINT_MAP} from '../base';
import {BaseProviderHandler} from '../handler';

export class DeepseekHandler extends BaseProviderHandler<'deepseek'> {
    createEndpoint(): string {
        return PROVIDER_ENDPOINT_MAP.deepseek;
    }

    createRequestBody(
        model: PickModel<'deepseek'>,
        prompt: PromptData,
    ): PickChatCompletionCreateParams<'deepseek'> {
        return {
            model: MODEL_IDS[model],
            prompt: `${prompt.system}\n\n${prompt.user}`,
            suffix: '',
            temperature: DEFAULT_COPILOT_TEMPERATURE,
            max_tokens: DEFAULT_COPILOT_MAX_TOKENS,
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
