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
const DEBOUNCE_DELAY = 200;
let lastCompletionTime = Date.now();

const debouncedFetchCompletionItem = debounce(
  fetchCompletionItem,
  DEBOUNCE_DELAY,
);

interface CompletionOptions extends Omit<RegisterCopilotParams, 'monaco'> {}

/**
 * Handles inline completions for the editor
 * @param monaco - Monaco editor instance
 * @param model - Current editor model
 * @param position - Current cursor position
 * @param context - Inline completion context (unused)
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
  options: CompletionOptions,
): Promise<EditorInlineCompletionsResult> {
  const text = model.getValue();
  const range = new monaco.Range(
    position.lineNumber,
    position.column,
    position.lineNumber,
    position.column,
  );

  if (!shouldProvideCompletions(position, model, options.language)) {
    return createInlineCompletionResult([]);
  }

  const cachedCompletions = getCachedCompletions(position, model);
  if (cachedCompletions.length) {
    return createInlineCompletionResult(cachedCompletions);
  }

  if (token.isCancellationRequested) {
    return createInlineCompletionResult([]);
  }

  const localPrediction = getLocalPrediction(options.language, model, position);
  if (localPrediction) {
    return createInlineCompletionResult([
      {insertText: {snippet: localPrediction}, range},
    ]);
  }

  return await fetchAndProcessCompletion(
    options,
    text,
    model,
    position,
    token,
    range,
  );
}

function shouldProvideCompletions(
  position: EditorPosition,
  model: EditorModel,
  language: string,
): boolean {
  const completionValidator = new CompletionValidator(
    position,
    model,
    language,
    lastCompletionTime,
  );
  return completionValidator.shouldProvideCompletions();
}

function getCachedCompletions(
  position: EditorPosition,
  model: EditorModel,
): {insertText: string; range: any}[] {
  const cachedCompletions = getCompletionCache(position, model);
  return cachedCompletions.map(cache => ({
    insertText: cache.completion,
    range: cache.range,
  }));
}

function getLocalPrediction(
  language: string,
  model: EditorModel,
  position: EditorPosition,
): string | null {
  return LOCAL_PREDICTION_ENGINE.predict(
    language,
    model.getLineContent(position.lineNumber),
  );
}

async function fetchAndProcessCompletion(
  options: CompletionOptions,
  text: string,
  model: EditorModel,
  position: EditorPosition,
  token: EditorCancellationToken,
  range: any,
): Promise<EditorInlineCompletionsResult> {
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

      addCompletionCache({
        completion: formattedCompletion,
        range: completionInsertRange,
      });

      return createInlineCompletionResult([
        {
          insertText: formattedCompletion,
          range: completionInsertRange,
        },
      ]);
    }
  } catch (error) {
    err(error).completionError('Failed to fetch completion item');
  }

  return createInlineCompletionResult([]);
}

export default handleInlineCompletions;
