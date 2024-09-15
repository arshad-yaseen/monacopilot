import {describe, expect, it} from 'vitest';

import {Copilot} from '../src/classes/copilot';
import {
  COMPLETION_PROVIDER_MODEL_MAP,
  DEFAULT_COMPLETION_MODEL,
  DEFAULT_COMPLETION_PROVIDER,
} from '../src/constants';
import {joinWithAnd} from '../src/utils';
import {mockApiKey} from './mock';

describe('Copilot', () => {
  it('should initialize with default values when no options are provided', () => {
    const copilot = new Copilot(mockApiKey);
    expect(copilot['model']).toBe(DEFAULT_COMPLETION_MODEL);
    expect(copilot['provider']).toBe(DEFAULT_COMPLETION_PROVIDER);
  });

  it('should throw an error when an unsupported provider is provided', () => {
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

  it('should throw an error when an unsupported model is provided for a provider', () => {
    expect(
      () => new Copilot(mockApiKey, {provider: 'groq', model: 'gpt-4o'}),
    ).toThrow(
      `Model "gpt-4o" is not supported by the "groq" provider. Supported models: ${joinWithAnd(
        COMPLETION_PROVIDER_MODEL_MAP['groq'],
      )}`,
    );
  });

  it('should throw an error when no API key is provided', () => {
    expect(() => new Copilot('')).toThrow(`Please provide an API key.`);
  });

  it('should initialize correctly with valid provider and model', () => {
    const copilot = new Copilot(mockApiKey, {
      provider: 'openai',
      model: 'gpt-4o',
    });
    expect(copilot['model']).toBe('gpt-4o');
    expect(copilot['provider']).toBe('openai');
  });
});
