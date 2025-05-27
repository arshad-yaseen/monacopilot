import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { logger } from '../src/logger'

describe('Logger', () => {
	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('report', () => {
		it('should handle Error objects', () => {
			const error = new Error('test error')
			const result = logger.report(error)
			expect(result.message).toBe('test error')
			expect(console.error).toHaveBeenCalled()
		})

		it('should handle string errors', () => {
			const result = logger.report('string error')
			expect(result.message).toBe('string error')
			expect(console.error).toHaveBeenCalled()
		})

		it('should handle unknown error types', () => {
			const result = logger.report({})
			expect(result.message).toBe('An unknown error occurred')
			expect(console.error).toHaveBeenCalled()
		})
	})

	describe('warn', () => {
		it('should log warning message', () => {
			logger.warn('test warning')
			expect(console.warn).toHaveBeenCalled()
		})
	})

	describe('warnDeprecated', () => {
		it('should warn about deprecated features', () => {
			logger.warnDeprecated('oldFeature', 'newFeature')
			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining('"oldFeature" is deprecated'),
			)
		})

		it('should include location if provided', () => {
			logger.warnDeprecated('oldFeature', 'newFeature', 'TestLocation')
			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining('in TestLocation'),
			)
		})
	})
})
