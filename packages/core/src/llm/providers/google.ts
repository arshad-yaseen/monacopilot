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

export class GoogleHandler extends BaseProviderHandler<'google'> {
    createEndpoint(model: PickModel<'google'>, apiKey: string): string {
        return `${PROVIDER_ENDPOINT_MAP.google}/${MODEL_IDS[model]}:generateContent?key=${apiKey}`;
    }

    createRequestBody(
        _: PickModel<'google'>,
        prompt: PromptData,
    ): PickChatCompletionCreateParams<'google'> {
        return {
            systemInstruction: {
                role: 'system',
                parts: [{text: prompt.system}],
            },
            generationConfig: {
                temperature: DEFAULT_COPILOT_TEMPERATURE,
                maxOutputTokens: DEFAULT_COPILOT_MAX_TOKENS,
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
