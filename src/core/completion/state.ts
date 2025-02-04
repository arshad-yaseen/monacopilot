import {EditorCompletionState} from 'types/completion/internal';
import {StandaloneCodeEditor} from 'types/monaco';

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
