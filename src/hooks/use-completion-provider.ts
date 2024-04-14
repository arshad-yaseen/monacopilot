import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {CompletionModel} from '../classes';
import {getCompletionCacheKey, getCompletionItem} from '../helpers/completion';
import {useDebounceFnAsync} from './use-debounce-fn-async';

export function useCompletionProvider(
  monacoInstance: Monaco | null,
  language: string,
) {
  const completionResultsCache = React.useRef<Map<string, string>>(
    new Map<string, string>(),
  );

  const completionProcessFinished = React.useRef(false);

  const getCompletionItemDebounced = useDebounceFnAsync(getCompletionItem);

  React.useEffect(() => {
    if (!monacoInstance) {
      return;
    }

    const completionDisposable =
      monacoInstance.languages.registerInlineCompletionsProvider(language, {
        provideInlineCompletions: async (editor, cursorPosition) => {
          const valueUntilCursorPosition = editor.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: cursorPosition.lineNumber,
            endColumn: cursorPosition.column,
          });

          const completionCacheKey = getCompletionCacheKey(
            cursorPosition,
            valueUntilCursorPosition,
          );

          const cursorRange = new monacoInstance.Range(
            cursorPosition.lineNumber,
            cursorPosition.column,
            cursorPosition.lineNumber,
            cursorPosition.column,
          );

          if (completionProcessFinished.current) {
            completionProcessFinished.current = false;
            return {items: []};
          }

          if (completionResultsCache.current.has(completionCacheKey)) {
            completionProcessFinished.current = true;
            return {
              items: [
                {
                  insertText: completionResultsCache.current.get(
                    completionCacheKey,
                  ) as string,
                  range: cursorRange,
                },
              ],
            };
          }

          if (
            !CompletionModel.apiKey ||
            !CompletionModel.provider ||
            !CompletionModel.model ||
            !language ||
            !valueUntilCursorPosition
          ) {
            return {items: []};
          }

          const completionItem = await getCompletionItemDebounced({
            apiKey: CompletionModel.apiKey,
            model: CompletionModel.model,
            provider: CompletionModel.provider,
            value: valueUntilCursorPosition,
            language,
          });
          completionProcessFinished.current = true;

          if (!completionItem) {
            return {items: []};
          }

          completionResultsCache.current.set(
            completionCacheKey,
            completionItem,
          );

          return {
            items: [
              {
                insertText: completionItem,
                range: cursorRange,
              },
            ],
          };
        },
        freeInlineCompletions() {},
      });

    return () => {
      completionDisposable.dispose();
    };
  }, [monacoInstance, language, getCompletionItemDebounced]);
}
