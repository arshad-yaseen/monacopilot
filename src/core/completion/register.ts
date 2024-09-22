import {ErrorContext, handleError} from '../../error';
import {
  CompletionRegistration,
  Disposable,
  Monaco,
  RegisterCompletionOptions,
  StandaloneCodeEditor,
} from '../../types';
import handleInlineCompletions, {completionCache} from './handler';

const editorCompletionState = new WeakMap<
  StandaloneCodeEditor,
  {
    isCompletionAccepted: boolean;
    isCompletionVisible: boolean;
  }
>();

let singletonInstance: CompletionRegistration | null = null;

/**
 * Registers the completion with the Monaco editor.
 * @param monaco The Monaco instance.
 * @param editor The editor instance.
 * @param options The options for the completion.
 * @returns CompletionRegistration object with a deregister method.
 */
export const registerCompletion = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterCompletionOptions,
): CompletionRegistration => {
  if (singletonInstance) {
    singletonInstance.deregister();
  }

  const disposables: Disposable[] = [];

  editorCompletionState.set(editor, {
    isCompletionAccepted: false,
    isCompletionVisible: false,
  });

  editor.updateOptions({
    inlineSuggest: {
      enabled: true,
      mode: 'subwordSmart',
    },
  });

  try {
    const inlineCompletionsProvider =
      monaco.languages.registerInlineCompletionsProvider(options.language, {
        provideInlineCompletions: (mdl, pos, _, token) => {
          const state = editorCompletionState.get(editor);
          if (!state) {
            return;
          }
          return handleInlineCompletions({
            mdl,
            pos,
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

    const registration: CompletionRegistration = {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        completionCache.clear();
        editorCompletionState.delete(editor);
        singletonInstance = null;
      },
    };

    singletonInstance = registration;

    return registration;
  } catch (err) {
    handleError(err, ErrorContext.REGISTER_COMPLETION);
    return {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        editorCompletionState.delete(editor);
        singletonInstance = null;
      },
    };
  }
};

/**
 * @deprecated Use `registerCompletion` instead. This function will be removed in a future version.
 */
export const registerCopilot = registerCompletion;
