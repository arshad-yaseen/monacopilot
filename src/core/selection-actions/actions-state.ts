import {EditorWidgetState, StandaloneCodeEditor} from '../../types';
import {diffDecorations} from '../../utils';

/**
 * WeakMap to store the editor widget state.
 */
export const editorWidgetState = new WeakMap<
  StandaloneCodeEditor,
  EditorWidgetState
>();

/**
 * Disposes all action-related widgets from the editor.
 *
 * @param editor - The editor instance.
 */
export const disposeWidgets = (editor: StandaloneCodeEditor) => {
  const state = editorWidgetState.get(editor);
  if (state && state.widgets.size > 0) {
    state.widgets.forEach(widgetId => {
      editor.removeOverlayWidget({
        getId: () => widgetId,
        getDomNode: () => document.createElement('div'),
        getPosition: () => null,
      });
    });
    state.widgets.clear();
  }
};

/**
 * WeakMap to store the editor decorations (e.g., diff decorations).
 */
export const editorDiffDecorationState = new WeakMap<
  StandaloneCodeEditor,
  ReturnType<typeof diffDecorations>
>();

/**
 * Disposes all decorations from the editor.
 *
 * @param editor - The editor instance.
 */
export const disposeDiffDecorations = (editor: StandaloneCodeEditor) => {
  const state = editorDiffDecorationState.get(editor);
  if (state) {
    state.clear();
  }
  editorDiffDecorationState.delete(editor);
};
