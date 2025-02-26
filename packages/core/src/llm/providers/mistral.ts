import {DEFAULT_COPILOT_TEMPERATURE} from '../../constants';
import type {PromptData} from '../../types/copilot';
import type {
    PickCompletion,
    PickCompletionCreateParams,
    PickModel,
} from '../../types/llm';
import {BaseCopilotMetadata} from '../../types/metadata';
import {MODEL_IDS, PROVIDER_ENDPOINT_MAP} from '../base';
import {BaseProviderHandler} from '../handler';

export class MistralHandler extends BaseProviderHandler<'mistral'> {
    createEndpoint(): string {
        return PROVIDER_ENDPOINT_MAP.mistral;
    }

    createRequestBody(
        model: PickModel<'mistral'>,
        prompt: PromptData,
        metadata: BaseCopilotMetadata,
    ): PickCompletionCreateParams<'mistral'> {
        return {
            model: MODEL_IDS[model],
            temperature: DEFAULT_COPILOT_TEMPERATURE,
            prompt: `${prompt.context}\n${prompt.instruction}\n\n${metadata.textBeforeCursor}`,
            suffix: metadata.textAfterCursor,
            stream: false,
        };
    }

    createHeaders(apiKey: string): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        };
    }

    parseCompletion(completion: PickCompletion<'mistral'>): string | null {
        const content = completion.choices?.[0]?.message.content;
        if (!content) return null;
        return Array.isArray(content)
            ? content
                  .filter(chunk => 'text' in chunk)
                  .map(chunk => chunk.text)
                  .join('')
            : content;
    }
}
