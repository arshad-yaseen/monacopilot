import {DEFAULT_TRIGGER} from './defaults';
import {processInlineCompletions} from './processor';
import {getEditorState} from './state';
import {RegisterCompletionOptions, TriggerEnum} from './types/core';
import type {Monaco, StandaloneCodeEditor} from './types/monaco';
import {getCurrentValue} from './utils/editor';

export const createInlineCompletionsProvider = (
    monaco: Monaco,
    editor: StandaloneCodeEditor,
    options: RegisterCompletionOptions,
) => {
    const state = getEditorState(editor);
    if (!state) return null;

    return monaco.languages.registerInlineCompletionsProvider(
        options.language,
        {
            provideInlineCompletions: (mdl, pos, _, token) => {
                if (
                    // Skip completion if trigger is on-demand and not explicitly triggered by user
                    (options.trigger === TriggerEnum.OnDemand &&
                        !state.isExplicitlyTriggered) ||
                    // Skip completion if triggerIf returns false
                    (options.triggerIf &&
                        !options.triggerIf({
                            text: getCurrentValue(editor),
                            position: pos,
                            triggerType: options.trigger ?? DEFAULT_TRIGGER,
                        }))
                ) {
                    return;
                }

                return processInlineCompletions({
                    monaco,
                    mdl,
                    pos,
                    token,
                    isCompletionAccepted: state.isCompletionAccepted,
                    options,
                });
            },
            handleItemDidShow: (_, item, completion) => {
                state.isExplicitlyTriggered = false;
                state.hasRejectedCurrentCompletion = false;

                if (state.isCompletionAccepted) return;

                state.isCompletionVisible = true;
                options.onCompletionShown?.(completion, item.range);
            },
            freeInlineCompletions: () => {
                /* No-op */
            },
        },
    );
};
