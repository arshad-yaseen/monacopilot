import {ErrorContext, handleError} from '../error';
import {
  CopilotRegistration,
  Disposable,
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
 * @returns CopilotRegistration object with a deregister method.
 */
export const registerCopilot = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterCopilotOptions,
): CopilotRegistration => {
  const disposables: Disposable[] = [];

  try {
    const inlineCompletionsProvider =
      monaco.languages.registerInlineCompletionsProvider(options.language, {
        provideInlineCompletions: (model, position, _, token) =>
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

    disposables.push(inlineCompletionsProvider);

    const keyDownListener = editor.onKeyDown(event => {
      // If the user presses Tab or Cmd + Right Arrow while completion is visible, it means the completion was accepted
      const isTabOrCmdRightArrow =
        event.keyCode === monaco.KeyCode.Tab ||
        (event.keyCode === monaco.KeyCode.RightArrow && event.metaKey);

      if (isCompletionVisible && isTabOrCmdRightArrow) {
        isCompletionAccepted = true;
        isCompletionVisible = false;
      } else {
        isCompletionAccepted = false;
      }
    });

    disposables.push(keyDownListener);

    return {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        clearCompletionCache();
        isCompletionAccepted = false;
        isCompletionVisible = false;
      },
    };
  } catch (_err) {
    handleError(_err, ErrorContext.REGISTER_COPILOT);
    return {
      deregister: () => disposables.forEach(disposable => disposable.dispose()),
    };
  }
};
