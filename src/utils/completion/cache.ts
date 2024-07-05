import {CompletionCacheItem, EditorInlineCompletion} from '../../types';

const COMPLETION_CACHE = new Map<string, CompletionCacheItem>();

export const cacheCompletionItem = (
  key: string,
  item: EditorInlineCompletion,
): void => {
  COMPLETION_CACHE.set(key, item);
};

export const getCachedItem = (key: string): CompletionCacheItem | undefined => {
  return COMPLETION_CACHE.get(key);
};

export const clearCache = (): void => {
  COMPLETION_CACHE.clear();
};
