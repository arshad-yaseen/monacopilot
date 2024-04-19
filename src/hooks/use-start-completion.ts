import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {
  computeCacheKeyForCompletion,
  extractCodeForCompletion,
  fetchCompletionItem,
} from '../helpers/get-completion';
import {Framework} from '../types/common';
import {localPredictionModel} from '../utils/completion/local-prediction-model';
import {isValidCompletion} from '../utils/completion/validate-completion';
import {useDebounceAsyncFn} from './use-debounce-async-fn';

export const useStartCompletion = (
  monacoInstance: Monaco | null,
  language: string,
  framework: Framework | undefined,
) => {
  const completionCache = React.useRef(new Map());
  const lastCompletion = React.useRef<string | null>(null);

  let timeout: ReturnType<typeof setTimeout> | null = null;

  const fetchCompletionItemDebounced = useDebounceAsyncFn(
    fetchCompletionItem,
    200,
  );

  React.useEffect(() => {
    if (!monacoInstance || !language) return;

    const completionProvider =
      monacoInstance.languages.registerInlineCompletionsProvider(language, {
        provideInlineCompletions: async (model, position) => {
          const code = model.getValue();
          const cursorRange = new monacoInstance.Range(
            position.lineNumber,
            position.column - 5,
            position.lineNumber,
            position.column - 5,
          );

          if (!isValidCompletion(position, model) || !code) return null;

          // Check if the user is trying to write a common code snippet
          const localPrediction = localPredictionModel(language, code);

          if (localPrediction) {
            return {
              items: [{insertText: localPrediction, range: cursorRange}],
              enableForwardStability: true,
            };
          }

          if (lastCompletion.current) {
            return {
              items: [{insertText: lastCompletion.current, range: cursorRange}],
              enableForwardStability: true,
            };
          }

          const cacheKey = computeCacheKeyForCompletion(position, code);

          if (completionCache.current.has(cacheKey)) {
            return {
              items: [
                {
                  insertText: completionCache.current.get(cacheKey),
                  range: cursorRange,
                },
              ],
              enableForwardStability: true,
            };
          }

          try {
            const completion = await fetchCompletionItemDebounced({
              code: extractCodeForCompletion(code, position),
              language,
              framework,
            });

            lastCompletion.current = completion;

            if (!completion) return null;

            completionCache.current.set(cacheKey, completion);

            return {
              items: [{insertText: completion, range: cursorRange}],
              enableForwardStability: true,
            };
          } catch (error) {
            return null;
          } finally {
            timeout = setTimeout(() => {
              lastCompletion.current = null;
            }, 300);
          }
        },
        freeInlineCompletions: () => {},
      });

    return () => {
      completionProvider.dispose();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [monacoInstance, language, framework, fetchCompletionItemDebounced]);

  return null;
};
