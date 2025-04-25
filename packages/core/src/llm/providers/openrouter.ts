import {
	DEFAULT_COPILOT_MAX_TOKENS,
	DEFAULT_COPILOT_STOP_SEQUENCE,
	DEFAULT_COPILOT_STREAM,
	DEFAULT_COPILOT_TEMPERATURE,
	DEFAULT_COPILOT_TOP_P,
} from '../../defaults';
import type { PromptData } from '../../types/copilot';
import type {
	PickCompletion,
	PickCompletionCreateParams,
	PickModel,
} from '../../types/llm';
import type { BaseCopilotMetadata } from '../../types/metadata';
import { MODEL_IDS, PROVIDER_ENDPOINT_MAP } from '../base';
import { BaseProviderHandler } from '../handler';

export class OpenRouterHandler extends BaseProviderHandler<'openrouter'> {
	createEndpoint(): string {
		return PROVIDER_ENDPOINT_MAP.openrouter;
	}

	createRequestBody(
		model: PickModel<'openrouter'>,
		prompt: PromptData,
		metadata: BaseCopilotMetadata
	): PickCompletionCreateParams<'openrouter'> {
		return {
			model: MODEL_IDS[model],
			messages: [
				{
					role: 'user',
					content: `${prompt.context}\n${prompt.instruction}\n${metadata.textBeforeCursor}${metadata.textAfterCursor}`,
				},
			],
			stream: DEFAULT_COPILOT_STREAM,
			top_p: DEFAULT_COPILOT_TOP_P,
			temperature: DEFAULT_COPILOT_TEMPERATURE,
			max_tokens: DEFAULT_COPILOT_MAX_TOKENS,
			stop: DEFAULT_COPILOT_STOP_SEQUENCE,
		};
	}

	createHeaders(apiKey: string): Record<string, string> {
		return {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		};
	}

	parseCompletion(completion: PickCompletion<'openrouter'>): string | null {
		const content = completion.choices?.[0]?.message?.content;
		if (!content) return null;
		return content;
	}
}
