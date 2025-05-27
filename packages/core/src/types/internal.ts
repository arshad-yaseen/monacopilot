export type Awaitable<T> = T | Promise<T>

export type CopilotAIResponse = {
	text: string | null
	raw?: unknown
	error?: string
}
