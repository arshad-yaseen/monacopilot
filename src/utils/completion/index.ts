import {LLMCodeFormatter} from '../../classes/llm-code-formatter';
import {
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
} from '../../types';

export const formatCompletion = (completion: string): string => {
  return LLMCodeFormatter.create(completion)
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
});
