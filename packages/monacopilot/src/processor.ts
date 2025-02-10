import {logger} from '@monacopilot/core';

import {CompletionCache} from './classes/cache';
import {CompletionFormatter} from './classes/formatter';
import {CompletionRange} from './classes/range';
import {constructCompletionMetadata, fetchCompletionItem} from './helpers';
import {
    CompletionMetadata,
    InlineCompletionProcessorParams,
    TriggerType,
} from './types';
import type {FetchCompletionItemHandler} from './types/internal';
import type {EditorInlineCompletionsResult} from './types/monaco';
import {typingDebouncedAsync} from './utils/debounce';
import {getTextBeforeCursor, getTextBeforeCursorInLine} from './utils/editor';
import {createInlineCompletionResult} from './utils/inline-completion';

const getDebouncedFunctionPerTrigger = (
    fn: FetchCompletionItemHandler,
): Record<
    TriggerType,
    ReturnType<typeof typingDebouncedAsync<FetchCompletionItemHandler>>
> => {
    return {
        [TriggerType.OnTyping]: typingDebouncedAsync(fn, 600, 200),
        [TriggerType.OnIdle]: typingDebouncedAsync(fn, 600, 400),
        [TriggerType.OnDemand]: typingDebouncedAsync(fn, 0, 0),
    };
};

export const completionCache = new CompletionCache();

export const processInlineCompletions = async ({
    monaco,
    mdl,
    pos,
    token,
    isCompletionAccepted,
    options,
}: InlineCompletionProcessorParams): Promise<EditorInlineCompletionsResult> => {
    const {
        trigger = TriggerType.OnIdle,
        endpoint,
        enableCaching = true,
        onError,
        requestHandler,
    } = options;

    // Attempt to retrieve cached completions if caching is enabled
    if (enableCaching) {
        const cachedCompletions = completionCache.get(pos, mdl).map(cache => ({
            insertText: cache.completion,
            range: cache.range,
        }));

        if (cachedCompletions.length > 0) {
            return createInlineCompletionResult(cachedCompletions);
        }
    }

    if (token.isCancellationRequested || isCompletionAccepted) {
        return createInlineCompletionResult([]);
    }

    try {
        // Create a debounced fetch function based on the trigger type
        const debouncedFetchCompletion = getDebouncedFunctionPerTrigger(
            requestHandler ?? fetchCompletionItem,
        );

        const fetchCompletion = debouncedFetchCompletion[trigger];

        // Handle cancellation
        token.onCancellationRequested(() => {
            fetchCompletion.cancel();
        });

        const completionMetadata: CompletionMetadata =
            constructCompletionMetadata({
                pos,
                mdl,
                options,
            });

        const {completion} = await fetchCompletion({
            endpoint,
            body: {
                completionMetadata,
            },
        });

        if (completion) {
            const formattedCompletion = new CompletionFormatter(
                completion,
                pos.column,
                getTextBeforeCursorInLine(pos, mdl),
            )
                .removeMarkdownCodeSyntax()
                .removeExcessiveNewlines()
                .removeInvalidLineBreaks()
                .indentByColumn()
                .build();

            const completionRange = new CompletionRange(monaco);
            const completionInsertionRange =
                completionRange.computeInsertionRange(
                    pos,
                    formattedCompletion,
                    mdl,
                );

            const cacheRange = completionRange.computeCacheRange(
                pos,
                formattedCompletion,
            );

            if (enableCaching) {
                completionCache.add({
                    completion: formattedCompletion,
                    range: cacheRange,
                    textBeforeCursor: getTextBeforeCursor(pos, mdl),
                });
            }

            return createInlineCompletionResult([
                {
                    insertText: formattedCompletion,
                    range: completionInsertionRange,
                },
            ]);
        }
    } catch (error) {
        if (isCancellationError(error)) {
            return createInlineCompletionResult([]);
        } else if (onError) {
            onError(error as Error);
        } else {
            logger.warn('Cannot provide completion', error);
        }
    }

    return createInlineCompletionResult([]);
};

const isCancellationError = (err: unknown): boolean => {
    if (typeof err === 'string') {
        return err === 'Cancelled' || err === 'AbortError';
    } else if (err instanceof Error) {
        return err.message === 'Cancelled' || err.name === 'AbortError';
    }
    return false;
};
