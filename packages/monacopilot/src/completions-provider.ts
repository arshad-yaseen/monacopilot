import {processInlineCompletions} from './processor';
import {getEditorState} from './state';
import {RegisterCompletionOptions, TriggerType} from './types';
import type {Monaco, StandaloneCodeEditor} from './types/monaco';

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
                // Skip completion if trigger is on-demand and not explicitly triggered by user
                if (
                    options.trigger === TriggerType.OnDemand &&
                    !state.isExplicitlyTriggered
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
