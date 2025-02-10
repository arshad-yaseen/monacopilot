import {
    DEFAULT_COPILOT_TEMPERATURE,
    HTTP,
    MODEL_IDS,
    PROVIDER_ENDPOINT_MAP,
} from '@monacopilot/core';
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
        vi.spyOn(HTTP, 'post').mockResolvedValue(MOCK_COMPLETION);

        const result = await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(result).toEqual({
            completion: MOCK_COMPLETION_CONTENT,
            raw: MOCK_COMPLETION,
        });
        expect(HTTP.post).toHaveBeenCalledWith(
            PROVIDER_ENDPOINT_MAP[TEST_PROVIDER],
            expect.objectContaining({
                model: MODEL_IDS[TEST_MODEL],
                messages: expect.arrayContaining([
                    {role: 'user', content: expect.any(String)},
                ]),
                system: expect.any(String),
                temperature: DEFAULT_COPILOT_TEMPERATURE,
            }),
            expect.objectContaining({
                headers: expect.any(Object),
            }),
        );
    });

    it('should handle API errors and return an error response', async () => {
        vi.spyOn(HTTP, 'post').mockRejectedValue(MOCK_ERROR);

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
        vi.spyOn(HTTP, 'post').mockResolvedValue(MOCK_COMPLETION);

        await customCompletionCopilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(HTTP.post).toHaveBeenCalledWith(
            PROVIDER_ENDPOINT_MAP['openai'],
            expect.objectContaining({
                model: MODEL_IDS['gpt-4o'],
            }),
            expect.any(Object),
        );
    });

    it('should handle network errors', async () => {
        MOCK_ERROR.name = 'NetworkError';
        vi.spyOn(HTTP, 'post').mockRejectedValue(MOCK_NETWORK_ERROR);

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
        vi.spyOn(HTTP, 'post').mockResolvedValue(MOCK_COMPLETION);

        await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
            options: {
                headers: customHeaders,
            },
        });

        expect(HTTP.post).toHaveBeenCalledWith(
            expect.any(String),
            expect.any(Object),
            expect.objectContaining({
                headers: expect.objectContaining(customHeaders),
            }),
        );
    });

    it('should use custom prompt when provided', async () => {
        const customPrompt = (metadata: CompletionMetadata) => ({
            system: 'Custom system prompt',
            user: `Custom user prompt: ${metadata.textBeforeCursor}`,
        });
        vi.spyOn(HTTP, 'post').mockResolvedValue(MOCK_COMPLETION);

        await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
            options: {
                customPrompt,
            },
        });

        expect(HTTP.post).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                messages: [
                    {
                        role: 'user',
                        content: expect.stringContaining('Custom user prompt'),
                    },
                ],
                system: 'Custom system prompt',
            }),
            expect.any(Object),
        );
    });

    it('should use default prompt when custom prompt is not provided', async () => {
        vi.spyOn(HTTP, 'post').mockResolvedValue(MOCK_COMPLETION);

        await copilot.complete({
            body: {
                completionMetadata: MOCK_COMPLETION_METADATA,
            },
        });

        expect(HTTP.post).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                messages: [{role: 'user', content: expect.any(String)}],
                system: expect.any(String),
            }),
            expect.any(Object),
        );
    });

    it('should use custom system prompt while retaining default user prompt', async () => {
        vi.spyOn(HTTP, 'post').mockResolvedValue(MOCK_COMPLETION);

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

        expect(HTTP.post).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                messages: [{role: 'user', content: expect.any(String)}],
                system: 'You are an AI assistant specialized in writing React components.',
            }),
            expect.any(Object),
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
