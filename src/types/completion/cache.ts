import {EditorRange} from 'types/monaco';

export interface CompletionCacheItem {
    completion: string;
    range: EditorRange;
    textBeforeCursor: string;
}
