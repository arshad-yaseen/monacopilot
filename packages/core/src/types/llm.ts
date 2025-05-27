import type {
	FIMCompletionResponse as MistralFIMCompletion,
	FIMCompletionRequest$Outbound as MistralFIMCompletionCreateParams,
} from '@mistralai/mistralai/models/components'

import type { PromptData } from './copilot'

/**
 * Providers supported by Copilot.
 */
export type Provider = 'mistral'

/**
 * Core type mapping for provider-specific implementations
 */
export interface ProviderImplementationMap {
	mistral: {
		Model: 'codestral'
		Params: MistralFIMCompletionCreateParams
		Completion: MistralFIMCompletion
	}
}

/**
 * Models available for each provider (maintained as individual exports)
 */
export type MistralModel = ProviderImplementationMap['mistral']['Model']

/**
 * Union of all predefined Copilot models
 */
export type Model = {
	[K in Provider]: ProviderImplementationMap[K]['Model']
}[Provider]

/**
 * Utility types for provider-specific implementations
 */
export type PickModel<P extends Provider> =
	ProviderImplementationMap[P]['Model']
export type PickCompletionCreateParams<P extends Provider> =
	ProviderImplementationMap[P]['Params']
export type PickCompletion<P extends Provider> =
	ProviderImplementationMap[P]['Completion']

/**
 * Consolidated chat completion types (maintained as individual exports)
 */
export type CompletionCreateParams = {
	[K in Provider]: ProviderImplementationMap[K]['Params']
}[Provider]
export type Completion = {
	[K in Provider]: ProviderImplementationMap[K]['Completion']
}[Provider]

/**
 * Individual provider type aliases (preserved from original)
 */
export type MistralCompletionCreateParams = MistralFIMCompletionCreateParams
export type MistralCompletion = MistralFIMCompletion

export interface ProviderHandler<P extends Provider> {
	createEndpoint(model: PickModel<P>, apiKey: string): string
	createRequestBody(
		model: PickModel<P>,
		prompt: PromptData,
	): PickCompletionCreateParams<P>
	createHeaders(apiKey: string): Record<string, string>
	parseCompletion(completion: PickCompletion<P>): string | null
}
