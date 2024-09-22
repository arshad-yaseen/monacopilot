import {CompletionValidator} from '../../classes';
import {CompletionCache} from '../../classes/completion-cache';
import {ErrorContext, handleError} from '../../error';
import {fetchCompletionItem} from '../../helpers';
import {
  EditorInlineCompletionsResult,
  InlineCompletionHandlerParams,
  TriggerType,
} from '../../types';
import {asyncDebounce, getTextBeforeCursorInLine} from '../../utils';
import {
  computeCompletionInsertionRange,
  createInlineCompletionResult,
  formatCompletion,
} from '../../utils/completion';

const ON_TYPING_DEBOUNCE_DELAY = 300;
const ON_IDLE_DEBOUNCE_DELAY = 600;

const debouncedFetchCompletionItem = {
  [TriggerType.OnTyping]: asyncDebounce(
    fetchCompletionItem,
    ON_TYPING_DEBOUNCE_DELAY,
  ),
  [TriggerType.OnIdle]: asyncDebounce(
    fetchCompletionItem,
    ON_IDLE_DEBOUNCE_DELAY,
  ),
};

export const completionCache = new CompletionCache();

/**
 * Handles inline completions for the editor.
 * @param params - Inline completion handler parameters.
 * @returns A promise resolving to EditorInlineCompletionsResult.
 */
const handleInlineCompletions = async ({
  mdl,
  pos,
  token,
  isCompletionAccepted,
  onShowCompletion,
  options,
}: InlineCompletionHandlerParams): Promise<EditorInlineCompletionsResult> => {
  const {trigger = TriggerType.OnIdle, ...restOptions} = options;

  if (!new CompletionValidator(pos, mdl).shouldProvideCompletions()) {
    return createInlineCompletionResult([]);
  }

  const cachedCompletions = completionCache
    .getCompletionCache(pos, mdl)
    .map(cache => ({
      insertText: cache.completion,
      range: cache.range,
    }));

  if (cachedCompletions.length > 0) {
    onShowCompletion();
    return createInlineCompletionResult(cachedCompletions);
  }

  if (token.isCancellationRequested || isCompletionAccepted) {
    return createInlineCompletionResult([]);
  }

  try {
    const triggerType =
      trigger === TriggerType.OnTyping
        ? TriggerType.OnTyping
        : TriggerType.OnIdle;

    const fetchCompletion = debouncedFetchCompletionItem[triggerType];

    token.onCancellationRequested(() => {
      fetchCompletion.cancel();
    });

    const completion = await fetchCompletion({
      ...restOptions,
      text: mdl.getValue(),
      mdl,
      pos,
    });

    if (completion) {
      const formattedCompletion = formatCompletion(completion);

      const completionInsertRange = computeCompletionInsertionRange(
        pos,
        mdl,
        formattedCompletion,
      );

      completionCache.addCompletionCache({
        completion: formattedCompletion,
        range: completionInsertRange,
        textBeforeCursorInLine: getTextBeforeCursorInLine(pos, mdl),
      });

      onShowCompletion();
      return createInlineCompletionResult([
        {insertText: formattedCompletion, range: completionInsertRange},
      ]);
    }
  } catch (err) {
    if (isCancellationError(err)) {
      return createInlineCompletionResult([]);
    }
    handleError(err, ErrorContext.FETCH_COMPLETION_ITEM);
  }

  return createInlineCompletionResult([]);
};

export const isCancellationError = (err: any): boolean => {
  return (
    (typeof err === 'string' &&
      (err === 'Cancelled' || err === 'AbortError')) ||
    (err instanceof Error &&
      (err.message === 'Cancelled' || err.name === 'AbortError'))
  );
};

export default handleInlineCompletions;
