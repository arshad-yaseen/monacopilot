import {CompletionValidator} from '../classes';
import {CompletionCache} from '../classes/completion-cache';
import {ErrorContext, handleError} from '../error';
import {fetchCompletionItem} from '../helpers';
import {
  EditorInlineCompletionsResult,
  InlineCompletionHandlerParams,
} from '../types';
import {asyncDebounce, getTextBeforeCursorInLine} from '../utils';
import {
  computeCompletionInsertRange,
  createInlineCompletionResult,
  formatCompletion,
} from '../utils/completion';

const DEBOUNCE_DELAY = 300;

const debouncedFetchCompletionItem = asyncDebounce(
  fetchCompletionItem,
  DEBOUNCE_DELAY,
);

export const completionCache = new CompletionCache();

/**
 * Handles inline completions for the editor
 * @param params - Inline completion handler parameters
 * @returns Promise resolving to EditorInlineCompletionsResult
 */
const handleInlineCompletions = async ({
  monaco,
  model,
  position,
  token,
  isCompletionAccepted,
  onShowCompletion,
  options,
}: InlineCompletionHandlerParams): Promise<EditorInlineCompletionsResult> => {
  if (!new CompletionValidator(position, model).shouldProvideCompletions()) {
    return createInlineCompletionResult([]);
  }

  const cachedCompletions = completionCache
    .getCompletionCache(position, model)
    .map(cache => ({
      insertText: cache.completion,
      range: cache.range,
    }));

  if (cachedCompletions.length) {
    onShowCompletion();
    return createInlineCompletionResult(cachedCompletions);
  }

  if (token.isCancellationRequested || isCompletionAccepted) {
    return createInlineCompletionResult([]);
  }

  try {
    const completionPromise = debouncedFetchCompletionItem({
      ...options,
      text: model.getValue(),
      model,
      position,
    });

    token.onCancellationRequested(() => {
      debouncedFetchCompletionItem.cancel();
    });

    const completion = await completionPromise;

    if (completion) {
      const formattedCompletion = formatCompletion(completion);
      const range = new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column,
      );
      const completionInsertRange = computeCompletionInsertRange(
        formattedCompletion,
        range,
        position,
        model,
      );

      completionCache.addCompletionCache({
        completion: formattedCompletion,
        range: completionInsertRange,
        textBeforeCursorInLine: getTextBeforeCursorInLine(position, model),
      });

      onShowCompletion();
      return createInlineCompletionResult([
        {insertText: formattedCompletion, range: completionInsertRange},
      ]);
    }
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === 'Cancelled' || err.name === 'AbortError')
    ) {
      return createInlineCompletionResult([]);
    }
    handleError(err, ErrorContext.FETCH_COMPLETION_ITEM);
  }

  return createInlineCompletionResult([]);
};

export default handleInlineCompletions;
