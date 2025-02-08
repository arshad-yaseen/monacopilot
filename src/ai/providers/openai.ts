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

export class OpenAIHandler extends BaseProviderHandler<'openai'> {
    createEndpoint(): string {
        return PROVIDER_ENDPOINT_MAP.openai;
    }

    createRequestBody(
        model: PickModel<'openai'>,
        prompt: PromptData,
    ): PickChatCompletionCreateParams<'openai'> {
        const isO1Model = model === 'o1-mini';
        return {
            model: MODEL_IDS[model],
            ...(!isO1Model && {temperature: DEFAULT_COMPLETION_TEMPERATURE}),
            max_completion_tokens: DEFAULT_COMPLETION_MAX_TOKENS,
            messages: [
                {role: 'system' as const, content: prompt.system},
                {role: 'user' as const, content: prompt.user},
            ],
        };
    }

    createHeaders(apiKey: string): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        };
    }

    parseCompletion(completion: PickChatCompletion<'openai'>): string | null {
        return completion.choices?.[0]?.message.content ?? null;
    }
}
