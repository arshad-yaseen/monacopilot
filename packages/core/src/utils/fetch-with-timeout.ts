export const fetchWithTimeout = async (
	url: string,
	options: RequestInit = {},
	timeoutMs = 20000,
): Promise<Response> => {
	const controller = new AbortController()
	const { signal } = controller

	const timeoutId = setTimeout(() => {
		controller.abort()
	}, timeoutMs)

	try {
		const response = await fetch(url, {
			...options,
			signal,
		})

		return response
	} catch (error) {
		if (error instanceof DOMException && error.name === 'AbortError') {
			throw new Error(`Request timed out after ${timeoutMs}ms`)
		}
		throw error
	} finally {
		clearTimeout(timeoutId)
	}
}
