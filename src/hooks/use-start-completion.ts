import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {LocalCodePredictionEngine} from '../classes/local-code-prediction-engine';
import {
  computeCacheKeyForCompletion,
  fetchCompletionItem,
} from '../helpers/get-completion';
import {EditorInlineCompletionType, FrameworkType} from '../types/common';
import useDebounceAsyncFn from './use-debounce-async-fn';

const localPredictionEngine = new LocalCodePredictionEngine();

const useStartCompletion = (
  monacoInstance: Monaco | null,
  language: string,
  framework: FrameworkType | undefined,
) => {
  const completionCache = React.useRef<Map<string, EditorInlineCompletionType>>(
    new Map(),
  );
  const isCompletionHandled = React.useRef<boolean>(false);

  const fetchCompletionItemDebounced = useDebounceAsyncFn(fetchCompletionItem, {
    wait: 300,
  });

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

          try {
            const completion = await fetchCompletionItemDebounced({
              code,
              language,
              framework,
              model,
              position,
            });

            console.log('completion', completion);

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
            return {items: []};
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

export default useStartCompletion;
