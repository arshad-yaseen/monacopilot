import type { Awaitable } from './internal'
import type { Provider, ProviderImplementationMap } from './llm'

/**
 * Represents the structure of a prompt used for code completion.
 */
export interface PromptData {
	/**
	 * Contextual information about the code environment
	 * @example filename, technologies, etc.
	 */
	context: string
	/** Instructions for the AI model on how to generate the completion */
	instruction: string
	/** The content of the file being edited */
	fileContent: string
}

export type CustomPrompt<T> = (metadata: T) => Partial<PromptData>

type CustomOptions = {
	/** Should be undefined when using a custom model */
	provider?: undefined
	/**
	 * Custom model implementation function.
	 * @param prompt - The prompt data used to generate the completion.
	 * @returns Object containing the generated text.
	 * @see {@link https://monacopilot.dev/advanced/custom-model}
	 */
	model: CustomCopilotModel
}

export type CustomCopilotModel = (
	prompt: PromptData,
) => Awaitable<CustomModelResponse>

type CustomModelResponse = {
	/** The generated text content, or null if no text was generated for some reason.
	 * The text is used to insert into the editor directly. */
	text: string | null
}

export type AIRequestHandler = (params: {
	/** The API endpoint URL for the LLM completion request */
	endpoint: string
	/** The request body containing the completion parameters (model, prompt, etc.) */
	body: Record<string, unknown>
	/** HTTP headers required for authentication and content type */
	headers: Record<string, string>
}) => Promise<Record<string, unknown>>

export type CopilotOptions = ProviderOptions<'mistral'> | CustomOptions

export type ProviderOptions<T extends Provider> = {
	provider: T
	model: ProviderImplementationMap[T]['Model']
}
