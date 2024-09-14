import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {CompletionMetadata, Copilot} from '../src';
import {
  CHAT_COMPLETION_ENDPOINT_BY_PROVIDER,
  COMPLETION_MODEL_IDS,
  DEFAULT_COMPLETION_MODEL,
  DEFAULT_COMPLETION_PROVIDER,
  DEFAULT_COMPLETION_TEMPERATURE,
} from '../src/constants';
import {HTTP} from '../src/utils';
import {
  MOCK_COMPLETION_CONTENT,
  mockApiKey,
  mockCompletion,
  mockCompletionMetadata,
  mockEmptyCompletion,
  mockError,
  mockNetworkError,
} from './mock';

describe('Completion', () => {
  let copilot: Copilot;

  beforeEach(() => {
    copilot = new Copilot(mockApiKey);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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
        'No completion found in the Groq response',
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

  it('should pass complete CompletionMetadata to customPrompt and handle optional properties correctly', () => {
    const customPrompt = (metadata: CompletionMetadata) => ({
      system: 'Custom system prompt',
      user: `Custom user prompt: ${metadata.textBeforeCursor}`,
    });

    const prompt = customPrompt(mockCompletionMetadata);

    expect(prompt.system).toBe('Custom system prompt');
    expect(prompt.user).toBe('Custom user prompt: function hello() {');
    expect(prompt.system).toBeDefined();
    expect(prompt.user).toBeDefined();
    expect(prompt.system).not.toBeUndefined();
    expect(prompt.user).not.toBeUndefined();
  });

  it('should not include system message for o1-preview model', async () => {
    const customCopilot = new Copilot(mockApiKey, {
      provider: 'openai',
      model: 'o1-preview',
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
        model: COMPLETION_MODEL_IDS['o1-preview'],
        messages: expect.arrayContaining([
          {role: 'user', content: expect.any(String)},
        ]),
      }),
      expect.any(Object),
    );

    expect(HTTP.POST).toHaveBeenCalledWith(
      expect.any(String),
      expect.not.objectContaining({
        messages: expect.arrayContaining([
          {role: 'system', content: expect.any(String)},
        ]),
      }),
      expect.any(Object),
    );
  });

  it('should not include system message for o1-mini model', async () => {
    const customCopilot = new Copilot(mockApiKey, {
      provider: 'openai',
      model: 'o1-mini',
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
        model: COMPLETION_MODEL_IDS['o1-mini'],
        messages: expect.arrayContaining([
          {role: 'user', content: expect.any(String)},
        ]),
      }),
      expect.any(Object),
    );

    expect(HTTP.POST).toHaveBeenCalledWith(
      expect.any(String),
      expect.not.objectContaining({
        messages: expect.arrayContaining([
          {role: 'system', content: expect.any(String)},
        ]),
      }),
      expect.any(Object),
    );
  });

  it('should include system message for non-o1 models', async () => {
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
        messages: expect.arrayContaining([
          {role: 'system', content: expect.any(String)},
          {role: 'user', content: expect.any(String)},
        ]),
      }),
      expect.any(Object),
    );
  });
});
