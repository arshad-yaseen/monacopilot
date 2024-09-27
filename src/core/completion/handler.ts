import {CompletionValidator} from '../../classes';
import {CompletionCache} from '../../classes/completion-cache';
import {fetchCompletionItem} from '../../helpers';
import {logError} from '../../logger';
import {
  EditorInlineCompletionsResult,
  InlineCompletionHandlerParams,
  LoggerContext,
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
const ON_DEMAND_DEBOUNCE_DELAY = 0;

const debouncedFetchCompletionItem = {
  [TriggerType.OnTyping]: asyncDebounce(
    fetchCompletionItem,
    ON_TYPING_DEBOUNCE_DELAY,
  ),
  [TriggerType.OnIdle]: asyncDebounce(
    fetchCompletionItem,
    ON_IDLE_DEBOUNCE_DELAY,
  ),
  [TriggerType.OnDemand]: asyncDebounce(
    fetchCompletionItem,
    ON_DEMAND_DEBOUNCE_DELAY,
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

  const cachedCompletions = completionCache.get(pos, mdl).map(cache => ({
    insertText: cache.completion,
    range: {
      ...cache.range,
      // Set `endColumn` to the current cursor position
      // This ensures more accurate cache validation
      // and prevents potential issues with partial completions
      endColumn: pos.column,
    },
  }));

  if (cachedCompletions.length > 0) {
    onShowCompletion();
    return createInlineCompletionResult(cachedCompletions);
  }

  if (token.isCancellationRequested || isCompletionAccepted) {
    return createInlineCompletionResult([]);
  }

  try {
    const fetchCompletion = debouncedFetchCompletionItem[trigger];

    token.onCancellationRequested(() => {
      fetchCompletion.cancel();
    });

    const completion = await fetchCompletion({
      mdl,
      pos,
      ...restOptions,
    });

    if (completion) {
      const formattedCompletion = formatCompletion(completion);

      const completionInsertionRange = computeCompletionInsertionRange(
        pos,
        mdl,
        formattedCompletion,
      );

      completionCache.add({
        completion: formattedCompletion,
        range: completionInsertionRange,
        textBeforeCursorInLine: getTextBeforeCursorInLine(pos, mdl),
      });

      onShowCompletion();
      return createInlineCompletionResult([
        {insertText: formattedCompletion, range: completionInsertionRange},
      ]);
    }
  } catch (err) {
    if (options.onError) {
      options.onError(err as Error);
    } else if (!isCancellationError(err)) {
      logError(err, LoggerContext.FETCH_COMPLETION_ITEM);
    }

    return createInlineCompletionResult([]);
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
