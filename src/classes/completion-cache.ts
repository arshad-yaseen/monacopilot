import {CompletionCacheItem, EditorModel, EditorPosition} from '../types';
import {getTextBeforeCursorInLine} from '../utils/editor';

/**
 * CompletionCache class manages a cache of completion code completions.
 * It provides methods to get, add, and clear completion cache items.
 * The cache implements a First-In-First-Out (FIFO) mechanism.
 */
export class CompletionCache {
  private static readonly MAX_CACHE_SIZE = 10;
  private cache: ReadonlyArray<CompletionCacheItem> = [];

  public getCompletionCache(
    position: Readonly<EditorPosition>,
    model: Readonly<EditorModel>,
  ): ReadonlyArray<CompletionCacheItem> {
    return this.cache.filter(cache =>
      this.isCacheItemValid(cache, position, model),
    );
  }

  public addCompletionCache(cacheItem: Readonly<CompletionCacheItem>): void {
    this.cache = [
      ...this.cache.slice(-(CompletionCache.MAX_CACHE_SIZE - 1)),
      cacheItem,
    ];
  }

  public clearCompletionCache(): void {
    this.cache = [];
  }

  private isCacheItemValid(
    cache: Readonly<CompletionCacheItem>,
    position: Readonly<EditorPosition>,
    model: Readonly<EditorModel>,
  ): boolean {
    const currentValueInRange = model.getValueInRange(cache.range);
    const currentTextBeforeCursorInLine = getTextBeforeCursorInLine(
      position,
      model,
    );

    return (
      currentTextBeforeCursorInLine.startsWith(cache.textBeforeCursorInLine) &&
      this.isPositionValid(cache, position, currentValueInRange)
    );
  }

  private isPositionValid(
    cache: Readonly<CompletionCacheItem>,
    position: Readonly<EditorPosition>,
    currentValueInRange: string,
  ): boolean {
    return (
      (cache.range.startLineNumber === position.lineNumber &&
        position.column === cache.range.startColumn) ||
      (cache.completion.startsWith(currentValueInRange) &&
        cache.range.startLineNumber === position.lineNumber &&
        position.column >=
          cache.range.startColumn - currentValueInRange.length &&
        position.column <= cache.range.endColumn)
    );
  }
}
