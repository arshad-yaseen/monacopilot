import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {Copilot} from '../src';
import {HTTP} from '../src/utils';
import {mockApiKey, mockCompletion, mockCompletionMetadata} from './mock';

describe('Copilot Performance Tests', () => {
  let copilot: Copilot;

  beforeEach(() => {
    copilot = new Copilot(mockApiKey);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should complete 1000 requests within a reasonable time', async () => {
    vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

    const startTime = performance.now();
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      await copilot.complete({
        body: {
          completionMetadata: mockCompletionMetadata,
        },
      });
    }

    const endTime = performance.now();
    const totalTime = endTime - startTime;

    console.log(`Time taken for ${iterations} iterations: ${totalTime}ms`);

    expect(totalTime).toBeLessThan(4);
  });

  it('should handle concurrent requests efficiently', async () => {
    vi.spyOn(HTTP, 'POST').mockResolvedValue(mockCompletion);

    const startTime = performance.now();
    const iterations = 100;
    const concurrentRequests = 10;

    const requests = Array(iterations)
      .fill(null)
      .map(() =>
        Promise.all(
          Array(concurrentRequests)
            .fill(null)
            .map(() =>
              copilot.complete({
                body: {
                  completionMetadata: mockCompletionMetadata,
                },
              }),
            ),
        ),
      );

    await Promise.all(requests);

    const endTime = performance.now();
    const totalTime = endTime - startTime;

    console.log(
      `Time taken for ${iterations * concurrentRequests} concurrent requests: ${totalTime}ms`,
    );

    expect(totalTime).toBeLessThan(4);
  });
});
