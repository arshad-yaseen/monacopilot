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
let LAST_COMPLETION_TIME = Date.now();

const debouncedFetchCompletionItem = debounce(fetchCompletionItem, 300);

const handleInlineCompletions = async (
  monaco: Monaco,
  model: EditorModel,
  position: EditorPosition,
  _: EditorInlineCompletionContext,
  token: EditorCancellationToken,
  options: Omit<RegisterCopilotParams, 'monaco'>,
): Promise<EditorInlineCompletionsResult> => {
  const text = model.getValue();

  const range = new monaco.Range(
    position.lineNumber,
    position.column,
    position.lineNumber,
    position.column,
  );

  const completionValidator = new CompletionValidator(
    position,
    model,
    options.language,
    LAST_COMPLETION_TIME,
  );

  if (!completionValidator.shouldProvideCompletions()) {
    console.debug('Completion not provided');
    return createInlineCompletionResult([]);
  }

  // Filter cached completions to include only those that are on the same line
  const cachedCompletions = getCompletionCache().filter(cache => {
    return cache.range.startLineNumber === position.lineNumber;
  });

  // If there are cached completions, return them
  if (cachedCompletions.length > 0) {
    const items = cachedCompletions.map(cache => ({
      insertText: cache.completion,
      range: cache.range,
    }));

    return createInlineCompletionResult(items);
  }

  if (token.isCancellationRequested) {
    return createInlineCompletionResult([]);
  }

  const localPrediction = LOCAL_PREDICTION_ENGINE.predict(
    options.language,
    model.getLineContent(position.lineNumber),
  );

  if (localPrediction) {
    return createInlineCompletionResult([
      {
        insertText: {
          snippet: localPrediction,
        },
        range,
      },
    ]);
  }

  try {
    const completion = await debouncedFetchCompletionItem({
      ...options,
      text,
      model,
      position,
      token,
    });

    if (completion) {
      LAST_COMPLETION_TIME = Date.now();

      const formattedCompletion = formatCompletion(model, position, completion);
      const completionInsertRange = computeCompletionInsertRange(
        formattedCompletion,
        position,
        range,
      );

      addCompletionCache({
        completion: formattedCompletion,
        range: completionInsertRange,
      });

      return createInlineCompletionResult([
        {
          insertText: formattedCompletion,
          range,
        },
      ]);
    }
  } catch (error) {
    err(error).completionError('Failed to fetch completion item');
  }

  return createInlineCompletionResult([]);
};

export default handleInlineCompletions;
