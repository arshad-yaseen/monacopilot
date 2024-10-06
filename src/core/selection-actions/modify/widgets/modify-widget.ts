import {
  DEFAULT_MODIFY_PLACEHOLDER,
  MODIFY_WIDGET_CLASS,
  MODIFY_WIDGET_PROMPT_CONTAINER_CLASS,
  MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS,
  MODIFY_WIDGET_PROMPT_TEXTAREA_CLASS,
} from '../../../../constants';
import {
  EditorOverlayWidget,
  EditorSelection,
  ModifyOptions,
  OverlayWidgetPositionPreference,
  StandaloneCodeEditor,
} from '../../../../types';
import {uid} from '../../../../utils';
import {
  disposeDiffDecorations,
  disposeWidgets,
  editorWidgetState,
} from '../../actions-state';
import {handleModifySelection} from '../handler';

/**
 * Shows the modify widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 */
export const showModifyWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: ModifyOptions,
) => {
  const widget = createModifyWidget(editor, selection, options);

  editor.addOverlayWidget(widget);

  const state = editorWidgetState.get(editor);
  if (state) {
    state.widgets.add(widget.getId());
    state.isModifyWidgetVisible = true;
  }
};

/**
 * Creates the modify widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 * @returns The overlay widget.
 */
const createModifyWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: ModifyOptions,
): EditorOverlayWidget => {
  const widgetId = `modify-widget-${uid()}`;
  const domNode = document.createElement('div');
  domNode.className = MODIFY_WIDGET_CLASS;

  const state = editorWidgetState.get(editor);

  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.style.cssText =
    'position: absolute; top: 5px; right: 5px; cursor: pointer;';
  closeButton.onclick = () => {
    disposeWidgets(editor);
    disposeDiffDecorations(editor);
    if (state) {
      state.isModifyWidgetVisible = false;
    }
  };
  domNode.appendChild(closeButton);

  const promptContainer = document.createElement('div');
  promptContainer.className = MODIFY_WIDGET_PROMPT_CONTAINER_CLASS;

  const textArea = document.createElement('textarea');
  textArea.className = MODIFY_WIDGET_PROMPT_TEXTAREA_CLASS;
  textArea.placeholder = options.placeholder || DEFAULT_MODIFY_PLACEHOLDER;

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.className = MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS;
  submitButton.onclick = () => {
    const prompt = textArea.value.trim();
    if (prompt) {
      handleModifySelection(editor, selection, prompt, options, domNode);
    }
  };

  promptContainer.appendChild(textArea);
  promptContainer.appendChild(submitButton);

  domNode.appendChild(promptContainer);

  return {
    getId: () => widgetId,
    getDomNode: () => domNode,
    getPosition: () => ({
      position: selection.getStartPosition(),
      preference: OverlayWidgetPositionPreference.TOP_CENTER,
    }),
  };
};
