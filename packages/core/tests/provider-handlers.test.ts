import {describe, expect, it} from 'vitest';

import {
    DEFAULT_COPILOT_MAX_TOKENS,
    DEFAULT_COPILOT_TEMPERATURE,
} from '../src/constants';
import {AnthropicHandler} from '../src/llm/providers/anthropic';
import {GroqHandler} from '../src/llm/providers/groq';
import {OpenAIHandler} from '../src/llm/providers/openai';

describe('Provider Handlers - Creation Methods', () => {
    describe('AnthropicHandler', () => {
        const handler = new AnthropicHandler();
        const apiKey = 'test-key';

        it('should create correct endpoint', () => {
            const endpoint = handler.createEndpoint();
            expect(endpoint).toBe('https://api.anthropic.com/v1/messages');
        });

        it('should create correct headers', () => {
            const headers = handler.createHeaders(apiKey);
            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            });
        });

        it('should create correct request body', () => {
            const model = 'claude-3-haiku';
            const prompt = {system: 'system prompt', user: 'user prompt'};
            const body = handler.createRequestBody(model, prompt);

            expect(body).toEqual({
                model: 'claude-3-haiku-20240307',
                temperature: DEFAULT_COPILOT_TEMPERATURE,
                system: prompt.system,
                messages: [{role: 'user', content: prompt.user}],
                max_tokens: DEFAULT_COPILOT_MAX_TOKENS,
            });
        });
    });

    describe('OpenAIHandler', () => {
        const handler = new OpenAIHandler();
        const apiKey = 'test-key';

        it('should create correct endpoint', () => {
            const endpoint = handler.createEndpoint();
            expect(endpoint).toBe('https://api.openai.com/v1/chat/completions');
        });

        it('should create correct headers', () => {
            const headers = handler.createHeaders(apiKey);
            expect(headers).toEqual({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            });
        });

        it('should handle O1 model differently in request body', () => {
            const model = 'o1-mini';
            const prompt = {system: 'system prompt', user: 'user prompt'};
            const body = handler.createRequestBody(model, prompt);

            expect(body.temperature).toBeUndefined();
        });
    });

    describe('GroqHandler', () => {
        const handler = new GroqHandler();
        const apiKey = 'test-key';

        it('should create correct endpoint', () => {
            const endpoint = handler.createEndpoint();
            expect(endpoint).toBe(
                'https://api.groq.com/openai/v1/chat/completions',
            );
        });

        it('should create correct headers', () => {
            const headers = handler.createHeaders(apiKey);
            expect(headers).toEqual({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            });
        });

        it('should create correct request body for llama model', () => {
            const model = 'llama-3-70b';
            const prompt = {system: 'system prompt', user: 'user prompt'};
            const body = handler.createRequestBody(model, prompt);

            expect(body).toEqual({
                model: 'llama3-70b-8192',
                temperature: DEFAULT_COPILOT_TEMPERATURE,
                max_tokens: DEFAULT_COPILOT_MAX_TOKENS,
                messages: [
                    {role: 'system', content: prompt.system},
                    {role: 'user', content: prompt.user},
                ],
            });
        });
    });
});
