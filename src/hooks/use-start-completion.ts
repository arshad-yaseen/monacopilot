import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {
  computeCacheKeyForCompletion,
  extractCodeForCompletion,
  fetchCompletionItem,
} from '../helpers/get-completion';
import {isValidCompletion} from '../utils/completion/validate-completion';
import {useDebounceAsyncFn} from './use-debounce-async-fn';

export const useStartCompletion = (
  monacoInstance: Monaco | null,
  language: string,
) => {
  const completionCache = React.useRef(new Map());
  const isCompletionHandled = React.useRef(false);

  const fetchCompletionItemDebounced = useDebounceAsyncFn(
    fetchCompletionItem,
    1000,
  );

  React.useEffect(() => {
    if (!monacoInstance) return;

    const completionProvider =
      monacoInstance.languages.registerInlineCompletionsProvider(language, {
        provideInlineCompletions: async (editor, position, _, token) => {
          const code = editor.getValue();

          if (!isValidCompletion(code, position)) return {items: []};

          const cacheKey = computeCacheKeyForCompletion(position, code);
          const cursorRange = new monacoInstance.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column,
          );

          if (isCompletionHandled.current) {
            isCompletionHandled.current = false;
            return {items: []};
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

          if (!language || !code || token.isCancellationRequested)
            return {items: []};

          let completion: string | null;

          try {
            completion = await fetchCompletionItemDebounced({
              code: extractCodeForCompletion(code, position),
              language,
              token,
            });
          } catch (error) {
            return {items: []};
          }

          isCompletionHandled.current = true;

          if (!completion) return {items: []};

          completionCache.current.set(cacheKey, completion);

          return {
            items: [
              {
                insertText: completion,
                range: cursorRange,
              },
            ],
          };
        },
        freeInlineCompletions: () => {},
      });

    return () => {
      completionProvider.dispose();
    };
  }, [monacoInstance, language, fetchCompletionItemDebounced]);

  return null;
};
