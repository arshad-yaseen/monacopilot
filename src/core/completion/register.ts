import {RecentChangesTracker} from '../../classes/recent-changes-tracker';
import {deprecated, report, warn} from '../../logger';
import {
  CompletionRegistration,
  Disposable,
  Monaco,
  RegisterCompletionOptions,
  StandaloneCodeEditor,
  TriggerType,
} from '../../types';
import handleInlineCompletions, {completionCache} from './handler';

type EditorCompletionState = {
  isCompletionAccepted: boolean;
  isCompletionVisible: boolean;
  isManualTrigger: boolean;
  recentChangesTracker: RecentChangesTracker;
};

const editorCompletionState = new WeakMap<
  StandaloneCodeEditor,
  EditorCompletionState
>();

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

  const disposables: Disposable[] = [];
  const model = editor.getModel();

  if (!model) {
    throw new Error('Editor model not found');
  }

  const recentChangesTracker = new RecentChangesTracker(model);
  const initialState: EditorCompletionState = {
    isCompletionAccepted: false,
    isCompletionVisible: false,
    isManualTrigger: false,
    recentChangesTracker,
  };

  editorCompletionState.set(editor, initialState);

  // Update editor options to force the enabling of inline completions and to use subwordSmart mode
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

          if (!state) return;

          const isOnDemandTrigger =
            options.trigger === TriggerType.OnDemand && !state.isManualTrigger;

          if (isOnDemandTrigger) return;

          const recentChanges = state.recentChangesTracker.getRecentChanges();

          return handleInlineCompletions({
            monaco,
            mdl,
            pos,
            token,
            isCompletionAccepted: state.isCompletionAccepted,
            onShowCompletion: () => {
              state.isCompletionVisible = true;
              state.isManualTrigger = false;
            },
            options,
            recentChanges,
          });
        },
        freeInlineCompletions: () => {
          // No-op
        },
      });
    disposables.push(inlineCompletionsProvider);

    // Listen for keydown events to detect completion acceptance
    const keyDownListener = editor.onKeyDown(event => {
      const state = editorCompletionState.get(editor);
      if (!state) return;

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

    // Create completion registration object
    const registration: CompletionRegistration = {
      deregister: () => {
        const state = editorCompletionState.get(editor);
        state?.recentChangesTracker.dispose();
        disposables.forEach(disposable => disposable.dispose());
        completionCache.clear();
        editorCompletionState.delete(editor);
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
      report(error);
    }

    return {
      deregister: () => {
        const state = editorCompletionState.get(editor);
        state?.recentChangesTracker.dispose();
        disposables.forEach(disposable => disposable.dispose());
        editorCompletionState.delete(editor);
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
  const state = editorCompletionState.get(editor);
  if (!state) {
    warn(
      'Completion is not registered. Use `registerCompletion` to register completion first.',
    );
    return;
  }
  state.isManualTrigger = true;
  editor.trigger('keyboard', 'editor.action.inlineSuggest.trigger', {});
};

/**
 * @deprecated Use `registerCompletion` instead. This function will be removed in a future version.
 */
export const registerCopilot = (
  ...args: Parameters<typeof registerCompletion>
) => {
  deprecated('registerCopilot', 'registerCompletion');

  return registerCompletion(...args);
};
