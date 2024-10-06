import {
  FETCHING_MODIFIED_CODE_CLASS,
  MODIFY_WIDGET_ACCEPT_BUTTON_CLASS,
  MODIFY_WIDGET_PROMPT_CONTAINER_CLASS,
  MODIFY_WIDGET_REJECT_BUTTON_CLASS,
} from '../../../constants';
import {
  EditorSelection,
  ModifyOptions,
  StandaloneCodeEditor,
} from '../../../types';
import {diffDecorations, removeSelection} from '../../../utils';
import {
  disposeDiffDecorations,
  disposeWidgets,
  editorDiffDecorationState,
  editorWidgetState,
} from '../actions-state';

/**
 * Handles the modification of the selected code.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param prompt - The user's prompt describing the modifications.
 * @param options - Options for the modify functionality.
 * @param modifyWidgetDomNode - The DOM node of the modify widget.
 */
export const handleModifySelection = async (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  prompt: string,
  options: ModifyOptions,
  modifyWidgetDomNode: HTMLElement,
) => {
  const mdl = editor.getModel();
  if (!mdl) return;

  const originalCode = mdl.getValueInRange(selection);

  // Indicate loading state
  modifyWidgetDomNode.classList.add(FETCHING_MODIFIED_CODE_CLASS);

  const modifiedCode = await new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(
        `const randomNumber = Math.random()\nconst isPalindrome = 'hsello'`,
      );
    }, 500);
  });

  // Remove loading state
  modifyWidgetDomNode.classList.remove(FETCHING_MODIFIED_CODE_CLASS);

  // Apply diff decorations
  const decorations = diffDecorations(editor, originalCode, modifiedCode);

  if (!decorations) return;

  editorDiffDecorationState.set(editor, decorations);

  decorations.apply();
  removeSelection(editor, selection);

  // Update the prompt widget to show Accept/Reject buttons
  showAcceptRejectControls(
    editor,
    modifyWidgetDomNode,
    selection,
    modifiedCode,
  );
};

/**
 * Updates the prompt widget to show Accept/Reject buttons.
 * @param editor - The editor instance.
 * @param modifyWidgetDomNode - The DOM node of the modify widget.
 * @param selection - The selection range of the original code.
 * @param modifiedCode - The modified code.
 */
const showAcceptRejectControls = (
  editor: StandaloneCodeEditor,
  modifyWidgetDomNode: HTMLElement,
  selection: EditorSelection,
  modifiedCode: string,
) => {
  // remove the prompt textarea and submit button
  const promptContainer = modifyWidgetDomNode.querySelector(
    `.${MODIFY_WIDGET_PROMPT_CONTAINER_CLASS}`,
  );
  if (promptContainer) {
    promptContainer.remove();
  }

  const state = editorWidgetState.get(editor);

  const beforeClick = () => {
    disposeDiffDecorations(editor);
    if (state) {
      state.isModifyWidgetVisible = false;
    }
  };

  // Create Accept and Reject buttons
  const acceptButton = document.createElement('button');
  acceptButton.className = MODIFY_WIDGET_ACCEPT_BUTTON_CLASS;
  acceptButton.textContent = 'Accept';
  acceptButton.onclick = () => {
    beforeClick();
    acceptChanges(editor, selection, modifiedCode, modifyWidgetDomNode);
    disposeWidgets(editor);
  };

  const rejectButton = document.createElement('button');
  rejectButton.className = MODIFY_WIDGET_REJECT_BUTTON_CLASS;
  rejectButton.textContent = 'Reject';
  rejectButton.onclick = () => {
    beforeClick();
    rejectChanges(editor, modifyWidgetDomNode);
    disposeWidgets(editor);
  };

  // Append buttons to the modify widget
  modifyWidgetDomNode.appendChild(acceptButton);
  modifyWidgetDomNode.appendChild(rejectButton);
};

/**
 * Accepts the changes and replaces the selected code with the modified code.
 * @param editor - The editor instance.
 * @param decorations - The diff decorations applied.
 * @param selection - The selection range of the original code.
 * @param modifiedCode - The modified code.
 * @param modifyWidgetDomNode - The DOM node of the modify widget.
 */
const acceptChanges = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  modifiedCode: string,
  modifyWidgetDomNode: HTMLElement,
) => {
  const mdl = editor.getModel();
  if (!mdl) return;

  // Clear the modify widget content
  modifyWidgetDomNode.innerHTML = '';

  mdl.pushEditOperations(
    [],
    [
      {
        range: selection,
        text: modifiedCode,
      },
    ],
    () => null,
  );
};

/**
 * Rejects the changes and restores the editor to its original state.
 * @param editor - The editor instance.
 * @param modifyWidgetDomNode - The DOM node of the modify widget.
 */
const rejectChanges = (
  editor: StandaloneCodeEditor,
  modifyWidgetDomNode: HTMLElement,
) => {
  disposeDiffDecorations(editor);
  // Clear the modify widget content
  modifyWidgetDomNode.innerHTML = '';
};
