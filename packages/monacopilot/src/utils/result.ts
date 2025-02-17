import type {
    EditorInlineCompletion,
    EditorInlineCompletionsResult,
} from '../types/monaco';

export const createInlineCompletionResult = (
    items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
    items,
    enableForwardStability: true,
});
