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
            temperature: DEFAULT_COPILOT_TEMPERATURE,
            max_tokens: DEFAULT_COPILOT_MAX_TOKENS,
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
