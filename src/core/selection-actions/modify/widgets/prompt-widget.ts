import {handleModifySelection} from '..';
import {DEFAULT_MODIFY_PLACEHOLDER} from '../../../../constants/modify';
import {
  EditorOverlayWidget,
  EditorSelection,
  ModifyOptions,
  OverlayWidgetPositionPreference,
  StandaloneCodeEditor,
} from '../../../../types';
import {generateUniqueId} from '../../../../utils';
import {disposeWidgets, editorWidgetState} from '../../widgets-state';

/**
 * Shows the prompt input overlay widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 */
export const showPromptWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: ModifyOptions,
) => {
  const widget = createPromptWidget(editor, selection, options);
  editor.addOverlayWidget(widget);

  const state = editorWidgetState.get(editor);
  if (state) {
    state.widgets.add(widget.getId());
  }
};

/**
 * Creates the prompt input overlay widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 * @returns The overlay widget.
 */
const createPromptWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: ModifyOptions,
): EditorOverlayWidget => {
  const widgetId = `prompt-widget-${generateUniqueId()}`;
  const domNode = document.createElement('div');
  domNode.className = 'prompt-widget';

  const textArea = document.createElement('textarea');
  textArea.placeholder = options.placeholder || DEFAULT_MODIFY_PLACEHOLDER;

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.onclick = () => {
    const prompt = textArea.value.trim();
    if (prompt) {
      handleModifySelection(editor, selection, prompt, options, domNode);
      disposeWidgets(editor);
    }
  };

  domNode.appendChild(textArea);
  domNode.appendChild(submitButton);

  return {
    getId: () => widgetId,
    getDomNode: () => domNode,
    getPosition: () => ({
      position: selection.getStartPosition(),
      preference: OverlayWidgetPositionPreference.TOP_CENTER,
    }),
  };
};
