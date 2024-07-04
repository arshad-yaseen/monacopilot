import {Monaco} from '@monaco-editor/react';

import {LocalCodePredictionEngine} from '../../classes/local-code-prediction-engine';
import err from '../../error';
import {
  EditorCancellationToken,
  EditorInlineCompletion,
  EditorInlineCompletionContext,
  EditorInlineCompletionsResult,
  EditorModel,
  EditorPosition,
  EditorRange,
} from '../../types/common';
import {CompletionCacheItem} from '../../types/completion';
import {RegisterCopilotParams} from '../../types/copilot';
import {
  Endpoint,
  ExternalContext,
  Filename,
  Technologies,
} from '../../types/monacopilot-props';
import {getLine} from '../../utils/editor';
import {computeCompletionCacheKey, fetchCompletionItem} from '../completion';

const LOCAL_PREDICTION_ENGINE = new LocalCodePredictionEngine();
const COMPLETION_CACHE = new Map<string, CompletionCacheItem>();

/**
 * Register Copilot with Monaco editor.
 * @param monaco The Monaco instance.
 * @param filename The filename of the code snippet.
 * @param endpoint The endpoint to fetch completion items.
 * @param technologies The technologies used in the code snippet.
 * @param language The language of the code snippet.
 * @param externalContext The external context of the code snippet.
 */
const registerCopilot = ({
  monaco,
  filename,
  endpoint,
  technologies,
  language,
  externalContext,
}: RegisterCopilotParams): (() => void) | undefined => {
  if (!language || !endpoint) {
    return;
  }

  try {
    const _d = monaco.languages.registerInlineCompletionsProvider(language, {
      provideInlineCompletions: async (model, position, context, token) =>
        handleInlineCompletions(monaco, model, position, context, token, {
          language,
          filename,
          endpoint,
          technologies,
          externalContext,
        }),
      freeInlineCompletions: () => {},
    });

    return () => {
      _d.dispose();
      COMPLETION_CACHE.clear();
    };
  } catch (error) {
    err(error).editorError('Error while registering copilot');
  }
};

const handleInlineCompletions = async (
  monaco: Monaco,
  model: EditorModel,
  position: EditorPosition,
  _: EditorInlineCompletionContext,
  token: EditorCancellationToken,
  options: {
    language: string;
    filename?: Filename;
    endpoint: Endpoint;
    technologies?: Technologies;
    externalContext?: ExternalContext;
  },
): Promise<EditorInlineCompletionsResult> => {
  const cacheKey = computeCompletionCacheKey(position, model);
  const cachedItem = COMPLETION_CACHE.get(cacheKey);

  if (cachedItem && !cachedItem.isExpired()) {
    return createInlineCompletionResult([cachedItem.completion]);
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
    const completion = await fetchCompletionItem({
      ...options,
      code,
      model,
      position,
      token,
    });

    if (completion) {
      const newItem = createCompletionItem(completion, cursorRange);
      cacheCompletionItem(cacheKey, newItem);
      return createInlineCompletionResult([newItem]);
    }
  } catch (error) {
    err(error).completionError('Failed to fetch completion item');
  }

  return createInlineCompletionResult([]);
};

const createCompletionItem = (
  insertText: string,
  range: EditorRange,
  completeBracketPairs: boolean = false,
): EditorInlineCompletion => ({
  insertText: {snippet: insertText},
  range,
  completeBracketPairs,
});

const cacheCompletionItem = (
  key: string,
  item: EditorInlineCompletion,
): void => {
  COMPLETION_CACHE.set(key, {
    completion: item,
    timestamp: Date.now(),
    isExpired: () => Date.now() - COMPLETION_CACHE.get(key)!.timestamp > 60000, // 1 minute expiration
  });
};

const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
});

export default registerCopilot;
