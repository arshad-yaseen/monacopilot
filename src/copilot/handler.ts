import {CompletionValidator} from '../classes';
import {ErrorContext, handleError} from '../error';
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

const DEBOUNCE_DELAY = 300;

const debouncedFetchCompletionItem = debounce(
  fetchCompletionItem,
  DEBOUNCE_DELAY,
);

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

  const cachedCompletions = getCompletionCache(position, model).map(cache => ({
    insertText: cache.completion,
    range: cache.range,
  }));

  if (cachedCompletions.length) {
    onShowCompletion();
    return createInlineCompletionResult(cachedCompletions);
  }

  // If the token is cancelled or the completion was accepted, return an empty result
  // This is to prevent immediate completion after the completion was accepted
  if (token.isCancellationRequested || isCompletionAccepted) {
    return createInlineCompletionResult([]);
  }

  try {
    const completion = await debouncedFetchCompletionItem({
      ...options,
      text: model.getValue(),
      model,
      position,
    });

    if (completion) {
      const formattedCompletion = formatCompletion(model, position, completion);
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
  } catch (_err) {
    handleError(_err, ErrorContext.FETCH_COMPLETION_ITEM);
  }

  return createInlineCompletionResult([]);
};

export default handleInlineCompletions;
