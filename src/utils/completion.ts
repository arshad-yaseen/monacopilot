import {CompletionFormatter} from '../classes';
import {EditorInlineCompletion, EditorInlineCompletionsResult} from '../types';

export const formatCompletion = (completion: string): string => {
  return CompletionFormatter.create(completion)
    .removeMarkdownCodeSyntax()
    .removeExcessiveNewlines()
    .removeInvalidLineBreaks()
    .build();
};

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
  suppressSuggestions: true,
});
