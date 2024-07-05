import {CompletionValidator, LocalCodePredictionEngine} from '../classes';
import {err} from '../error';
import {computeCompletionCacheKey} from '../helpers';
import {
  EditorCancellationToken,
  EditorInlineCompletionContext,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorPosition,
  Monaco,
  RegisterCopilotParams,
} from '../types';
import {getLine} from '../utils';
import {
  cacheCompletionItem,
  createCompletionItem,
  createInlineCompletionResult,
  debouncedFetchCompletionItem,
  getCachedItem,
} from '../utils/completion';

const LOCAL_PREDICTION_ENGINE = new LocalCodePredictionEngine();
let LAST_COMPLETION_TIME = Date.now();

const handleInlineCompletions = async (
  monaco: Monaco,
  model: EditorModel,
  position: EditorPosition,
  _: EditorInlineCompletionContext,
  token: EditorCancellationToken,
  options: Omit<RegisterCopilotParams, 'monaco'>,
): Promise<EditorInlineCompletionsResult> => {
  const completionValidator = new CompletionValidator(
    position,
    model,
    options.language,
    LAST_COMPLETION_TIME,
  );

  if (!completionValidator.shouldProvideCompletions()) {
    return createInlineCompletionResult([]);
  }

  const cacheKey = computeCompletionCacheKey(position, model);
  const cachedItem = getCachedItem(cacheKey);

  if (cachedItem) {
    return createInlineCompletionResult([cachedItem]);
  }

  if (token.isCancellationRequested) {
    return createInlineCompletionResult([]);
  }

  const code = model.getValue();
  const cursorRange = new monaco.Range(
    position.lineNumber,
    position.column,
    position.lineNumber,
    position.column,
  );

  const localPrediction = LOCAL_PREDICTION_ENGINE.predictCode(
    options.language,
    getLine(code, position.lineNumber),
  );

  if (localPrediction) {
    const newItem = createCompletionItem(localPrediction, cursorRange, true);
    cacheCompletionItem(cacheKey, newItem);
    return createInlineCompletionResult([newItem]);
  }

  try {
    const completion = await debouncedFetchCompletionItem({
      ...options,
      code,
      model,
      position,
      token,
    });

    if (completion) {
      LAST_COMPLETION_TIME = Date.now();
      const newItem = createCompletionItem(completion, cursorRange);
      cacheCompletionItem(cacheKey, newItem);
      return createInlineCompletionResult([newItem]);
    }
  } catch (error) {
    err(error).completionError('Failed to fetch completion item');
  }

  return createInlineCompletionResult([]);
};

export default handleInlineCompletions;
