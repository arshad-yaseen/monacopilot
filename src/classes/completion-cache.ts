import {CompletionCacheItem, CursorPosition, EditorModel} from '../types';
import {getTextBeforeCursor} from '../utils/editor';
import {Queue} from './queue';

/**
 * Manages a cache of code completions with FIFO eviction policy.
 * Provides methods to retrieve, add, and clear cached completion items.
 */
export class CompletionCache {
  private static readonly MAX_CACHE_SIZE = 10;
  private static readonly LOOK_AROUND = 3; // Number of characters to look around cache range
  private cache: Queue<CompletionCacheItem>;

  constructor() {
    this.cache = new Queue<CompletionCacheItem>(CompletionCache.MAX_CACHE_SIZE);
  }

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
    return this.cache
      .getAll()
      .filter(cacheItem => this.isValidCacheItem(cacheItem, pos, mdl));
  }

  /**
   * Adds a new completion item to the cache.
   * If the cache exceeds the maximum size, the oldest item is removed.
   * @param cacheItem - The completion item to add to the cache.
   */
  public add(cacheItem: Readonly<CompletionCacheItem>): void {
    this.cache.enqueue(cacheItem);
  }

  /**
   * Clears all items from the completion cache.
   */
  public clear(): void {
    this.cache.clear();
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
    const textBeforeCursor = getTextBeforeCursor(pos, mdl);

    return (
      textBeforeCursor.startsWith(cacheItem.textBeforeCursor) &&
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
    const {startLineNumber, startColumn, endLineNumber, endColumn} = range;
    const {lineNumber, column} = pos;

    // Check if cursor is at the start of the completion range
    const isAtStartOfRange =
      lineNumber === startLineNumber && column === startColumn;

    // For single line completions
    if (startLineNumber === endLineNumber) {
      return (
        isAtStartOfRange ||
        (completion.startsWith(currentRangeValue) &&
          lineNumber === startLineNumber &&
          column >= startColumn - CompletionCache.LOOK_AROUND &&
          column <= endColumn + CompletionCache.LOOK_AROUND)
      );
    }

    // Check if cursor is within the valid range for multi-line completion
    const isWithinMultiLineRange =
      completion.startsWith(currentRangeValue) &&
      lineNumber >= startLineNumber &&
      lineNumber <= endLineNumber &&
      ((lineNumber === startLineNumber &&
        column >= startColumn - CompletionCache.LOOK_AROUND) ||
        (lineNumber === endLineNumber &&
          column <= endColumn + CompletionCache.LOOK_AROUND) ||
        (lineNumber > startLineNumber && lineNumber < endLineNumber));

    return isAtStartOfRange || isWithinMultiLineRange;
  }
}
