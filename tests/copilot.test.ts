import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {CompletionMetadata} from '../src';
import {Copilot} from '../src/classes/copilot';
import {
  CHAT_COMPLETION_ENDPOINT_BY_PROVIDER,
  COMPLETION_MODEL_IDS,
  COMPLETION_PROVIDER_MODEL_MAP,
  DEFAULT_COMPLETION_MODEL,
  DEFAULT_COMPLETION_PROVIDER,
  DEFAULT_COMPLETION_TEMPERATURE,
} from '../src/constants';
import {HTTP, joinWithAnd} from '../src/utils';
import {
  MOCK_COMPLETION_CONTENT,
  mockApiKey,
  mockCompletion,
  mockCompletionMetadata,
  mockEmptyCompletion,
  mockError,
  mockNetworkError,
} from './mock';

describe('Copilot', () => {
  let copilot: Copilot;

  beforeEach(() => {
    copilot = new Copilot(mockApiKey);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default values when no options are provided', () => {
      const copilot = new Copilot('test-api-key');
      expect(copilot['model']).toBe(DEFAULT_COMPLETION_MODEL);
      expect(copilot['provider']).toBe(DEFAULT_COMPLETION_PROVIDER);
    });

    it('should throw an error when provider is set without a model', () => {
      expect(() => new Copilot('test-api-key', {provider: 'openai'})).toThrow(
        'Both provider and model must be specified together',
      );
    });

    it('should throw an error when model is set without a provider', () => {
      expect(() => new Copilot('test-api-key', {model: 'gpt-4o'})).toThrow(
        'Both provider and model must be specified together',
      );
    });

    it('should throw an error when an unsupported model is provided for a provider', () => {
      expect(
        () => new Copilot('test-api-key', {provider: 'groq', model: 'gpt-4o'}),
      ).toThrow(
        `Model gpt-4o is not supported by groq provider. Supported models: ${joinWithAnd(
          COMPLETION_PROVIDER_MODEL_MAP['groq'],
        )}`,
      );
    });

    it('should throw an error when no API key is provided', () => {
      expect(() => new Copilot('')).toThrow(
        `Please provide ${DEFAULT_COMPLETION_PROVIDER} API key.`,
      );
    });

    it('should initialize correctly with valid provider and model', () => {
      const copilot = new Copilot('test-api-key', {
        provider: 'openai',
        model: 'gpt-4o',
      });
      expect(copilot['model']).toBe('gpt-4o');
      expect(copilot['provider']).toBe('openai');
    });
  });

  describe('complete', () => {
    it('should successfully return a completion', async () => {
      vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

      const result = await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
      });

      expect(result).toEqual({completion: MOCK_COMPLETION_CONTENT});
      expect(HTTP.POST).toHaveBeenCalledWith(
        CHAT_COMPLETION_ENDPOINT_BY_PROVIDER[DEFAULT_COMPLETION_PROVIDER],
        expect.objectContaining({
          model: COMPLETION_MODEL_IDS[DEFAULT_COMPLETION_MODEL],
          messages: expect.arrayContaining([
            {role: 'system', content: expect.any(String)},
            {role: 'user', content: expect.any(String)},
          ]),
          temperature: DEFAULT_COMPLETION_TEMPERATURE,
        }),
        expect.objectContaining({
          headers: expect.any(Object),
        }),
      );
    });

    it('should handle API errors and return an error response', async () => {
      vi.spyOn(HTTP, 'POST').mockRejectedValue(mockError);

      const result = await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
      });

      expect(result).toEqual({
        error: expect.stringContaining('API Error'),
        completion: null,
      });
    });

    it('should throw an error when no completion choices are received', async () => {
      vi.spyOn(HTTP, 'POST').mockResolvedValue(mockEmptyCompletion);

      const result = await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
      });

      expect(result).toEqual({
        error: expect.stringContaining(
          'No completion found in the groq response',
        ),
        completion: null,
      });
    });

    it('should use custom provider and model when specified', async () => {
      const customCopilot = new Copilot(mockApiKey, {
        provider: 'openai',
        model: 'gpt-4o',
      });
      vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

      await customCopilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
      });

      expect(HTTP.POST).toHaveBeenCalledWith(
        CHAT_COMPLETION_ENDPOINT_BY_PROVIDER['openai'],
        expect.objectContaining({
          model: COMPLETION_MODEL_IDS['gpt-4o'],
        }),
        expect.any(Object),
      );
    });

    it('should handle network errors', async () => {
      mockError.name = 'NetworkError';
      vi.spyOn(HTTP, 'POST').mockRejectedValue(mockNetworkError);

      const result = await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
      });

      expect(result).toEqual({
        error: expect.stringContaining('Network error'),
        completion: null,
      });
    });

    it('should use custom headers in API requests', async () => {
      const customHeaders = {'X-Custom-Header': 'test-value'};
      vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

      await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
        options: {
          headers: customHeaders,
        },
      });

      expect(HTTP.POST).toHaveBeenCalledWith(
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
      vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

      await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
        options: {
          customPrompt,
        },
      });

      expect(HTTP.POST).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          messages: [
            {role: 'system', content: 'Custom system prompt'},
            {
              role: 'user',
              content: expect.stringContaining('Custom user prompt'),
            },
          ],
        }),
        expect.any(Object),
      );
    });

    it('should use default prompt when custom prompt is not provided', async () => {
      vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

      await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
      });

      expect(HTTP.POST).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          messages: [
            {role: 'system', content: expect.any(String)},
            {role: 'user', content: expect.any(String)},
          ],
        }),
        expect.any(Object),
      );
    });

    it('should use custom system prompt while retaining default user prompt', async () => {
      vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

      await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
        options: {
          customPrompt: () => ({
            system:
              'You are an AI assistant specialized in writing React components.',
          }),
        },
      });

      expect(HTTP.POST).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          messages: [
            {
              role: 'system',
              content:
                'You are an AI assistant specialized in writing React components.',
            },
            {role: 'user', content: expect.any(String)},
          ],
        }),
        expect.any(Object),
      );
    });
  });
});
