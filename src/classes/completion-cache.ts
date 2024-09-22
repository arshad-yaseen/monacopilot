import {CompletionCacheItem, CursorPosition, EditorModel} from '../types';
import {getTextBeforeCursorInLine} from '../utils/editor';

/**
 * CompletionCache class manages a cache of completion code completions.
 * It provides methods to get, add, and clear completion cache items.
 * The cache implements a First-In-First-Out (FIFO) mechanism.
 */
export class CompletionCache {
  private static readonly MAX_CACHE_SIZE = 10;
  private cache: readonly CompletionCacheItem[] = [];

  public getCompletionCache(
    pos: Readonly<CursorPosition>,
    mdl: Readonly<EditorModel>,
  ): readonly CompletionCacheItem[] {
    return this.cache.filter(cache => this.isCacheItemValid(cache, pos, mdl));
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
    pos: Readonly<CursorPosition>,
    mdl: Readonly<EditorModel>,
  ): boolean {
    const currentValueInRange = mdl.getValueInRange(cache.range);
    const currentTextBeforeCursorInLine = getTextBeforeCursorInLine(pos, mdl);

    return (
      currentTextBeforeCursorInLine.startsWith(cache.textBeforeCursorInLine) &&
      this.isPositionValid(cache, pos, currentValueInRange)
    );
  }

  private isPositionValid(
    cache: Readonly<CompletionCacheItem>,
    pos: Readonly<CursorPosition>,
    currentValueInRange: string,
  ): boolean {
    return (
      // Check if the cursor is at the start of the cached range
      (cache.range.startLineNumber === pos.lineNumber &&
        pos.column === cache.range.startColumn) ||
      // Check if the current value in range is a prefix of the cached completion
      // and the cursor is within the valid range for this completion
      (cache.completion.startsWith(currentValueInRange) &&
        cache.range.startLineNumber === pos.lineNumber &&
        // Ensure the cursor is not before the start of the completion
        pos.column >= cache.range.startColumn - currentValueInRange.length &&
        // Ensure the cursor is not after the end of the completion
        pos.column <= cache.range.endColumn)
    );
  }
}
