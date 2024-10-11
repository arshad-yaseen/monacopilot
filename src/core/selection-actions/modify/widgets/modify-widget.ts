import {
  DEFAULT_MODIFY_PLACEHOLDER,
  MODIFY_WIDGET_CLASS,
  MODIFY_WIDGET_CLOSE_BUTTON_CLASS,
  MODIFY_WIDGET_FOOTER_CLASS,
  MODIFY_WIDGET_PROMPT_CONTAINER_CLASS,
  MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS,
  MODIFY_WIDGET_PROMPT_TEXTAREA_CLASS,
} from '../../../../constants/classnames';
import {selectionActionsState} from '../../../../state';
import {
  ContentWidgetPositionPreference,
  EditorContentWidget,
  EditorSelection,
  ModifyOptions,
  StandaloneCodeEditor,
} from '../../../../types';
import {uid} from '../../../../utils';
import {handleModifySelection} from '../handler';

/**
 * Shows the modify widget.
 *
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 */
export const showModifyWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: ModifyOptions,
) => {
  // Dispose of existing widgets and decorations
  selectionActionsState.disposeWidgets(editor);
  selectionActionsState.disposeDiffDecorations(editor);

  const widget = createModifyWidget(editor, selection, options);

  editor.addContentWidget(widget);

  const state = selectionActionsState.getWidgetState(editor);
  if (state) {
    state.widgets.add(widget.getId());
    selectionActionsState.setSelectionActionsWidgetOpen(editor, true);
  }

  const existingCleanup = selectionActionsState.getCleanup(editor);

  if (existingCleanup) {
    existingCleanup();
  }

  // Focus the textarea after the widget is added
  const timeoutId = setTimeout(() => {
    const textArea = widget.getDomNode().querySelector('textarea');
    if (textArea) {
      textArea.focus();
    }
  }, 10);

  selectionActionsState.setCleanup(editor, () => clearTimeout(timeoutId));
};

/**
 * Creates the modify widget.
 *
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 * @returns The content widget.
 */
const createModifyWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: ModifyOptions,
): EditorContentWidget => {
  const widgetId = `modify-widget-${uid()}`;
  const domNode = document.createElement('div');
  domNode.className = MODIFY_WIDGET_CLASS;

  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.className = MODIFY_WIDGET_CLOSE_BUTTON_CLASS;
  closeButton.onclick = () => {
    selectionActionsState.disposeWidgets(editor);
    selectionActionsState.disposeDiffDecorations(editor);
    selectionActionsState.setSelectionActionsWidgetOpen(editor, false);
  };
  domNode.appendChild(closeButton);

  const promptContainer = document.createElement('div');
  promptContainer.className = MODIFY_WIDGET_PROMPT_CONTAINER_CLASS;

  const textArea = document.createElement('textarea');
  textArea.className = MODIFY_WIDGET_PROMPT_TEXTAREA_CLASS;
  textArea.placeholder = options.placeholder || DEFAULT_MODIFY_PLACEHOLDER;
  textArea.rows = 2;

  const footerContainer = document.createElement('div');
  footerContainer.className = MODIFY_WIDGET_FOOTER_CLASS;

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.className = MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS;

  const submitButtonClick = () => {
    const prompt = textArea.value.trim();
    if (prompt) {
      handleModifySelection(
        editor,
        selection,
        prompt,
        options,
        domNode,
        footerContainer,
      );
    }
  };

  submitButton.onclick = submitButtonClick;

  promptContainer.appendChild(textArea);
  footerContainer.appendChild(submitButton);

  domNode.appendChild(promptContainer);
  domNode.appendChild(footerContainer);

  textArea.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitButtonClick();
    }
  });

  return {
    getId: () => widgetId,
    getDomNode: () => domNode,
    getPosition: () => ({
      position: selection.isEmpty()
        ? editor.getPosition()
        : selection.getStartPosition(),
      preference: [
        ContentWidgetPositionPreference.ABOVE,
        ContentWidgetPositionPreference.BELOW,
        ContentWidgetPositionPreference.EXACT,
      ],
    }),
  };
};
