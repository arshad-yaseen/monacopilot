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
    1000,
  );

  React.useEffect(() => {
    if (!monacoInstance) return;

    const completionProvider =
      monacoInstance.languages.registerInlineCompletionsProvider(language, {
        provideInlineCompletions: async (editor, position, _, token) => {
          const code = editor.getValue();

          // If the completion is not valid, return an empty array
          // This checks the commong cases where completion should not be triggered
          // e.g. when the cursor is at the end of a line or when the code after the cursor is not valid
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

          if (!language || !code) return {items: []};

          let completion: string | null;

          try {
            completion = await fetchCompletionItemDebounced({
              code: extractCodeForCompletion(code, position),
              language,
              framework,
              token,
            });
          } catch (error) {
            return {items: []};
          }

          isCompletionHandled.current = true;

          if (!completion || token.isCancellationRequested) return {items: []};

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
  }, [monacoInstance, language, fetchCompletionItemDebounced]);

  return null;
};
