import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {
  computeCacheKeyForCompletion,
  extractCodeForCompletion,
  fetchCompletionItem,
} from '../helpers/completion';
import {isValidCompletion} from '../utils/completion/validate-completion';

export const useCodeCompletion = (
  monacoInstance: Monaco | null,
  language: string,
) => {
  const completionCache = React.useRef(new Map());
  const isCompletionHandled = React.useRef(false);

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

          if (!language || !code) return {items: []};

          const completion = await fetchCompletionItem({
            code: extractCodeForCompletion(code, position),
            language,
            token,
          });

          isCompletionHandled.current = true;

          if (!completion || token.isCancellationRequested) return {items: []};

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
  }, [monacoInstance, language]);

  return null;
};
