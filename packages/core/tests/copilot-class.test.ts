import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {Copilot} from '../src/copilot';
import type {CustomCopilotModel, PromptData} from '../src/types/copilot';

describe('Copilot class', () => {
    class TestCopilot extends Copilot<{name: string}> {
        protected getDefaultPrompt(metadata: {name: string}): PromptData {
            return {
                system: `Default system for ${metadata.name}`,
                user: `Default user for ${metadata.name}`,
            };
        }
    }

    const customModel: CustomCopilotModel = {
        config: (apiKey: string, prompt: PromptData) => ({
            endpoint: 'https://custom-model.example.com/endpoint',
            headers: {
                'x-custom-api-key': apiKey,
            },
            body: {
                specialPrompt: `${prompt.system} | ${prompt.user}`,
            },
        }),
        transformResponse: (response: any) => ({
            text: response.result || null,
        }),
    };

    beforeEach(() => {
        global.fetch = vi.fn();
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Constructor sets apiKey, provider, model for normal usage', () => {
        const copilot = new TestCopilot('fakeKey', {
            provider: 'openai',
            model: 'gpt-4o',
        });
        expect((copilot as any).apiKey).toBe('fakeKey');
        expect((copilot as any).provider).toBe('openai');
        expect((copilot as any).model).toBe('gpt-4o');
    });

    it('Constructor allows custom model without provider', () => {
        const customCopilot = new TestCopilot('anotherKey', {
            model: customModel,
        });
        expect((customCopilot as any).apiKey).toBe('anotherKey');
        expect((customCopilot as any).provider).toBeUndefined();
        expect((customCopilot as any).model).toBe(customModel);
    });

    it('getDefaultPrompt is used if no customPrompt is provided', async () => {
        const copilot = new TestCopilot('key', {
            provider: 'openai',
            model: 'gpt-4o',
        });
        const prompt = (copilot as any).generatePrompt(
            {name: 'Alice'},
            undefined,
        );
        expect(prompt).toEqual({
            system: 'Default system for Alice',
            user: 'Default user for Alice',
        });
    });

    it('generatePrompt merges defaultPrompt with customPrompt overrides', () => {
        const copilot = new TestCopilot('key', {
            provider: 'openai',
            model: 'gpt-4o',
        });
        const customPrompt = (meta: {name: string}) => ({
            user: `Custom user for ${meta.name}`,
        });
        const prompt = (copilot as any).generatePrompt(
            {name: 'Bob'},
            customPrompt,
        );
        expect(prompt).toEqual({
            system: 'Default system for Bob',
            user: 'Custom user for Bob',
        });
    });

    it('makeAIRequest should return text on success (provider-based)', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{message: {content: 'Hello from the AI'}}],
            }),
        });
        const copilot = new TestCopilot('apiKey', {
            provider: 'openai',
            model: 'gpt-4o',
        });
        const result = await (copilot as any).makeAIRequest({
            name: 'test-user',
        });
        expect(result.text).toBe('Hello from the AI');
        expect(result.error).toBeUndefined();
    });

    it('makeAIRequest should capture error and return it if fetch fails', async () => {
        (global.fetch as any).mockRejectedValueOnce(new Error('Network down'));
        const copilot = new TestCopilot('apiKey', {
            provider: 'openai',
            model: 'gpt-4o',
        });
        const result = await (copilot as any).makeAIRequest({
            name: 'test-user',
        });
        expect(result.text).toBeNull();
        expect(result.error).toContain('Network down');
    });

    it('makeAIRequest uses custom model config and transformResponse if model is custom', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({result: 'Custom model says hi'}),
        });
        const copilot = new TestCopilot('customApiKey', {
            model: customModel,
        });
        const result = await (copilot as any).makeAIRequest({name: 'TestUser'});
        expect(result.text).toBe('Custom model says hi');
        expect(result.raw).toEqual({result: 'Custom model says hi'});
    });

    it('prepareRequest for custom model uses config body & headers', async () => {
        const copilot = new TestCopilot('k3y', {
            model: customModel,
        });
        const prompt = {system: 'sys', user: 'usr'};
        const requestDetails = await (copilot as any).prepareRequest(prompt);
        expect(requestDetails.endpoint).toBe(
            'https://custom-model.example.com/endpoint',
        );
        expect(requestDetails.headers).toEqual({'x-custom-api-key': 'k3y'});
        expect(requestDetails.requestBody).toEqual({
            specialPrompt: 'sys | usr',
        });
    });

    it('prepareRequest for provider uses createProviderEndpoint etc.', async () => {
        const copilot = new TestCopilot('k3y', {
            provider: 'openai',
            model: 'gpt-4o',
        });
        const prompt = {system: 'sys', user: 'usr'};
        const requestDetails = await (copilot as any).prepareRequest(prompt);
        expect(requestDetails.endpoint).toBe(
            'https://api.openai.com/v1/chat/completions',
        );
        expect(requestDetails.requestBody.model).toBe('gpt-4o-2024-08-06');
        expect(requestDetails.headers).toHaveProperty(
            'Authorization',
            'Bearer k3y',
        );
    });

    it('processResponse (non-custom) calls parseProviderChatCompletion', () => {
        const copilot = new TestCopilot('k3y', {
            provider: 'openai',
            model: 'gpt-4o',
        });
        const response = {
            choices: [{message: {content: 'Hello from parse test'}}],
        };
        const result = (copilot as any).processResponse(response);
        expect(result.text).toBe('Hello from parse test');
        expect(result.raw).toBe(response);
    });
});
