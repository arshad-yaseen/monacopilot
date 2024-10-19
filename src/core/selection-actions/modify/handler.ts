import {
  MODIFY_WIDGET_ACCEPT_BUTTON_CLASS,
  MODIFY_WIDGET_CANCEL_BUTTON_CLASS,
  MODIFY_WIDGET_CANCEL_BUTTON_TEXT_CLASS,
  MODIFY_WIDGET_CLOSE_BUTTON_CLASS,
  MODIFY_WIDGET_LOADING_CONTAINER_CLASS,
  MODIFY_WIDGET_LOADING_DOT_CLASS,
  MODIFY_WIDGET_PROMPT_CONTAINER_CLASS,
  MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS,
  MODIFY_WIDGET_REJECT_BUTTON_CLASS,
} from '../../../constants/classnames';
import {
  constructModifyMetadata,
  fetchModifiedText,
} from '../../../helpers/modify';
import {selectionActionsState} from '../../../state';
import {
  EditorSelection,
  ModifyOptions,
  StandaloneCodeEditor,
} from '../../../types';
import {applyDiffDecorations, removeSelection} from '../../../utils';
import {formatModifiedText} from '../../../utils/modify';

/**
 * Handles the modification of the selected code.
 *
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param prompt - The user's prompt describing the modifications.
 * @param options - Options for the modify functionality.
 * @param modifyWidgetDomNode - The DOM node of the modify widget.
 * @param footerContainer - The DOM node of the modify widget footer.
 */
export const handleModifySelection = async (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  prompt: string,
  options: ModifyOptions,
  modifyWidgetDomNode: HTMLElement,
  footerContainer: HTMLElement,
) => {
  const model = editor.getModel();
  if (!model) return;

  const originalText = model.getValueInRange(selection);

  // Indicate loading state
  modifyWidgetDomNode.dataset.fetching = 'true';

  const cancelButton = document.createElement('button');
  cancelButton.className = MODIFY_WIDGET_CANCEL_BUTTON_CLASS;
  const cancelButtonText = document.createElement('span');
  cancelButtonText.textContent = 'Cancel';
  cancelButtonText.className = MODIFY_WIDGET_CANCEL_BUTTON_TEXT_CLASS;
  const cancelButtonLoading = document.createElement('span');
  cancelButtonLoading.className = MODIFY_WIDGET_LOADING_CONTAINER_CLASS;
  const dot1 = document.createElement('span');
  dot1.className = MODIFY_WIDGET_LOADING_DOT_CLASS;
  const dot2 = document.createElement('span');
  dot2.className = MODIFY_WIDGET_LOADING_DOT_CLASS;
  const dot3 = document.createElement('span');
  dot3.className = MODIFY_WIDGET_LOADING_DOT_CLASS;

  cancelButtonLoading.appendChild(dot1);
  cancelButtonLoading.appendChild(dot2);
  cancelButtonLoading.appendChild(dot3);

  cancelButton.appendChild(cancelButtonText);
  cancelButton.appendChild(cancelButtonLoading);

  footerContainer.appendChild(cancelButton);
  footerContainer.insertBefore(cancelButton, footerContainer.firstChild);

  modifyWidgetDomNode.appendChild(footerContainer);

  const submitButton = footerContainer.querySelector(
    `.${MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS}`,
  );

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
  }

  try {
    const {modifiedText} = await fetchModifiedText({
      endpoint: options.endpoint,
      body: {
        metadata: constructModifyMetadata({
          mdl: model,
          pos: editor.getPosition(),
          prompt,
          options,
          selection,
        }),
      },
    });

    const formattedModifiedText = modifiedText
      ? formatModifiedText(modifiedText)
      : null;

    // Remove loading state
    modifyWidgetDomNode.dataset.fetching = 'false';
    cancelButton.remove();

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
    }

    if (!formattedModifiedText) {
      selectionActionsState.disposeWidgets(editor);
      return;
    }

    // Apply diff decorations
    const decorations = applyDiffDecorations(
      editor,
      originalText,
      formattedModifiedText,
      selection,
    );

    if (!decorations) return;

    selectionActionsState.setDiffDecorationState(editor, decorations);

    removeSelection(editor, selection);

    // Update the prompt widget to show Accept/Reject buttons
    showAcceptRejectControls(
      editor,
      footerContainer,
      selection,
      formattedModifiedText,
      modifyWidgetDomNode,
    );
  } catch (error) {
    // Handle error
    modifyWidgetDomNode.dataset.fetching = 'false';
    cancelButton.remove();

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
    }

    throw error;
  }
};

/**
 * Updates the prompt widget to show Accept/Reject buttons.
 *
 * @param editor - The editor instance.
 * @param footerContainer - The DOM node of the modify widget footer.
 * @param selection - The selection range of the original text.
 * @param modifiedText - The modified text.
 * @param modifyWidgetDomNode - The DOM node of the modify widget.
 */
const showAcceptRejectControls = (
  editor: StandaloneCodeEditor,
  footerContainer: HTMLElement,
  selection: EditorSelection,
  modifiedText: string,
  modifyWidgetDomNode: HTMLElement,
) => {
  const promptContainer = modifyWidgetDomNode.querySelector(
    `.${MODIFY_WIDGET_PROMPT_CONTAINER_CLASS}`,
  );

  promptContainer?.remove();

  const submitButton = footerContainer.querySelector(
    `.${MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS}`,
  );

  submitButton?.remove();

  // hide the close button
  const closeButton = modifyWidgetDomNode.querySelector(
    `.${MODIFY_WIDGET_CLOSE_BUTTON_CLASS}`,
  );

  closeButton?.remove();

  const beforeClick = () => {
    selectionActionsState.disposeDiffDecorations(editor);
    selectionActionsState.setSelectionActionsWidgetOpen(editor, false);
  };

  // Create Accept and Reject buttons
  const acceptButton = document.createElement('button');
  acceptButton.className = MODIFY_WIDGET_ACCEPT_BUTTON_CLASS;
  acceptButton.textContent = 'Accept';
  acceptButton.onclick = () => {
    beforeClick();
    acceptChanges(editor, selection, modifiedText);
    selectionActionsState.disposeWidgets(editor);
  };

  const rejectButton = document.createElement('button');
  rejectButton.className = MODIFY_WIDGET_REJECT_BUTTON_CLASS;
  rejectButton.textContent = 'Reject';
  rejectButton.onclick = () => {
    beforeClick();
    rejectChanges(editor);
    selectionActionsState.disposeWidgets(editor);
  };

  // Append buttons to the modify widget
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'modify-widget-controls';
  controlsContainer.appendChild(acceptButton);
  controlsContainer.appendChild(rejectButton);

  footerContainer.appendChild(controlsContainer);
};

/**
 * Accepts the changes and replaces the selected code with the modified code.
 *
 * @param editor - The editor instance.
 * @param selection - The selection range of the original text.
 * @param modifiedText - The modified text.
 */
const acceptChanges = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  modifiedText: string,
) => {
  const model = editor.getModel();
  if (!model) return;

  model.pushEditOperations(
    [],
    [
      {
        range: selection,
        text: modifiedText,
      },
    ],
    () => null,
  );
};

/**
 * Rejects the changes and restores the editor to its original state.
 *
 * @param editor - The editor instance.
 */
const rejectChanges = (editor: StandaloneCodeEditor) => {
  selectionActionsState.disposeWidgets(editor);
  selectionActionsState.disposeDiffDecorations(editor);
};
