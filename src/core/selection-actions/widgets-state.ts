import {EditorWidgetState, StandaloneCodeEditor} from '../../types';

/**
 * WeakMap to store the editor widget state.
 */
export const editorWidgetState = new WeakMap<
  StandaloneCodeEditor,
  EditorWidgetState
>();

/**
 * Disposes all action-related widgets from the editor.
 * @param editor - The editor instance.
 */
export const disposeWidgets = (editor: StandaloneCodeEditor) => {
  const state = editorWidgetState.get(editor);
  if (state && state.widgets.size > 0) {
    state.widgets.forEach(widgetId => {
      editor.removeOverlayWidget({
        getId: () => widgetId,
        getDomNode: () => null as unknown as HTMLElement,
        getPosition: () => null,
      });
    });
    state.widgets.clear();
  }
};
