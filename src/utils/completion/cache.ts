import {CompletionCache, EditorModel, EditorPosition} from '../../types';
import {getTextBeforeCursorInLine} from '../editor';

/**
 * First-in-first-out cache for completion items.
 */
const MAX_CACHE_SIZE = 15;
const completionCache: CompletionCache[] = [];

/**
 * Retrieves completion cache items based on the current position and range.
 * @param position - The current editor position.
 * @param model - The editor model.
 * @returns An array of filtered completion cache items.
 */
export const getCompletionCache = (
  position: EditorPosition,
  model: EditorModel,
): CompletionCache[] =>
  completionCache.filter(cache => {
    const currentValueInRange = model.getValueInRange(cache.range);
    const currentTextBeforeCursorInLine = getTextBeforeCursorInLine(
      position,
      model,
    );

    return (
      (currentTextBeforeCursorInLine === cache.textBeforeCursorInLine &&
        cache.range.startLineNumber === position.lineNumber &&
        position.column === cache.range.startColumn) ||
      (cache.completion.startsWith(currentValueInRange) &&
        cache.range.startLineNumber === position.lineNumber &&
        position.column >=
          cache.range.startColumn - currentValueInRange.length &&
        position.column <= cache.range.endColumn)
    );
  });

/**
 * Adds a new completion cache item, maintaining the maximum cache size.
 * @param cacheItem - The completion cache item to add.
 */
export const addCompletionCache = (cacheItem: CompletionCache): void => {
  if (completionCache.length >= MAX_CACHE_SIZE) {
    completionCache.shift();
  }
  completionCache.push(cacheItem);
};

/**
 * Clears the entire completion cache.
 */
export const clearCompletionCache = (): void => {
  completionCache.length = 0;
};
