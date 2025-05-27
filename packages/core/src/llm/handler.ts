import type { PromptData } from '../types/copilot'
import type {
	Model,
	PickCompletion,
	PickCompletionCreateParams,
	PickModel,
	Provider,
} from '../types/llm'
import type { BaseCopilotMetadata } from '../types/metadata'

export abstract class BaseProviderHandler<P extends Provider> {
	abstract createEndpoint(model: Model, apiKey?: string): string

	abstract createRequestBody(
		model: PickModel<P>,
		prompt: PromptData,
		metadata: BaseCopilotMetadata,
	): PickCompletionCreateParams<P>

	abstract createHeaders(apiKey: string): Record<string, string>

	abstract parseCompletion(completion: PickCompletion<P>): string | null
}
