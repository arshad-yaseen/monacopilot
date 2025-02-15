import type {CompletionCacheItem} from '../types/cache';
import type {CursorPosition, EditorModel} from '../types/monaco';
import {getTextBeforeCursor} from '../utils/editor';
import {Queue} from './queue';

export class CompletionCache {
    private static readonly MAX_CACHE_SIZE = 20;
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
        if (!cacheItem.completion.trim()) {
            return;
        }
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

        if (!textBeforeCursor.includes(cacheItem.textBeforeCursor)) {
            return false;
        }

        if (!this.isPartialMatch(currentRangeValue, cacheItem.completion)) {
            return false;
        }

        return this.isPositionValid(cacheItem, pos);
    }

    private isPartialMatch(current: string, cached: string): boolean {
        return cached.startsWith(current) || current.startsWith(cached);
    }

    private isPositionValid(
        cacheItem: Readonly<CompletionCacheItem>,
        pos: Readonly<CursorPosition>,
    ): boolean {
        const {range} = cacheItem;
        const {startLineNumber, startColumn, endLineNumber, endColumn} = range;
        const {lineNumber, column} = pos;

        const isInLineRange =
            lineNumber >= startLineNumber && lineNumber <= endLineNumber;
        if (!isInLineRange) {
            return false;
        }

        if (lineNumber === startLineNumber && lineNumber === endLineNumber) {
            return column >= startColumn - 1 && column <= endColumn + 1;
        }

        if (lineNumber === startLineNumber) {
            return column >= startColumn - 1;
        }
        if (lineNumber === endLineNumber) {
            return column <= endColumn + 1;
        }

        return true;
    }
}
