import {CompletionCacheItem} from '../../types';

/**
 * First-in-first-out cache for completion items.
 */

const MAX_CACHE_SIZE = 8;

const COMPLETION_CACHE = new Set<CompletionCacheItem>();

export const getCompletionCache = (): CompletionCacheItem[] => {
  return Array.from(COMPLETION_CACHE);
};

export const addCompletionCache = (cacheItem: CompletionCacheItem) => {
  if (COMPLETION_CACHE.size >= MAX_CACHE_SIZE) {
    COMPLETION_CACHE.delete(COMPLETION_CACHE.values().next().value);
  }

  COMPLETION_CACHE.add(cacheItem);
};

export const clearCompletionCache = (): void => {
  COMPLETION_CACHE.clear();
};
