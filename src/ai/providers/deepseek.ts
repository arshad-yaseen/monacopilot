import {MODEL_IDS, PROVIDER_ENDPOINT_MAP} from 'ai/base';
import {BaseProviderHandler} from 'ai/handler';

import {
    PickChatCompletion,
    PickChatCompletionCreateParams,
    PickModel,
} from 'types/ai';
import {CompletionMetadata} from 'types/completion';
import {PromptData} from 'types/copilot';

import {
    DEFAULT_COMPLETION_MAX_TOKENS,
    DEFAULT_COMPLETION_TEMPERATURE,
} from 'constants/completion';

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
