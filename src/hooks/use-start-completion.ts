import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {LocalCodePredictionEngine} from '../classes/local-code-prediction-engine';
import {
  computeCacheKeyForCompletion,
  fetchCompletionItem,
} from '../helpers/get-completion';
import {EditorInlineCompletionType, FrameworkType} from '../types/common';
import useTypingDebounceFn from './use-typing-debounce-fn';

const localPredictionEngine = new LocalCodePredictionEngine();

export const useStartCompletion = (
  monacoInstance: Monaco | null,
  language: string,
  framework?: FrameworkType,
) => {
  const completionCache = React.useRef<Map<string, EditorInlineCompletionType>>(
    new Map(),
  );
  const isCompletionHandled = React.useRef<boolean>(false);
  const fetchCompletionItemDebounced = useTypingDebounceFn(fetchCompletionItem);

  React.useEffect(() => {
    if (!monacoInstance || !language) {
      return undefined;
    }

    const completionProvider =
      monacoInstance.languages.registerInlineCompletionsProvider(language, {
        provideInlineCompletions: async (model, position, _, token) => {
          if (token.isCancellationRequested) {
            return {items: []};
          }

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
          const cacheKey = computeCacheKeyForCompletion(position, code);

          // Check cache first
          if (completionCache.current.has(cacheKey)) {
            const cachedItem = completionCache.current.get(cacheKey);
            if (cachedItem) {
              return {
                items: [cachedItem],
                enableForwardStability: true,
              };
            }
          }

          // Local Prediction
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
            isCompletionHandled.current = true;
            return {
              items: [newItem],
              enableForwardStability: true,
            };
          }

          // Fetch completion from the LLM model
          try {
            const completion = await fetchCompletionItemDebounced({
              code,
              language,
              framework,
              model,
              position,
            });

            if (completion) {
              const newItem = {
                insertText: completion,
                range: cursorRange,
                completeBracketPairs: true,
              };
              completionCache.current.set(cacheKey, newItem);
              isCompletionHandled.current = true;
              return {
                items: [newItem],
                enableForwardStability: true,
              };
            }
          } catch (error) {
            console.error(error);
          }

          return {items: []};
        },
        freeInlineCompletions: () => {},
      });

    return () => {
      completionProvider.dispose();
    };
  }, [monacoInstance, language, framework, fetchCompletionItemDebounced]);

  return null;
};
