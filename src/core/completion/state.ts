import {StandaloneCodeEditor} from '../../types';

export type EditorCompletionState = {
  /** Whether the current completion suggestion has been accepted by the user */
  isCompletionAccepted: boolean;
  /** Whether a completion suggestion is currently being shown */
  isCompletionVisible: boolean;
  /** Whether completion was explicitly triggered by user action (vs automatic) */
  isExplicitlyTriggered: boolean;
  /** Whether the current completion suggestion was rejected by the user */
  hasRejectedCurrentCompletion: boolean;
};

const editorCompletionState = new WeakMap<
  StandaloneCodeEditor,
  EditorCompletionState
>();

export const getEditorState = (editor: StandaloneCodeEditor) => {
  return editorCompletionState.get(editor);
};

export const setEditorState = (
  editor: StandaloneCodeEditor,
  state: EditorCompletionState,
) => {
  editorCompletionState.set(editor, state);
};

export const deleteEditorState = (editor: StandaloneCodeEditor) => {
  editorCompletionState.delete(editor);
};

export const createInitialState = (): EditorCompletionState => ({
  isCompletionAccepted: false,
  isCompletionVisible: false,
  isExplicitlyTriggered: false,
  hasRejectedCurrentCompletion: false,
});
