import {fetchCompletionItem} from '../../helpers';
import {
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
  EditorRange,
} from '../../types';
import {debounce} from '../../utils';

export * from './cache';
export * from './syntax-parser';

export const debouncedFetchCompletionItem = debounce(fetchCompletionItem, 250);

export const createCompletionItem = (
  insertText: string,
  range: EditorRange,
  completeBracketPairs: boolean = false,
): EditorInlineCompletion => ({
  insertText: {snippet: insertText},
  range,
  completeBracketPairs,
});

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
});
