import {err} from '../error';
import {
  CopilotRegistration,
  Monaco,
  RegisterCopilotOptions,
  StandaloneCodeEditor,
} from '../types';
import {noop} from '../utils';
import {clearCompletionCache} from '../utils/completion';
import handleInlineCompletions from './handler';

let isCompletionAccepted = false;
let isCompletionVisible = false;

/**
 * Registers the Copilot with the Monaco editor.
 * @param monaco The Monaco instance.
 * @param editor The editor instance.
 * @param options The options for the Copilot.
 * @returns CopilotRegistration object with an unregister method.
 */
export const registerCopilot = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterCopilotOptions,
): CopilotRegistration => {
  try {
    const inlineCompletionsProvider =
      monaco.languages.registerInlineCompletionsProvider(options.language, {
        provideInlineCompletions: async (model, position, _, token) =>
          handleInlineCompletions({
            monaco,
            model,
            position,
            token,
            isCompletionAccepted,
            onShowCompletion: () => (isCompletionVisible = true),
            options,
          }),
        freeInlineCompletions: noop,
      });

    editor.onKeyDown(event => {
      // If the user presses Tab or Cmd + Right Arrow and completion is visible, it means the completion was accepted
      if (
        isCompletionVisible &&
        (event.keyCode === monaco.KeyCode.Tab ||
          (event.keyCode === monaco.KeyCode.RightArrow && event.metaKey))
      ) {
        isCompletionAccepted = true;
        isCompletionVisible = false;
      } else {
        isCompletionAccepted = false;
      }
    });

    const unregister = () => {
      inlineCompletionsProvider.dispose();
      clearCompletionCache();
    };

    return {unregister};
  } catch (error) {
    err(error).editorError('Error while registering Copilot');
    return {unregister: noop};
  }
};
