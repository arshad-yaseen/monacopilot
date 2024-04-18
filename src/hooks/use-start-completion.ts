import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {
  computeCacheKeyForCompletion,
  extractCodeForCompletion,
  fetchCompletionItem,
} from '../helpers/get-completion';
import {Framework} from '../types/common';
import {isValidCompletion} from '../utils/completion/validate-completion';
import {useDebounceAsyncFn} from './use-debounce-async-fn';

export const useStartCompletion = (
  monacoInstance: Monaco | null,
  language: string,
  framework: Framework | undefined,
) => {
  const completionCache = React.useRef(new Map());
  const isCompletionHandled = React.useRef(false);

  const fetchCompletionItemDebounced = useDebounceAsyncFn(
    fetchCompletionItem,
    200,
  );

  React.useEffect(() => {
    if (!monacoInstance) return;

    const completionProvider =
      monacoInstance.languages.registerInlineCompletionsProvider(language, {
        provideInlineCompletions: async (model, position) => {
          const code = model.getValue();

          // If the completion is not valid, return an empty array
          // This checks the commong cases where completion should not be triggered
          // e.g. when the cursor is at the end of a line or when the code after the cursor is not valid
          if (!isValidCompletion(position, model) || !language || !code)
            return null;

          const cacheKey = computeCacheKeyForCompletion(position, code);

          const cursorRange = new monacoInstance.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column,
          );

          if (isCompletionHandled.current) {
            isCompletionHandled.current = false;
            return null;
          }

          if (completionCache.current.has(cacheKey)) {
            isCompletionHandled.current = true;
            return {
              items: [
                {
                  insertText: completionCache.current.get(cacheKey),
                  range: cursorRange,
                },
              ],
            };
          }

          let completion: string | null;

          try {
            completion = await fetchCompletionItemDebounced({
              code: extractCodeForCompletion(code, position),
              language,
              framework,
            });
          } catch (error) {
            return null;
          }

          if (!completion) return null;

          isCompletionHandled.current = true;

          completionCache.current.set(cacheKey, completion);

          return {
            items: [
              {
                insertText: completion,
                range: cursorRange,
                completeBracketPairs: true,
              },
            ],
            enableForwardStability: true,
          };
        },
        freeInlineCompletions: () => {},
      });

    return () => {
      completionProvider.dispose();
    };
  }, [monacoInstance, language, fetchCompletionItemDebounced, framework]);

  return null;
};
