import React from 'react';

import {Monaco} from '@monaco-editor/react';

import {LocalCodePredictionEngine} from '../classes/local-code-prediction-engine';
import {
  computeCacheKeyForCompletion,
  fetchCompletionItem,
} from '../helpers/get-completion';
import {EditorInlineCompletionType} from '../types/common';
import {CompletionSpeedType, FrameworkType} from '../types/editor-props';
import useTypingDebounceFn from './use-typing-debounce-fn';

const localPredictionEngine = new LocalCodePredictionEngine();

const useStartCompletion = (
  endpoint: string | undefined,
  framework: FrameworkType | undefined,
  completionSpeed: CompletionSpeedType | undefined = 'normal',
  language: string | undefined,
  monacoInstance: Monaco | null,
) => {
  const completionCache = React.useRef<Map<string, EditorInlineCompletionType>>(
    new Map(),
  );
  const isCompletionHandled = React.useRef<boolean>(false);

  const fetchCompletionItemDebounced = useTypingDebounceFn(
    fetchCompletionItem,
    completionSpeed === 'slow'
      ? 1000
      : completionSpeed === 'normal'
        ? 600
        : 200,
  );

  React.useEffect(() => {
    if (!monacoInstance || !language || !endpoint) {
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

          try {
            // Fetch the completion item from the LLM model
            const completion = await fetchCompletionItemDebounced({
              endpoint,
              code,
              language,
              framework,
              model,
              position,
            });

            console.log('completion:', completion);

            if (completion) {
              console.log('here');

              const newItem = {
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
            console.error('Error fetching completion item:', error);
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
    framework,
    fetchCompletionItemDebounced,
    endpoint,
  ]);

  return null;
};

export default useStartCompletion;
