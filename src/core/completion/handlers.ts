import {warn} from '../../logger';
import {
  Monaco,
  RegisterCompletionOptions,
  StandaloneCodeEditor,
  TriggerType,
} from '../../types';
import {getEditorState} from './editor-state';
import {processInlineCompletions} from './processor';

export const createInlineCompletionsProvider = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterCompletionOptions,
) => {
  const state = getEditorState(editor);
  if (!state) return null;

  return monaco.languages.registerInlineCompletionsProvider(options.language, {
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
      // Reset the explicit trigger flag to prevent automatic completions
      // This ensures completions only show when explicitly requested by the user
      state.isExplicitlyTriggered = false;
      state.hasRejectedCurrentCompletion = false;

      if (state.isCompletionAccepted) return;

      state.isCompletionVisible = true;
      options.onCompletionShown?.(completion, item.range);
    },
    freeInlineCompletions: () => {
      /* No-op */
    },
  });
};

export const handleTriggerCompletion = (editor: StandaloneCodeEditor) => {
  const state = getEditorState(editor);
  if (!state) {
    warn(
      'Completion is not registered. Use `registerCompletion` to register completion first.',
    );
    return;
  }
  state.isExplicitlyTriggered = true;
  editor.trigger('keyboard', 'editor.action.inlineSuggest.trigger', {});
};
