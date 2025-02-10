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

export class AnthropicHandler extends BaseProviderHandler<'anthropic'> {
    createEndpoint(): string {
        return PROVIDER_ENDPOINT_MAP.anthropic;
    }

    createRequestBody(
        model: PickModel<'anthropic'>,
        prompt: PromptData,
    ): PickChatCompletionCreateParams<'anthropic'> {
        return {
            model: MODEL_IDS[model],
            temperature: DEFAULT_COPILOT_TEMPERATURE,
            system: prompt.system,
            messages: [{role: 'user', content: prompt.user}],
            max_tokens: DEFAULT_COPILOT_MAX_TOKENS,
        };
    }

    createHeaders(apiKey: string): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
        };
    }

    parseCompletion(
        completion: PickChatCompletion<'anthropic'>,
    ): string | null {
        const c = completion.content?.[0];
        if (c && 'text' in c) {
            return c.text;
        }
        return null;
    }
}
