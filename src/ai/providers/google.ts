import {MODEL_IDS, PROVIDER_ENDPOINT_MAP} from 'ai/base';
import {BaseProviderHandler} from 'ai/handler';

import {
    PickChatCompletion,
    PickChatCompletionCreateParams,
    PickModel,
} from 'types/ai';
import {PromptData} from 'types/copilot';

import {
    DEFAULT_COMPLETION_MAX_TOKENS,
    DEFAULT_COMPLETION_TEMPERATURE,
} from 'constants/completion';

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
