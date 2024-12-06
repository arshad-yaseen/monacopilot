import {CompletionFormatter, CompletionValidator} from '../../classes';
import {CompletionCache} from '../../classes/completion-cache';
import {CompletionRange} from '../../classes/completion-range';
import {constructCompletionMetadata, fetchCompletionItem} from '../../helpers';
import {report} from '../../logger';
import {
  CompletionMetadata,
  EditorInlineCompletionsResult,
  FetchCompletionItemHandler,
  InlineCompletionHandlerParams,
  TriggerType,
} from '../../types';
import {debouncedAsync, getTextBeforeCursor} from '../../utils';
import {createInlineCompletionResult} from '../../utils/completion';

const DEBOUNCE_DELAYS = {
  [TriggerType.OnTyping]: 300,
  [TriggerType.OnIdle]: 600,
  [TriggerType.OnDemand]: 0,
};

/**
 * Returns a set of debounced functions for each trigger type.
 * @param fn - The function to debounce.
 * @returns An object mapping trigger types to debounced functions.
 */
const getDebouncedFunctionPerTrigger = (
  fn: FetchCompletionItemHandler,
): Record<
  TriggerType,
  ReturnType<typeof debouncedAsync<FetchCompletionItemHandler>>
> => {
  return {
    [TriggerType.OnTyping]: debouncedAsync(
      fn,
      DEBOUNCE_DELAYS[TriggerType.OnTyping],
    ),
    [TriggerType.OnIdle]: debouncedAsync(
      fn,
      DEBOUNCE_DELAYS[TriggerType.OnIdle],
    ),
    [TriggerType.OnDemand]: debouncedAsync(
      fn,
      DEBOUNCE_DELAYS[TriggerType.OnDemand],
    ),
  };
};

export const completionCache = new CompletionCache();

/**
 * Handles inline completions for the editor.
 * @param params - Inline completion handler parameters.
 * @returns A promise resolving to EditorInlineCompletionsResult.
 */
const handleInlineCompletions = async ({
  monaco,
  mdl,
  pos,
  token,
  isCompletionAccepted,
  onShowCompletion,
  options,
}: InlineCompletionHandlerParams): Promise<EditorInlineCompletionsResult> => {
  const {
    trigger = TriggerType.OnIdle,
    endpoint,
    enableCaching = true,
    onError,
    requestHandler,
  } = options;

  // Early exit if completions should not be provided
  if (!new CompletionValidator(pos, mdl).shouldProvideCompletions()) {
    return createInlineCompletionResult([]);
  }

  // Attempt to retrieve cached completions if caching is enabled
  if (enableCaching) {
    const cachedCompletions = completionCache.get(pos, mdl).map(cache => ({
      insertText: cache.completion,
      range: cache.range,
    }));

    if (cachedCompletions.length > 0) {
      onShowCompletion();
      return createInlineCompletionResult(cachedCompletions);
    }
  }

  if (token.isCancellationRequested || isCompletionAccepted) {
    return createInlineCompletionResult([]);
  }

  try {
    // Create a debounced fetch function based on the trigger type
    const debouncedFetchCompletion = getDebouncedFunctionPerTrigger(
      requestHandler ?? fetchCompletionItem,
    );

    const fetchCompletion = debouncedFetchCompletion[trigger];

    // Handle cancellation
    token.onCancellationRequested(() => {
      fetchCompletion.cancel();
    });

    const completionMetadata: CompletionMetadata = constructCompletionMetadata({
      pos,
      mdl,
      options,
    });

    const {completion} = await fetchCompletion({
      endpoint,
      body: {
        completionMetadata,
      },
    });

    if (completion) {
      const formattedCompletion = CompletionFormatter.create(completion)
        .removeMarkdownCodeSyntax()
        .removeExcessiveNewlines()
        .removeInvalidLineBreaks()
        .build();

      const completionRange = new CompletionRange(monaco);
      const completionInsertionRange = completionRange.computeInsertionRange(
        pos,
        formattedCompletion,
        mdl,
      );

      const cacheRange = completionRange.computeCacheRange(
        pos,
        formattedCompletion,
      );

      if (enableCaching) {
        completionCache.add({
          completion: formattedCompletion,
          range: cacheRange,
          textBeforeCursor: getTextBeforeCursor(pos, mdl),
        });
      }

      onShowCompletion();
      return createInlineCompletionResult([
        {insertText: formattedCompletion, range: completionInsertionRange},
      ]);
    }
  } catch (error) {
    if (isCancellationError(error)) {
      return createInlineCompletionResult([]);
    } else if (onError) {
      onError(error as Error);
    } else {
      report(error);
    }
  }

  return createInlineCompletionResult([]);
};

/**
 * Checks if an error is a cancellation error.
 * @param err - The error to check.
 * @returns True if the error is a cancellation error, false otherwise.
 */
export const isCancellationError = (err: unknown): boolean => {
  if (typeof err === 'string') {
    return err === 'Cancelled' || err === 'AbortError';
  } else if (err instanceof Error) {
    return err.message === 'Cancelled' || err.name === 'AbortError';
  }
  return false;
};

export default handleInlineCompletions;
