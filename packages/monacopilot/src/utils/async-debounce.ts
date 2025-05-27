export const asyncDebounce = <T extends (...args: any[]) => Promise<any>>(
	func: T,
	wait = 300,
): {
	(...args: Parameters<T>): Promise<ReturnType<T>>
	cancel: () => void
} => {
	type R = ReturnType<T>

	let timer: ReturnType<typeof setTimeout> | null = null
	let pending: {
		promise: Promise<R>
		resolve: (value: R | PromiseLike<R>) => void
		reject: (reason?: any) => void
		args: Parameters<T>
	} | null = null

	const debounced = (...args: Parameters<T>): Promise<R> => {
		if (pending) {
			pending.args = args
			return pending.promise
		}

		let resolvePromise!: (value: R | PromiseLike<R>) => void
		let rejectPromise!: (reason?: any) => void

		const promise = new Promise<R>((resolve, reject) => {
			resolvePromise = resolve
			rejectPromise = reject
		})

		pending = {
			args,
			promise,
			resolve: resolvePromise,
			reject: rejectPromise,
		}

		if (timer) {
			clearTimeout(timer)
			timer = null
		}

		timer = setTimeout(async () => {
			const currentPending = pending
			if (!currentPending) {
				return
			}
			pending = null
			timer = null
			try {
				const result = await func(...currentPending.args)
				currentPending.resolve(result)
			} catch (error) {
				currentPending.reject(error)
			}
		}, wait)

		return promise
	}

	debounced.cancel = () => {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		if (pending) {
			pending.reject(new Error('Cancelled'))
			pending = null
		}
	}

	return debounced
}
