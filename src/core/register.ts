import {ErrorContext, handleError} from '../error';
import {
  CopilotRegistration,
  Disposable,
  Monaco,
  RegisterCopilotOptions,
  StandaloneCodeEditor,
} from '../types';
import handleInlineCompletions, {completionCache} from './handler';

const editorCompletionState = new WeakMap<
  StandaloneCodeEditor,
  {
    isCompletionAccepted: boolean;
    isCompletionVisible: boolean;
  }
>();

let singletonInstance: CopilotRegistration | null = null;

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
  if (singletonInstance) {
    singletonInstance.deregister();
  }

  const disposables: Disposable[] = [];

  editorCompletionState.set(editor, {
    isCompletionAccepted: false,
    isCompletionVisible: false,
  });

  try {
    const inlineCompletionsProvider =
      monaco.languages.registerInlineCompletionsProvider(options.language, {
        provideInlineCompletions: (model, position, _, token) => {
          const state = editorCompletionState.get(editor);
          if (!state) {
            return;
          }
          return handleInlineCompletions({
            monaco,
            model,
            position,
            token,
            isCompletionAccepted: state.isCompletionAccepted,
            onShowCompletion: () => {
              state.isCompletionVisible = true;
            },
            options,
          });
        },
        freeInlineCompletions: () => {},
      });

    disposables.push(inlineCompletionsProvider);

    const keyDownListener = editor.onKeyDown(event => {
      const state = editorCompletionState.get(editor);
      if (!state) {
        return;
      }
      // If the user presses Tab or Cmd + Right Arrow while completion is visible, it means the completion was accepted
      const isTabOrCmdRightArrow =
        event.keyCode === monaco.KeyCode.Tab ||
        (event.keyCode === monaco.KeyCode.RightArrow && event.metaKey);

      if (state.isCompletionVisible && isTabOrCmdRightArrow) {
        state.isCompletionAccepted = true;
        state.isCompletionVisible = false;
      } else {
        state.isCompletionAccepted = false;
      }
    });

    disposables.push(keyDownListener);

    const registration: CopilotRegistration = {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        completionCache.clearCompletionCache();
        editorCompletionState.delete(editor);
        singletonInstance = null;
      },
    };

    singletonInstance = registration;

    return registration;
  } catch (err) {
    handleError(err, ErrorContext.REGISTER_COPILOT);
    return {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        editorCompletionState.delete(editor);
        singletonInstance = null;
      },
    };
  }
};
