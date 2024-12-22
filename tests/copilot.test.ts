import {describe, expect, it, vi} from 'vitest';

import {Copilot} from '../src/classes/copilot';
import {COPILOT_PROVIDER_MODEL_MAP, COPILOT_PROVIDERS} from '../src/constants';
import {joinWithAnd} from '../src/utils';
import {mockApiKey, TEST_PROVIDER} from './mock';

describe('Copilot', () => {
  it('should reject initialization with an unsupported provider', () => {
    expect(
      () =>
        new Copilot(mockApiKey, {
          // @ts-expect-error testing unsupported provider
          provider: 'unsupported-provider',
          // @ts-expect-error testing unsupported model
          model: 'unsupported-model',
        }),
    ).toThrowError();
  });

  it('should reject initialization with an unsupported model for a provider', () => {
    expect(
      // @ts-expect-error testing unsupported model
      () => new Copilot(mockApiKey, {provider: 'groq', model: 'gpt-4o'}),
    ).toThrow(
      `Model "gpt-4o" is not supported by the "groq" provider. Supported models: ${joinWithAnd(
        COPILOT_PROVIDER_MODEL_MAP['groq'],
      )}`,
    );
  });

  it('should require a valid API key for initialization', () => {
    expect(() => new Copilot('', {} as any)).toThrow(
      `Please provide an API key.`,
    );
  });

  it('should require valid options for initialization', () => {
    expect(() => new Copilot(mockApiKey, {} as any)).toThrow(
      `Please provide options.`,
    );
  });

  it('should reject custom model configuration when provider is specified', () => {
    expect(
      () =>
        new Copilot(mockApiKey, {
          provider: TEST_PROVIDER,
          model: {
            config: vi.fn().mockReturnValue({
              endpoint: 'https://custom-api.com/v1/chat/completions',
            }),
            transformResponse: vi.fn(),
          },
        } as any),
    ).toThrow('Provider should not be specified when using a custom model.');
  });

  it('should require a provider when using built-in models', () => {
    expect(
      () =>
        new Copilot(mockApiKey, {
          model: 'gpt-4o',
        } as any),
    ).toThrow(
      `Provider must be specified and supported when using built-in models. Please choose from: ${joinWithAnd(
        COPILOT_PROVIDERS,
      )}`,
    );
  });

  it('should require both config and transformResponse for custom model', () => {
    expect(
      () =>
        new Copilot(mockApiKey, {
          model: {
            transformResponse: vi.fn(),
          },
        } as any),
    ).toThrow(
      'Please ensure both config and transformResponse are provided for custom model.',
    );
  });

  it('should successfully initialize with valid provider and model', () => {
    const copilot = new Copilot(mockApiKey, {
      provider: 'openai',
      model: 'gpt-4o',
    });
    expect(copilot['model']).toBe('gpt-4o');
    expect(copilot['provider']).toBe('openai');
  });

  it('should successfully initialize with custom model configuration', () => {
    const copilot = new Copilot(mockApiKey, {
      model: {
        config: vi.fn(),
        transformResponse: vi.fn(),
      },
    });
    expect(copilot['model']).toBeDefined();
  });
});
