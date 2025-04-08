import type { CompletionCacheItem } from "../types/cache";
import type { CursorPosition, EditorModel } from "../types/monaco";
import { getTextBeforeCursor } from "../utils/editor";
import { Queue } from "./queue";

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
            .filter((cacheItem) => this.isValidCacheItem(cacheItem, pos, mdl));
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
        const cachedPrefix = cacheItem.textBeforeCursor.trim();
        const textBeforeCursor = getTextBeforeCursor(pos, mdl);
        let extendedTextBeforeCursor = textBeforeCursor;

        const currentLineContent = mdl.getLineContent(pos.lineNumber);
        if (
            pos.column === currentLineContent.length + 1 &&
            pos.lineNumber < mdl.getLineCount()
        ) {
            const nextLineContent = mdl.getLineContent(pos.lineNumber + 1);
            extendedTextBeforeCursor = `${textBeforeCursor}\n${nextLineContent}`;
        }

        if (
            !(
                extendedTextBeforeCursor.trim().includes(cachedPrefix) ||
                cachedPrefix.includes(extendedTextBeforeCursor.trim())
            )
        ) {
            return false;
        }

        const currentRangeValue = mdl.getValueInRange(cacheItem.range);
        if (!this.isPartialMatch(currentRangeValue, cacheItem.completion)) {
            return false;
        }

        return this.isPositionValid(cacheItem, pos);
    }

    private isPartialMatch(current: string, cached: string): boolean {
        const currentTrim = current.trim();
        const cachedTrim = cached.trim();
        return (
            cachedTrim.startsWith(currentTrim) ||
            currentTrim.startsWith(cachedTrim)
        );
    }

    private isPositionValid(
        cacheItem: Readonly<CompletionCacheItem>,
        pos: Readonly<CursorPosition>,
    ): boolean {
        const { range } = cacheItem;
        const { startLineNumber, startColumn, endLineNumber, endColumn } =
            range;
        const { lineNumber, column } = pos;

        if (lineNumber < startLineNumber || lineNumber > endLineNumber) {
            return false;
        }

        if (startLineNumber === endLineNumber) {
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
