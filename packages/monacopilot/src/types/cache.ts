import type { EditorRange } from "./monaco";

export interface CompletionCacheItem {
    completion: string;
    range: EditorRange;
    textBeforeCursor: string;
}
