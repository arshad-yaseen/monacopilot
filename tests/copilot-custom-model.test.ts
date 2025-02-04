import {Copilot} from 'core/copilot/instance';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {HTTP} from 'utils/http';

import {MOCK_API_KEY, MOCK_COMPLETION_METADATA} from './mock';

describe('Copilot with model', () => {
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
    const customResponse = vi.fn().mockReturnValue({text: 'Custom response'});

    copilot = new Copilot(MOCK_API_KEY, {
      model: {
        config: customConfig,
        transformResponse: customResponse,
      },
    });

    vi.spyOn(HTTP, 'POST').mockResolvedValue({custom: 'response'});

    const result = await copilot.complete({
      body: {
        completionMetadata: MOCK_COMPLETION_METADATA,
      },
    });

    expect(customConfig).toHaveBeenCalledWith(MOCK_API_KEY, expect.any(Object));
    expect(HTTP.POST).toHaveBeenCalledWith(
      'https://custom-api.com/v1/chat/completions',
      {custom: 'data'},
      expect.objectContaining({
        headers: expect.objectContaining({'X-Custom-Header': 'custom-value'}),
      }),
    );
    expect(customResponse).toHaveBeenCalledWith({custom: 'response'});
    expect(result).toEqual({
      completion: 'Custom response',
      raw: {custom: 'response'},
    });
  });

  it('should handle errors in custom model response', async () => {
    const customConfig = vi.fn().mockReturnValue({
      endpoint: 'https://custom-api.com/v1/chat/completions',
    });
    const customResponse = vi.fn().mockImplementation(() => {
      throw new Error('Custom response error');
    });

    copilot = new Copilot(MOCK_API_KEY, {
      model: {
        config: customConfig,
        transformResponse: customResponse,
      },
    });

    vi.spyOn(HTTP, 'POST').mockResolvedValue({custom: 'response'});

    const result = await copilot.complete({
      body: {
        completionMetadata: MOCK_COMPLETION_METADATA,
      },
    });

    expect(result).toEqual({
      error: expect.stringContaining('Custom response error'),
      completion: null,
    });
  });
});
