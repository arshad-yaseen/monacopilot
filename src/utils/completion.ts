import {EditorInlineCompletion, EditorInlineCompletionsResult} from '../types';

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
  suppressSuggestions: true,
});
