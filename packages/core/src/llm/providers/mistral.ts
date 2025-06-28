import {
	DEFAULT_COPILOT_MAX_TOKENS,
	DEFAULT_COPILOT_STOP_SEQUENCE,
	DEFAULT_COPILOT_STREAM,
	DEFAULT_COPILOT_TEMPERATURE,
	DEFAULT_COPILOT_TOP_P,
} from '../../defaults'
import type { PromptData } from '../../types/copilot'
import type {
	PickCompletion,
	PickCompletionCreateParams,
	PickModel,
} from '../../types/llm'
import type { BaseCopilotMetadata } from '../../types/metadata'
import { MODEL_IDS, PROVIDER_ENDPOINT_MAP } from '../base'
import { BaseProviderHandler } from '../handler'

export class MistralHandler extends BaseProviderHandler<'mistral'> {
	createEndpoint(): string {
		return PROVIDER_ENDPOINT_MAP.mistral
	}

	createRequestBody(
		model: PickModel<'mistral'>,
		prompt: PromptData,
		metadata: BaseCopilotMetadata,
	): PickCompletionCreateParams<'mistral'> {
		return {
			model: MODEL_IDS[model],
			prompt: `${prompt.context}\n${prompt.instruction}\n${metadata.textBeforeCursor}`,
			suffix: metadata.textAfterCursor,
			stream: DEFAULT_COPILOT_STREAM,
			top_p: DEFAULT_COPILOT_TOP_P,
			temperature: DEFAULT_COPILOT_TEMPERATURE,
			stop: DEFAULT_COPILOT_STOP_SEQUENCE,
			max_tokens: DEFAULT_COPILOT_MAX_TOKENS,
		}
	}

	createHeaders(apiKey: string): Record<string, string> {
		return {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		}
	}

	parseCompletion(completion: PickCompletion<'mistral'>): string | null {
		const content = completion.choices?.[0]?.message.content
		if (!content) return null
		return Array.isArray(content)
			? content
					.filter((chunk) => 'text' in chunk)
					.map((chunk) => (chunk as { text: string }).text)
					.join('')
			: content
	}
}
