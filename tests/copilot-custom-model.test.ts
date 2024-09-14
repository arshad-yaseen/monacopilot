import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {Copilot} from '../src';
import {HTTP} from '../src/utils';
import {mockApiKey, mockCompletion, mockCompletionMetadata} from './mock';

describe('Copilot with customModel', () => {
  let copilot: Copilot;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should use custom model configuration when provided', async () => {
    const customConfig = vi.fn().mockReturnValue({
      endpoint: 'https://custom-api.com/v1/chat/completions',
      headers: {'X-Custom-Header': 'custom-value'},
      body: {custom: 'data'},
    });
    const customResponse = vi
      .fn()
      .mockReturnValue({completion: 'Custom response'});

    copilot = new Copilot(mockApiKey, {
      customModel: {
        config: customConfig,
        response: customResponse,
      },
    });

    vi.spyOn(HTTP, 'POST').mockResolvedValue({custom: 'response'});

    const result = await copilot.complete({
      body: {
        completionMetadata: mockCompletionMetadata,
      },
    });

    expect(customConfig).toHaveBeenCalledWith(mockApiKey, expect.any(Object));
    expect(HTTP.POST).toHaveBeenCalledWith(
      'https://custom-api.com/v1/chat/completions',
      {custom: 'data'},
      expect.objectContaining({
        headers: expect.objectContaining({'X-Custom-Header': 'custom-value'}),
      }),
    );
    expect(customResponse).toHaveBeenCalledWith({custom: 'response'});
    expect(result).toEqual({completion: 'Custom response'});
  });

  it('should handle errors in custom model response', async () => {
    const customConfig = vi.fn().mockReturnValue({
      endpoint: 'https://custom-api.com/v1/chat/completions',
    });
    const customResponse = vi.fn().mockImplementation(() => {
      throw new Error('Custom response error');
    });

    copilot = new Copilot(mockApiKey, {
      customModel: {
        config: customConfig,
        response: customResponse,
      },
    });

    vi.spyOn(HTTP, 'POST').mockResolvedValue({custom: 'response'});

    const result = await copilot.complete({
      body: {
        completionMetadata: mockCompletionMetadata,
      },
    });

    expect(result).toEqual({
      error: expect.stringContaining('Custom response error'),
      completion: null,
    });
  });

  it('should use default provider when customModel is not provided', async () => {
    copilot = new Copilot(mockApiKey);

    vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

    await copilot.complete({
      body: {
        completionMetadata: mockCompletionMetadata,
      },
    });

    expect(HTTP.POST).toHaveBeenCalledWith(
      expect.stringContaining('api.groq.com'),
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('should allow partial override of default configuration', async () => {
    const customConfig = vi.fn().mockReturnValue({
      headers: {'X-Custom-Header': 'custom-value'},
    });
    const customResponse = vi
      .fn()
      .mockReturnValue({completion: 'Custom response'});

    copilot = new Copilot(mockApiKey, {
      customModel: {
        config: customConfig,
        response: customResponse,
      },
    });

    vi.spyOn(HTTP, 'POST').mockResolvedValue({custom: 'response'});

    await copilot.complete({
      body: {
        completionMetadata: mockCompletionMetadata,
      },
    });

    expect(HTTP.POST).toHaveBeenCalledWith(
      expect.stringContaining('api.groq.com'),
      expect.any(Object),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-Custom-Header': 'custom-value',
          Authorization: expect.stringContaining('Bearer'),
        }),
      }),
    );
  });
});
