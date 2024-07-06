import {CompletionCache, EditorModel, EditorPosition} from '../../types';

/**
 * First-in-first-out cache for completion items.
 */
const MAX_CACHE_SIZE = 20;
const COMPLETION_LOOKBACK = 3;

const completionCache = new Set<CompletionCache>();

/**
 * Retrieves completion cache items based on the current position and model.
 * @param position - The current editor position.
 * @param model - The editor model.
 * @returns An array of filtered completion cache items.
 */
export function getCompletionCache(
  position: EditorPosition,
  model: EditorModel,
): CompletionCache[] {
  return Array.from(completionCache).filter(cache => {
    const currentValueInRange = model.getValueInRange(cache.range);

    return (
      cache.completion.startsWith(currentValueInRange) &&
      cache.range.startLineNumber === position.lineNumber &&
      position.column >= cache.range.startColumn - COMPLETION_LOOKBACK
    );
  });
}

/**
 * Adds a new completion cache item, maintaining the maximum cache size.
 * @param cacheItem - The completion cache item to add.
 */
export function addCompletionCache(cacheItem: CompletionCache): void {
  if (completionCache.size >= MAX_CACHE_SIZE) {
    const oldestItem = completionCache.values().next().value;
    completionCache.delete(oldestItem);
  }

  completionCache.add(cacheItem);
}

/**
 * Clears the entire completion cache.
 */
export function clearCompletionCache(): void {
  completionCache.clear();
}
