import {CompletionCacheItem, CursorPosition, EditorModel} from '../../types';
import {getTextBeforeCursorInLine} from '../../utils/editor';

/**
 * Manages a cache of code completions with FIFO eviction policy.
 * Provides methods to retrieve, add, and clear cached completion items.
 */
export class CompletionCache {
  private static readonly MAX_CACHE_SIZE = 10;
  private cache: CompletionCacheItem[] = [];

  /**
   * Retrieves cached completion items that are valid based on the current cursor position and editor model.
   * @param pos - The current position of the cursor in the editor.
   * @param mdl - The current state of the editor.
   * @returns An array of valid cached completion items.
   */
  public get(
    pos: Readonly<CursorPosition>,
    mdl: Readonly<EditorModel>,
  ): readonly CompletionCacheItem[] {
    return this.cache.filter(cacheItem =>
      this.isValidCacheItem(cacheItem, pos, mdl),
    );
  }

  /**
   * Adds a new completion item to the cache.
   * If the cache exceeds the maximum size, the oldest item is removed.
   * @param cacheItem - The completion item to add to the cache.
   */
  public add(cacheItem: Readonly<CompletionCacheItem>): void {
    const updatedCache = [
      ...this.cache.slice(-(CompletionCache.MAX_CACHE_SIZE - 1)),
      cacheItem,
    ];
    this.cache = updatedCache;
  }

  /**
   * Clears all items from the completion cache.
   */
  public clear(): void {
    this.cache = [];
  }

  /**
   * Determines if a cached completion item is valid based on the current cursor position and editor model.
   */
  private isValidCacheItem(
    cacheItem: Readonly<CompletionCacheItem>,
    pos: Readonly<CursorPosition>,
    mdl: Readonly<EditorModel>,
  ): boolean {
    const currentRangeValue = mdl.getValueInRange(cacheItem.range);
    const textBeforeCursor = getTextBeforeCursorInLine(pos, mdl);

    return (
      textBeforeCursor.startsWith(cacheItem.textBeforeCursorInLine) &&
      this.isPositionValid(cacheItem, pos, currentRangeValue)
    );
  }

  /**
   * Checks if the cursor position is valid for the given cached completion item.
   */
  private isPositionValid(
    cacheItem: Readonly<CompletionCacheItem>,
    pos: Readonly<CursorPosition>,
    currentRangeValue: string,
  ): boolean {
    const {range, completion} = cacheItem;
    const {startLineNumber, startColumn, endColumn} = range;
    const {lineNumber, column} = pos;

    const isAtStartOfRange =
      lineNumber === startLineNumber && column === startColumn;

    const isWithinCompletionRange =
      completion.startsWith(currentRangeValue) &&
      lineNumber === startLineNumber &&
      column >= startColumn - currentRangeValue.length &&
      column <= endColumn + currentRangeValue.length;

    return isAtStartOfRange || isWithinCompletionRange;
  }
}
