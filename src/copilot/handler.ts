import {CompletionValidator, LocalPredictionEngine} from '../classes';
import {err} from '../error';
import {fetchCompletionItem} from '../helpers';
import {
  EditorCancellationToken,
  EditorInlineCompletionContext,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorPosition,
  Monaco,
  RegisterCopilotParams,
} from '../types';
import {debounce} from '../utils';
import {
  addCompletionCache,
  computeCompletionInsertRange,
  createInlineCompletionResult,
  formatCompletion,
  getCompletionCache,
} from '../utils/completion';

const LOCAL_PREDICTION_ENGINE = new LocalPredictionEngine();

// Keep track of the last completion time to prevent excessive requests
let lastCompletionTime = Date.now();

const debouncedFetchCompletionItem = debounce(fetchCompletionItem, 300);

/**
 * Handles inline completions for the editor
 * @param monaco - Monaco editor instance
 * @param model - Current editor model
 * @param position - Current cursor position
 * @param _ - Inline completion context (unused)
 * @param token - Cancellation token
 * @param options - Additional options for completion
 * @returns Promise resolving to EditorInlineCompletionsResult
 */
async function handleInlineCompletions(
  monaco: Monaco,
  model: EditorModel,
  position: EditorPosition,
  _: EditorInlineCompletionContext,
  token: EditorCancellationToken,
  options: Omit<RegisterCopilotParams, 'monaco'>,
): Promise<EditorInlineCompletionsResult> {
  const text = model.getValue();
  const range = new monaco.Range(
    position.lineNumber,
    position.column,
    position.lineNumber,
    position.column,
  );

  // Validate if completions should be provided
  const completionValidator = new CompletionValidator(
    position,
    model,
    options.language,
    lastCompletionTime,
  );

  if (!completionValidator.shouldProvideCompletions()) {
    console.debug('Completion not provided');
    return createInlineCompletionResult([]);
  }

  // Check for cached completions
  const cachedCompletions = getCompletionCache().filter(
    cache => cache.range.startLineNumber >= position.lineNumber,
  );

  // Check if the operation has been cancelled
  if (token.isCancellationRequested) {
    return createInlineCompletionResult([]);
  }

  // Try to get a local prediction first
  const localPrediction = LOCAL_PREDICTION_ENGINE.predict(
    options.language,
    model.getLineContent(position.lineNumber),
  );

  if (localPrediction) {
    return createInlineCompletionResult([
      {
        insertText: {snippet: localPrediction},
        range,
      },
    ]);
  }

  // If no local prediction, fetch completion from the Groq API
  try {
    const completion = await debouncedFetchCompletionItem({
      ...options,
      text,
      model,
      position,
      token,
    });

    if (completion) {
      lastCompletionTime = Date.now();
      const formattedCompletion = formatCompletion(model, position, completion);
      const completionInsertRange = computeCompletionInsertRange(
        formattedCompletion,
        position,
        range,
      );

      // Cache the completion
      addCompletionCache({
        completion: formattedCompletion,
        range: completionInsertRange,
      });

      const catchedItems = cachedCompletions.map(cache => ({
        insertText: cache.completion,
        range: cache.range,
      }));

      return createInlineCompletionResult([
        {
          insertText: formattedCompletion,
          range,
        },
        ...catchedItems,
      ]);
    }
  } catch (error) {
    err(error).completionError('Failed to fetch completion item');
  }

  // Return an empty result if no completion was found or an error occurred
  return createInlineCompletionResult([]);
}

export default handleInlineCompletions;
