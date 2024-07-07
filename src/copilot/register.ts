import {err} from '../error';
import {RegisterCopilotParams} from '../types';
import {clearCompletionCache} from '../utils/completion';
import handleInlineCompletions from './handler';

let hasCompletionBeenAccepted = false;
let isCompletionVisible = false;

/**
 * Registers the Copilot with the Monaco editor.
 * @param monaco The Monaco instance.
 * @param editor The editor instance.
 * @param filename The filename of the code snippet.
 * @param endpoint The endpoint to fetch completion items.
 * @param technologies The technologies used in the code snippet.
 * @param language The language of the code snippet.
 * @param externalContext The external context of the code snippet.
 */
export const registerCopilot = ({
  monaco,
  editor,
  ...options
}: RegisterCopilotParams): (() => void) | undefined => {
  try {
    const inlineCompletionsProvider =
      monaco.languages.registerInlineCompletionsProvider(options.language, {
        provideInlineCompletions: async (model, position, context, token) =>
          handleInlineCompletions({
            monaco,
            model,
            position,
            context,
            token,
            hasCompletionBeenAccepted,
            onShowCompletion: () => (isCompletionVisible = true),
            options,
          }),
        freeInlineCompletions: () => {},
      });

    editor.onKeyDown(event => {
      // If the user presses Tab or Cmd + Right Arrow and completion is visible, it means the completion was accepted
      if (
        isCompletionVisible &&
        (event.keyCode === monaco.KeyCode.Tab ||
          (event.keyCode === monaco.KeyCode.RightArrow && event.metaKey))
      ) {
        hasCompletionBeenAccepted = true;
        isCompletionVisible = false;
      } else {
        hasCompletionBeenAccepted = false;
      }
    });

    return () => {
      inlineCompletionsProvider.dispose();
      clearCompletionCache();
    };
  } catch (error) {
    err(error).editorError('Error while registering Copilot');
  }
};
