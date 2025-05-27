export class TextOverlapCalculator {
	public findOverlaps(
		completion: string,
		textBeforeCursor: string,
		textAfterCursor: string,
	): {
		startOverlapLength: number
		maxOverlapLength: number
	} {
		if (!completion) {
			return {
				startOverlapLength: 0,
				maxOverlapLength: 0,
			}
		}

		const completionLength = completion.length
		const beforeLength = textBeforeCursor.length
		const afterLength = textAfterCursor.length

		let prefixOverlapLength = 0
		let suffixOverlapLength = 0
		let startOverlapLength = 0

		const maxBeforeOverlap = Math.min(completionLength, beforeLength)
		for (let i = 1; i <= maxBeforeOverlap; i++) {
			const completionStart = completion.substring(0, i)
			const textEnd = textBeforeCursor.slice(-i)
			if (completionStart === textEnd) {
				startOverlapLength = i
			}
		}

		const maxAfterOverlap = Math.min(completionLength, afterLength)

		for (let i = 0; i < maxAfterOverlap; i++) {
			if (completion[i] !== textAfterCursor[i]) break
			prefixOverlapLength++
		}

		for (let i = 1; i <= maxAfterOverlap; i++) {
			if (completion.slice(-i) === textAfterCursor.slice(0, i)) {
				suffixOverlapLength = i
			}
		}

		let maxOverlapLength = Math.max(prefixOverlapLength, suffixOverlapLength)

		if (maxOverlapLength === 0) {
			for (let i = 1; i < completionLength; i++) {
				if (textAfterCursor.startsWith(completion.substring(i))) {
					maxOverlapLength = completionLength - i
					break
				}
			}
		}

		return {
			startOverlapLength,
			maxOverlapLength,
		}
	}
}
