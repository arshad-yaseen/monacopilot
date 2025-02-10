import {describe, expect, it} from 'vitest';

import {ChatCompletion} from '../src';
import {BaseProviderHandler} from '../src/llm/handler';
import {
    createProviderEndpoint,
    createProviderHeaders,
    createRequestBody,
    parseProviderChatCompletion,
} from '../src/llm/operations';

describe('BaseProviderHandler & operations', () => {
    class TestProviderHandler extends BaseProviderHandler<'openai'> {
        createEndpoint() {
            return 'test-endpoint';
        }
        createRequestBody() {
            return {} as any;
        }
        createHeaders() {
            return {'x-test': 'header'};
        }
        parseCompletion() {
            return 'parsed';
        }
    }

    it('Should instantiate a TestProviderHandler (subclass of BaseProviderHandler)', () => {
        const testHandler = new TestProviderHandler();
        expect(testHandler).toBeInstanceOf(TestProviderHandler);
    });

    it('Should create correct endpoint via createProviderEndpoint (OpenAI)', () => {
        const endpoint = createProviderEndpoint('gpt-4o', 'fakeKey', 'openai');
        expect(endpoint).toBe('https://api.openai.com/v1/chat/completions');
    });

    it('Should create correct endpoint via createProviderEndpoint (Anthropic)', () => {
        const endpoint = createProviderEndpoint(
            'claude-3-haiku',
            'fakeKey',
            'anthropic',
        );
        expect(endpoint).toBe('https://api.anthropic.com/v1/messages');
    });

    it('Should create request body for OpenAI with user & system prompts', () => {
        const body = createRequestBody('gpt-4o', 'openai', {
            system: 'sys prompt',
            user: 'user prompt',
        });
        expect(body).toMatchObject({
            model: 'gpt-4o-2024-08-06',
            messages: [
                {role: 'system', content: 'sys prompt'},
                {role: 'user', content: 'user prompt'},
            ],
        });
    });

    it('Should create request body for Anthropic with user & system prompts', () => {
        const body = createRequestBody('claude-3-haiku', 'anthropic', {
            system: 'anthropic sys',
            user: 'anthropic user',
        });
        expect(body).toMatchObject({
            model: 'claude-3-haiku-20240307',
            system: 'anthropic sys',
            messages: [{role: 'user', content: 'anthropic user'}],
        });
    });

    it('Should create correct headers for OpenAI', () => {
        const headers = createProviderHeaders('OPENAI_KEY', 'openai');
        expect(headers).toMatchObject({
            Authorization: 'Bearer OPENAI_KEY',
            'Content-Type': 'application/json',
        });
    });

    it('Should create correct headers for Google', () => {
        const headers = createProviderHeaders('googleKey', 'google');
        expect(headers).toMatchObject({
            'Content-Type': 'application/json',
        });
    });

    it('parseProviderChatCompletion with OpenAI returns first choice', () => {
        const completion = {
            choices: [{message: {content: 'OpenAI content'}}],
        } as ChatCompletion;
        const result = parseProviderChatCompletion(completion, 'openai');
        expect(result).toBe('OpenAI content');
    });

    it('parseProviderChatCompletion with Deepseek returns choice text if present', () => {
        const completion = {
            choices: [{text: 'Deepseek content'}],
        } as any;
        const result = parseProviderChatCompletion(completion, 'deepseek');
        expect(result).toBe('Deepseek content');
    });

    it('parseProviderChatCompletion returns null if no relevant fields are found', () => {
        const completion = {} as any;
        const result = parseProviderChatCompletion(completion, 'deepseek');
        expect(result).toBeNull();
    });
});
