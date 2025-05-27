import { describe, expect, it } from 'vitest'

import { joinWithAnd } from '../src/utils/text'

describe('Text Utils', () => {
	describe('joinWithAnd', () => {
		it('should return empty string for empty array', () => {
			expect(joinWithAnd([])).toBe('')
		})

		it('should return empty string for undefined input', () => {
			expect(joinWithAnd(undefined)).toBe('')
		})

		it('should return single item without and', () => {
			expect(joinWithAnd(['one'])).toBe('one')
		})

		it('should join two items with and', () => {
			expect(joinWithAnd(['one', 'two'])).toBe('one and two')
		})

		it('should join multiple items with commas and and', () => {
			expect(joinWithAnd(['one', 'two', 'three'])).toBe('one, two and three')
		})

		it('should work with readonly arrays', () => {
			const arr = ['one', 'two'] as const
			expect(joinWithAnd(arr)).toBe('one and two')
		})
	})
})
