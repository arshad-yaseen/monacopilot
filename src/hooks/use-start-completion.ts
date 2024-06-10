import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {LocalCodePredictionEngine} from '../classes/local-code-prediction-engine';
import {
  computeCompletionCacheKey,
  fetchCompletionItem,
} from '../helpers/completion';
import type {EditorInlineCompletion} from '../types/common';
import type {
  CompletionSpeed,
  Endpoint,
  ExternalContext,
  Filename,
  Technologies,
} from '../types/editor-props';
import useDebounceFn from './use-debounce-fn';

const localPredictionEngine = new LocalCodePredictionEngine();

const useStartCompletion = (
  filename: Filename | undefined,
  endpoint: Endpoint | undefined,
  technologies: Technologies | undefined,
  language: string | undefined,
  completionSpeed: CompletionSpeed | undefined,
  externalContext: ExternalContext | undefined,
  monacoInstance: Monaco | null,
) => {
  const completionCache = React.useRef<Map<string, EditorInlineCompletion>>(
    new Map(),
  );
  const isCompletionHandled = React.useRef<boolean>(false);

  const fetchCompletionItemDebounced = useDebounceFn(
    fetchCompletionItem,
    completionSpeed === 'little-faster' ? 350 : 600,
  );

  React.useEffect(() => {
    if (!monacoInstance || !language || !endpoint) {
      return undefined;
    }

    const completionProvider =
      monacoInstance.languages.registerInlineCompletionsProvider(language, {
        provideInlineCompletions: async (model, position, _, token) => {
          if (isCompletionHandled.current) {
            isCompletionHandled.current = false;
            return {items: []};
          }

          const code = model.getValue();
          const cursorRange = new monacoInstance.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column,
          );

          const cacheKey = computeCompletionCacheKey(position, model);

          // Check if the completion is already cached
          if (completionCache.current.has(cacheKey)) {
            const cachedItem = completionCache.current.get(cacheKey);
            isCompletionHandled.current = true;
            if (cachedItem) {
              return {
                items: [cachedItem],
                enableForwardStability: true,
              };
            }
          }

          // Check if the code is a common code snippet, if so, predict the next code snippet
          const localPrediction = localPredictionEngine.predictCode(
            language,
            code,
          );
          if (localPrediction) {
            const newItem = {
              insertText: {
                snippet: localPrediction,
              },
              range: cursorRange,
              completeBracketPairs: true,
            };
            completionCache.current.set(cacheKey, newItem);
            return {
              items: [newItem],
              enableForwardStability: true,
            };
          }

          if (token.isCancellationRequested) {
            return {items: []};
          }

          try {
            // Fetch the completion item from the Groq
            const completion = await fetchCompletionItemDebounced({
              filename,
              endpoint,
              code,
              language,
              technologies,
              externalContext,
              model,
              position,
              token,
            });

            if (completion) {
              const newItem: EditorInlineCompletion = {
                insertText: completion,
                range: cursorRange,
              };

              completionCache.current.set(cacheKey, newItem);
              isCompletionHandled.current = true;

              return {
                items: [newItem],
                enableForwardStability: true,
              };
            }
          } catch (error) {
            return {items: []};
          }

          return {items: []};
        },
        freeInlineCompletions: () => {},
      });

    return () => {
      completionProvider.dispose();
    };
  }, [
    monacoInstance,
    language,
    technologies,
    externalContext,
    fetchCompletionItemDebounced,
    endpoint,
    filename,
  ]);

  return null;
};

export default useStartCompletion;
