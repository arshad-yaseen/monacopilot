import {log} from '../../log';
import {completionState} from '../../state';
import {
  CompletionRegistration,
  Monaco,
  RegisterCompletionOptions,
  StandaloneCodeEditor,
  TriggerType,
} from '../../types';
import handleInlineCompletions, {completionCache} from './handler';

let activeCompletionRegistration: CompletionRegistration | null = null;

/**
 * Registers completion functionality with the Monaco editor.
 * @param monaco - The Monaco instance.
 * @param editor - The editor instance.
 * @param options - Options for the completion.
 * @returns A CompletionRegistration object with deregister and trigger methods.
 */
export const registerCompletion = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterCompletionOptions,
): CompletionRegistration => {
  // Deregister any existing completion registration
  if (activeCompletionRegistration) {
    activeCompletionRegistration.deregister();
  }

  // Update editor options to force the enabling of inline completions and to use subwordSmart mode
  editor.updateOptions({
    inlineSuggest: {
      enabled: true,
      mode: 'subwordSmart',
    },
  });

  try {
    // Register inline completions provider
    const inlineCompletionsProvider =
      monaco.languages.registerInlineCompletionsProvider(
        options.context.currentLanguage,
        {
          provideInlineCompletions: (mdl, pos, _, token) => {
            const state = completionState.getState(editor);

            if (!completionState.canShowCompletion(editor)) return;

            const isOnDemandTrigger =
              options.trigger === TriggerType.OnDemand &&
              !state.isManualTrigger;

            if (isOnDemandTrigger) return;

            return handleInlineCompletions({
              mdl,
              editor,
              pos,
              token,
              isCompletionAccepted: state.isAccepted,
              onShowCompletion: () => {
                completionState.setState(editor, {
                  isVisible: true,
                  isManualTrigger: false,
                });
              },
              options,
            });
          },
          freeInlineCompletions: () => {
            // No-op
          },
        },
      );

    completionState.addDisposable(editor, inlineCompletionsProvider);

    // Listen for keydown events to detect completion acceptance
    const keyDownListener = editor.onKeyDown(event => {
      const state = completionState.getState(editor);

      const isTabOrCmdRightArrow =
        event.keyCode === monaco.KeyCode.Tab ||
        (event.keyCode === monaco.KeyCode.RightArrow && event.metaKey);

      if (state.isVisible && isTabOrCmdRightArrow) {
        completionState.setState(editor, {
          isAccepted: true,
          isVisible: false,
        });
      } else {
        completionState.setState(editor, {
          isAccepted: false,
        });
      }
    });

    completionState.addDisposable(editor, keyDownListener);

    // Create completion registration object
    const registration: CompletionRegistration = {
      deregister: () => {
        completionCache.clear();
        completionState.clearState(editor);
        activeCompletionRegistration = null;
      },
      trigger: () => handleTriggerCompletion(editor),
    };

    activeCompletionRegistration = registration;

    return registration;
  } catch (error) {
    if (options.onError) {
      options.onError(error as Error);
    } else {
      log.error(error);
    }

    return {
      deregister: () => {
        completionCache.clear();
        completionState.clearState(editor);
        activeCompletionRegistration = null;
      },
      trigger: () => {
        // No-op
      },
    };
  }
};

/**
 * Triggers the completion manually.
 * @param editor - The editor instance.
 */
const handleTriggerCompletion = (editor: StandaloneCodeEditor) => {
  if (!completionState.canShowCompletion(editor)) {
    return;
  }
  completionState.setState(editor, {isManualTrigger: true});
  editor.trigger('keyboard', 'editor.action.inlineSuggest.trigger', {});
};

/**
 * @deprecated Use `registerCompletion` instead. This function will be removed in a future version.
 */
export const registerCopilot = (
  ...args: Parameters<typeof registerCompletion>
) => {
  log.warning(
    'The `registerCopilot` function is deprecated. Use `registerCompletion` instead.',
  );

  return registerCompletion(...args);
};
