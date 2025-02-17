import {logger} from '@monacopilot/core';

import {CompletionCache} from './classes/cache';
import {CompletionFormatter} from './classes/formatter';
import {CompletionRange} from './classes/range';
import {
    constructCompletionMetadata,
    fetchCompletionItem,
    isCancellationError,
} from './helpers';
import {
    CompletionMetadata,
    InlineCompletionProcessorParams,
    TriggerType,
} from './types';
import type {EditorInlineCompletionsResult} from './types/monaco';
import {typingDebouncedAsync} from './utils/debounce';
import {getTextBeforeCursor, getTextBeforeCursorInLine} from './utils/editor';
import {createInlineCompletionResult} from './utils/inline-completion';

// [base delay, typing threshold]
const TYPING_DEBOUNCE_PARAMS = {
    [TriggerType.OnTyping]: [500, 100],
    [TriggerType.OnIdle]: [600, 400],
    [TriggerType.OnDemand]: [0, 0],
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
        const fetchCompletion = typingDebouncedAsync(
            requestHandler ?? fetchCompletionItem,
            ...TYPING_DEBOUNCE_PARAMS[trigger],
        );

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

            if (enableCaching) {
                completionCache.add({
                    completion: formattedCompletion,
                    range: completionRange.computeCacheRange(
                        pos,
                        formattedCompletion,
                    ),
                    textBeforeCursor: getTextBeforeCursor(pos, mdl),
                });
            }

            return createInlineCompletionResult([
                {
                    insertText: formattedCompletion,
                    range: completionRange.computeCacheRange(
                        pos,
                        formattedCompletion,
                    ),
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
