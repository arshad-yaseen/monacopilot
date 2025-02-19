import {MODEL_IDS, PROVIDER_ENDPOINT_MAP} from '@monacopilot/core';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {CompletionCopilot} from '../src/completion-copilot';
import type {CompletionMetadata} from '../src/types';
import {
    MOCK_API_KEY,
    MOCK_COMPLETION,
    MOCK_COMPLETION_CONTENT,
    MOCK_COMPLETION_METADATA,
    MOCK_ERROR,
    MOCK_NETWORK_ERROR,
    TEST_MODEL,
    TEST_PROVIDER,
} from './mock';

describe('Completion', () => {
    let copilot: CompletionCopilot;

    beforeEach(() => {
        copilot = new CompletionCopilot(MOCK_API_KEY, {
            provider: TEST_PROVIDER,
            model: TEST_MODEL,
        });
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should successfully return a completion', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(MOCK_COMPLETION),
        });

        const result = await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(result).toEqual({
            completion: MOCK_COMPLETION_CONTENT,
            raw: MOCK_COMPLETION,
        });
        expect(fetch).toHaveBeenCalledWith(
            PROVIDER_ENDPOINT_MAP[TEST_PROVIDER],
            expect.objectContaining({
                method: 'POST',
                headers: expect.any(Object),
                body: expect.stringContaining(MODEL_IDS[TEST_MODEL]),
            }),
        );
    });

    it('should handle API errors and return an error response', async () => {
        global.fetch = vi.fn().mockRejectedValue(MOCK_ERROR);

        const result = await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(result).toEqual({
            error: expect.stringContaining('API Error'),
            completion: null,
        });
    });

    it('should use custom provider and model when specified', async () => {
        const customCompletionCopilot = new CompletionCopilot(MOCK_API_KEY, {
            provider: 'openai',
            model: 'gpt-4o',
        });
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(MOCK_COMPLETION),
        });

        await customCompletionCopilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(fetch).toHaveBeenCalledWith(
            PROVIDER_ENDPOINT_MAP['openai'],
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining(MODEL_IDS['gpt-4o']),
            }),
        );
    });

    it('should handle network errors', async () => {
        MOCK_ERROR.name = 'NetworkError';
        global.fetch = vi.fn().mockRejectedValue(MOCK_NETWORK_ERROR);

        const result = await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(result).toEqual({
            error: expect.stringContaining('Network error'),
            completion: null,
        });
    });

    it('should use custom headers in API requests', async () => {
        const customHeaders = {'X-Custom-Header': 'test-value'};
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(MOCK_COMPLETION),
        });

        await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
            options: {
                headers: customHeaders,
            },
        });

        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining(customHeaders),
            }),
        );
    });

    it('should use custom prompt when provided', async () => {
        const customPrompt = (metadata: CompletionMetadata) => ({
            system: 'Custom system prompt',
            user: `Custom user prompt: ${metadata.textBeforeCursor}`,
        });
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(MOCK_COMPLETION),
        });

        await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
            options: {
                customPrompt,
            },
        });

        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('Custom system prompt'),
            }),
        );
    });

    it('should use default prompt when custom prompt is not provided', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(MOCK_COMPLETION),
        });

        await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('user'),
            }),
        );
    });

    it('should use custom system prompt while retaining default user prompt', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(MOCK_COMPLETION),
        });

        await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
            options: {
                customPrompt: () => ({
                    system: 'You are an AI assistant specialized in writing React components.',
                }),
            },
        });

        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining(
                    'You are an AI assistant specialized in writing React components.',
                ),
            }),
        );
    });

    it('should pass complete CompletionMetadata to customPrompt and handle optional properties correctly', () => {
        const customPrompt = (metadata: CompletionMetadata) => ({
            system: 'Custom system prompt',
            user: `Custom user prompt: ${metadata.textBeforeCursor}`,
        });

        const prompt = customPrompt(MOCK_COMPLETION_METADATA);

        expect(prompt.system).toBe('Custom system prompt');
        expect(prompt.user).toBe('Custom user prompt: function hello() {');
        expect(prompt.system).toBeDefined();
        expect(prompt.user).toBeDefined();
        expect(prompt.system).not.toBeUndefined();
        expect(prompt.user).not.toBeUndefined();
    });
});
