import {CompletionCache, EditorModel, EditorPosition} from '../../types';
import {getTextBeforeCursorInLine} from '../editor';

/**
 * First-in-first-out cache for completion items.
 */
const MAX_CACHE_SIZE = 10;
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
      // Check if the current text before cursor in line starts with the cached text before cursor
      currentTextBeforeCursorInLine.startsWith(cache.textBeforeCursorInLine) &&
      // Ensure crsor is at the start of the cached range
      ((cache.range.startLineNumber === position.lineNumber &&
        position.column === cache.range.startColumn) ||
        // Ensure cached completion starts with the current value in cached range
        (cache.completion.startsWith(currentValueInRange) &&
          // Ensure the cursor is within the cached range
          cache.range.startLineNumber === position.lineNumber &&
          position.column >=
            cache.range.startColumn - currentValueInRange.length &&
          position.column <= cache.range.endColumn))
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
