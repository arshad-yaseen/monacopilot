import {report, warn} from 'logger';

import {
  CompletionRegistration,
  RegisterCompletionOptions,
} from 'types/completion';
import {Disposable, Monaco, StandaloneCodeEditor} from 'types/monaco';

import {
  createInlineCompletionsProvider,
  handleTriggerCompletion,
} from './handlers';
import {createKeyDownListener} from './key-events';
import {completionCache} from './processor';
import {
  createInitialState,
  deleteEditorState,
  getEditorState,
  setEditorState,
} from './state';

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
  if (activeCompletionRegistration) {
    activeCompletionRegistration.deregister();
  }

  const disposables: Disposable[] = [];

  setEditorState(editor, createInitialState());

  editor.updateOptions({
    inlineSuggest: {
      enabled: true,
      mode: 'subwordSmart',
    },
  });

  try {
    const state = getEditorState(editor);

    if (!state) {
      warn('Completion is not registered properly. State not found.');
      return createEmptyRegistration();
    }

    const provider = createInlineCompletionsProvider(monaco, editor, options);
    if (provider) {
      disposables.push(provider);
    }

    const keyDownListener = createKeyDownListener(
      monaco,
      editor,
      state,
      options,
    );
    disposables.push(keyDownListener);

    const registration: CompletionRegistration = {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        completionCache.clear();
        deleteEditorState(editor);
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
        disposables.forEach(disposable => disposable.dispose());
        deleteEditorState(editor);
        activeCompletionRegistration = null;
      },
      trigger: () => {},
    };
  }
};

const createEmptyRegistration = (): CompletionRegistration => {
  return {
    deregister: () => {},
    trigger: () => {},
  };
};
