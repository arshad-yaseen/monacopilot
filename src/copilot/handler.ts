import {CompletionValidator} from '../classes';
import {err} from '../error';
import {fetchCompletionItem} from '../helpers';
import {
  EditorInlineCompletionsResult,
  InlineCompletionHandlerParams,
} from '../types';
import {debounce, getTextBeforeCursorInLine} from '../utils';
import {
  addCompletionCache,
  computeCompletionInsertRange,
  createInlineCompletionResult,
  formatCompletion,
  getCompletionCache,
} from '../utils/completion';

const DEBOUNCE_DELAY = 250;

const debouncedFetchCompletionItem = debounce(
  fetchCompletionItem,
  DEBOUNCE_DELAY,
);

/**
 * Handles inline completions for the editor
 * @param monaco - Monaco editor instance
 * @param model - Current editor model
 * @param position - Current cursor position
 * @param context - Inline completion context (unused)
 * @param token - Cancellation token
 * @param hasCompletionBeenAccepted - Whether the completion was accepted
 * @param onShowCompletion - Callback on showing completion
 * @param options - Additional options for completion
 * @returns Promise resolving to EditorInlineCompletionsResult
 */
const handleInlineCompletions = async ({
  monaco,
  model,
  position,
  token,
  hasCompletionBeenAccepted,
  onShowCompletion,
  options,
}: InlineCompletionHandlerParams): Promise<EditorInlineCompletionsResult> => {
  const text = model.getValue();
  const range = new monaco.Range(
    position.lineNumber,
    position.column,
    position.lineNumber,
    position.column,
  );

  // Validate if completions should be provided
  if (!new CompletionValidator(position, model).shouldProvideCompletions()) {
    return createInlineCompletionResult([]);
  }

  // Check if there are cached completions for the context
  const cachedCompletions = getCompletionCache(position, model).map(cache => ({
    insertText: cache.completion,
    range: cache.range,
  }));
  if (cachedCompletions.length) {
    onShowCompletion();
    return createInlineCompletionResult(cachedCompletions);
  }

  if (token.isCancellationRequested) {
    return createInlineCompletionResult([]);
  }

  // If user accepted the completion, return empty completions
  // This is to prevent immediate unnecessary fetching of new completion from Groq API after user accepts the completion
  if (hasCompletionBeenAccepted) {
    return createInlineCompletionResult([]);
  }

  try {
    const completion = await debouncedFetchCompletionItem({
      ...options,
      text,
      model,
      position,
    });

    if (completion) {
      const formattedCompletion = formatCompletion(model, position, completion);
      const completionInsertRange = computeCompletionInsertRange(
        formattedCompletion,
        range,
        position,
        model,
      );

      addCompletionCache({
        completion: formattedCompletion,
        range: completionInsertRange,
        textBeforeCursorInLine: getTextBeforeCursorInLine(position, model),
      });

      onShowCompletion();
      return createInlineCompletionResult([
        {insertText: formattedCompletion, range: completionInsertRange},
      ]);
    }
  } catch (error) {
    err(error).completionError('Failed to fetch completion item');
  }

  return createInlineCompletionResult([]);
};

export default handleInlineCompletions;
