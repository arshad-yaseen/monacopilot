import {PROVIDER_MODEL_MAP, PROVIDERS} from 'ai/base';
import {Copilot} from 'core/copilot/instance';
import {describe, expect, it, vi} from 'vitest';

import {joinWithAnd} from 'utils/text';

import {MOCK_API_KEY, TEST_PROVIDER} from './mock';

describe('Copilot', () => {
    it('should reject initialization with an unsupported provider', () => {
        expect(
            () =>
                new Copilot(MOCK_API_KEY, {
                    // @ts-expect-error testing unsupported provider
                    provider: 'unsupported-provider',
                    // @ts-expect-error testing unsupported model
                    model: 'unsupported-model',
                }),
        ).toThrowError();
    });

    it('should reject initialization with an unsupported model for a provider', () => {
        expect(
            () =>
                // @ts-expect-error testing unsupported model
                new Copilot(MOCK_API_KEY, {provider: 'groq', model: 'gpt-4o'}),
        ).toThrow(
            `Model "gpt-4o" is not supported by the "groq" provider. Supported models: ${joinWithAnd(
                PROVIDER_MODEL_MAP['groq'],
            )}`,
        );
    });

    it('should require a valid API key for initialization', () => {
        expect(() => new Copilot('', {} as any)).toThrow(
            `Please provide an API key.`,
        );
    });

    it('should require valid options for initialization', () => {
        expect(() => new Copilot(MOCK_API_KEY, {} as any)).toThrow(
            `Please provide options.`,
        );
    });

    it('should reject custom model configuration when provider is specified', () => {
        expect(
            () =>
                new Copilot(MOCK_API_KEY, {
                    provider: TEST_PROVIDER,
                    model: {
                        config: vi.fn().mockReturnValue({
                            endpoint:
                                'https://custom-api.com/v1/chat/completions',
                        }),
                        transformResponse: vi.fn(),
                    },
                } as any),
        ).toThrow(
            'Provider should not be specified when using a custom model.',
        );
    });

    it('should require a provider when using built-in models', () => {
        expect(
            () =>
                new Copilot(MOCK_API_KEY, {
                    model: 'gpt-4o',
                } as any),
        ).toThrow(
            `Provider must be specified and supported when using built-in models. Please choose from: ${joinWithAnd(
                PROVIDERS,
            )}`,
        );
    });

    it('should require both config and transformResponse for custom model', () => {
        expect(
            () =>
                new Copilot(MOCK_API_KEY, {
                    model: {
                        transformResponse: vi.fn(),
                    },
                } as any),
        ).toThrow(
            'Please ensure both config and transformResponse are provided for custom model.',
        );
    });

    it('should successfully initialize with valid provider and model', () => {
        const copilot = new Copilot(MOCK_API_KEY, {
            provider: 'openai',
            model: 'gpt-4o',
        });
        expect(copilot['model']).toBe('gpt-4o');
        expect(copilot['provider']).toBe('openai');
    });

    it('should successfully initialize with custom model configuration', () => {
        const copilot = new Copilot(MOCK_API_KEY, {
            model: {
                config: vi.fn(),
                transformResponse: vi.fn(),
            },
        });
        expect(copilot['model']).toBeDefined();
    });
});
