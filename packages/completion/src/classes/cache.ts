import type {CompletionCacheItem} from '../types/cache';
import type {CursorPosition, EditorModel} from '../types/monaco';
import {getTextBeforeCursor} from '../utils/editor';
import {Queue} from './queue';

export class CompletionCache {
    private static readonly MAX_CACHE_SIZE = 10;
    private cache: Queue<CompletionCacheItem>;

    constructor() {
        this.cache = new Queue<CompletionCacheItem>(
            CompletionCache.MAX_CACHE_SIZE,
        );
    }

    public get(
        pos: Readonly<CursorPosition>,
        mdl: Readonly<EditorModel>,
    ): readonly CompletionCacheItem[] {
        return this.cache
            .getAll()
            .filter(cacheItem => this.isValidCacheItem(cacheItem, pos, mdl));
    }

    public add(cacheItem: Readonly<CompletionCacheItem>): void {
        this.cache.enqueue(cacheItem);
    }

    public clear(): void {
        this.cache.clear();
    }

    private isValidCacheItem(
        cacheItem: Readonly<CompletionCacheItem>,
        pos: Readonly<CursorPosition>,
        mdl: Readonly<EditorModel>,
    ): boolean {
        const currentRangeValue = mdl.getValueInRange(cacheItem.range);
        const textBeforeCursor = getTextBeforeCursor(pos, mdl);

        // Ensure the current text before cursor hasn't become shorter than the cached prefix
        // and that it still starts with the same prefix.
        if (
            textBeforeCursor.length < cacheItem.textBeforeCursor.length ||
            !textBeforeCursor.startsWith(cacheItem.textBeforeCursor)
        ) {
            return false;
        }

        // Then validate the cursor position and typed code against the stored completion range
        return this.isPositionValid(cacheItem, pos, currentRangeValue);
    }

    private isPositionValid(
        cacheItem: Readonly<CompletionCacheItem>,
        pos: Readonly<CursorPosition>,
        currentRangeValue: string,
    ): boolean {
        const {range, completion} = cacheItem;
        const {startLineNumber, startColumn, endLineNumber, endColumn} = range;
        const {lineNumber, column} = pos;

        // Check if the user's current typed text (in the range) is still a valid prefix of the completion.
        if (!completion.startsWith(currentRangeValue)) {
            return false;
        }

        // Check if cursor is at the start of the completion range
        const isAtStartOfRange =
            lineNumber === startLineNumber && column === startColumn;

        // For single-line completion
        if (startLineNumber === endLineNumber) {
            // Cursor must be at start of the range or within the snippet's boundaries on the same line
            return (
                isAtStartOfRange ||
                (lineNumber === startLineNumber &&
                    column >= startColumn &&
                    column <= endColumn)
            );
        }

        // For multi-line completion, the cursor must be at start of the range or within
        // the vertical bounds. Additionally, if it's on the first or last line, it should
        // be within the horizontal bounds; otherwise, any column is acceptable.
        const isWithinMultiLineRange =
            lineNumber > startLineNumber && lineNumber < endLineNumber
                ? true
                : (lineNumber === startLineNumber && column >= startColumn) ||
                  (lineNumber === endLineNumber && column <= endColumn);

        return isAtStartOfRange || isWithinMultiLineRange;
    }
}
