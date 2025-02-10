import {describe, expect, it} from 'vitest';

import {DEFAULT_COPILOT_TEMPERATURE} from '../src/constants';
import {AnthropicHandler} from '../src/llm/providers/anthropic';
import {DeepseekHandler} from '../src/llm/providers/deepseek';
import {GoogleHandler} from '../src/llm/providers/google';
import {GroqHandler} from '../src/llm/providers/groq';
import {OpenAIHandler} from '../src/llm/providers/openai';

describe('Provider Classes', () => {
    it('AnthropicHandler should create correct endpoint', () => {
        const handler = new AnthropicHandler();
        expect(handler.createEndpoint()).toBe(
            'https://api.anthropic.com/v1/messages',
        );
    });

    it('AnthropicHandler should parse completion with valid content', () => {
        const handler = new AnthropicHandler();
        const completion = {
            content: [{type: 'text', text: 'Hello from Anthropic'}],
        } as unknown;
        const result = handler.parseCompletion(completion as any);
        expect(result).toBe('Hello from Anthropic');
    });

    it('DeepseekHandler createRequestBody should embed system + user in prompt', () => {
        const handler = new DeepseekHandler();
        const body = handler.createRequestBody('v3', {
            system: 'System message',
            user: 'User message',
        });
        expect(body.prompt).toContain('System message');
        expect(body.prompt).toContain('User message');
        expect(body.model).toBe('deepseek-chat');
    });

    it('DeepseekHandler parseCompletion should return null if text is missing', () => {
        const handler = new DeepseekHandler();
        const result = handler.parseCompletion({
            choices: [{text: undefined}],
        } as any);
        expect(result).toBeNull();
    });

    it('GoogleHandler should create correct endpoint with appended API key', () => {
        const handler = new GoogleHandler();
        const url = handler.createEndpoint('gemini-1.5-pro', 'XYZ-ABC-123');
        expect(url).toBe(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=XYZ-ABC-123',
        );
    });

    it('GoogleHandler parseCompletion should return content if present', () => {
        const handler = new GoogleHandler();
        const completion = {
            candidates: [{content: {parts: [{text: 'Hello from Google'}]}}],
        } as any;
        const result = handler.parseCompletion(completion);
        expect(result).toBe('Hello from Google');
    });

    it('GroqHandler should create correct endpoint', () => {
        const handler = new GroqHandler();
        expect(handler.createEndpoint()).toBe(
            'https://api.groq.com/openai/v1/chat/completions',
        );
    });

    it('GroqHandler parseCompletion should return first choice content', () => {
        const handler = new GroqHandler();
        const completion = {
            choices: [{message: {content: 'Hello from Groq!'}}],
        } as any;
        const result = handler.parseCompletion(completion);
        expect(result).toBe('Hello from Groq!');
    });

    it('OpenAIHandler createRequestBody should omit temperature if model is o1-mini', () => {
        const handler = new OpenAIHandler();
        const bodyMini = handler.createRequestBody('o1-mini', {
            system: 'system text',
            user: 'user text',
        });
        expect(bodyMini).not.toHaveProperty('temperature');
        const bodyRegular = handler.createRequestBody('gpt-4o', {
            system: 'system text',
            user: 'user text',
        });
        expect(bodyRegular).toHaveProperty(
            'temperature',
            DEFAULT_COPILOT_TEMPERATURE,
        );
    });

    it('OpenAIHandler parseCompletion returns null if no choices exist', () => {
        const handler = new OpenAIHandler();
        const completion = {} as any;
        const result = handler.parseCompletion(completion);
        expect(result).toBeNull();
    });
});
