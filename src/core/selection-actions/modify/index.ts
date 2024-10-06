import {fetchModifiedCode} from '../../../helpers/modify/fetch-modified-code';
import {
  EditorSelection,
  ModifyOptions,
  StandaloneCodeEditor,
} from '../../../types';
import {diffDecorations, removeSelection} from '../../../utils';
import {disposeWidgets} from '../widgets-state';
import {showPromptWidget} from './widgets/prompt-widget';

/**
 * Shows the modify button in the action buttons widget.
 * @param editor - The editor instance.
 * @param domNode - The DOM node of the action buttons widget.
 * @param selection - The current selection.
 * @param options - The options for the modify functionality.
 */
export const showModifyButton = (
  editor: StandaloneCodeEditor,
  domNode: HTMLElement,
  selection: EditorSelection,
  options: ModifyOptions,
) => {
  const modifyButton = document.createElement('button');
  modifyButton.textContent = 'Modify';
  modifyButton.onclick = () => {
    disposeWidgets(editor);
    showPromptWidget(editor, selection, options);
  };
  domNode.appendChild(modifyButton);
};

/**
 * Handles the modification of the selected code.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param prompt - The user's prompt describing the modifications.
 * @param options - Options for the modify functionality.
 * @param promptDomNode - The DOM node of the prompt widget.
 */
export const handleModifySelection = async (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  prompt: string,
  options: ModifyOptions,
  promptDomNode: HTMLElement,
) => {
  const model = editor.getModel();
  if (!model) return;

  const originalCode = model.getValueInRange(selection);

  // Indicate loading state
  promptDomNode.dataset.loading = 'true';

  const modifiedCode = await fetchModifiedCode(originalCode, prompt, options);
  // Remove loading state
  promptDomNode.dataset.loading = 'false';

  // Apply diff decorations
  const decorations = diffDecorations(editor, originalCode, modifiedCode);

  if (!decorations) return;

  decorations.apply();

  // Update the prompt widget to show Accept/Reject buttons
  showAcceptRejectControls(
    editor,
    promptDomNode,
    decorations,
    selection,
    modifiedCode,
  );
};

/**
 * Updates the prompt widget to show Accept/Reject buttons.
 * @param editor - The editor instance.
 * @param promptDomNode - The DOM node of the prompt widget.
 * @param decorations - The diff decorations applied.
 * @param selection - The selection range of the original code.
 * @param modifiedCode - The modified code.
 */
const showAcceptRejectControls = (
  editor: StandaloneCodeEditor,
  promptDomNode: HTMLElement,
  decorations: ReturnType<typeof diffDecorations>,
  selection: EditorSelection,
  modifiedCode: string,
) => {
  // Clear existing content in the prompt widget
  promptDomNode.innerHTML = '';

  // Create Accept and Reject buttons
  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Accept';
  acceptButton.onclick = () => {
    acceptChanges(editor, decorations, selection, modifiedCode, promptDomNode);
    removeSelection(editor, selection);
  };

  const rejectButton = document.createElement('button');
  rejectButton.textContent = 'Reject';
  rejectButton.onclick = () => {
    rejectChanges(decorations, promptDomNode);
    removeSelection(editor, selection);
  };

  // Append buttons to the prompt widget
  promptDomNode.appendChild(acceptButton);
  promptDomNode.appendChild(rejectButton);
};

/**
 * Accepts the changes and replaces the selected code with the modified code.
 * @param editor - The editor instance.
 * @param decorations - The diff decorations applied.
 * @param selection - The selection range of the original code.
 * @param modifiedCode - The modified code.
 * @param promptDomNode - The DOM node of the prompt widget.
 */
const acceptChanges = (
  editor: StandaloneCodeEditor,
  decorations: ReturnType<typeof diffDecorations>,
  selection: EditorSelection,
  modifiedCode: string,
  promptDomNode: HTMLElement,
) => {
  const model = editor.getModel();
  if (!model) return;

  if (decorations) {
    decorations.clear();
  }

  // Clear the prompt widget content
  promptDomNode.innerHTML = '';

  model.pushEditOperations(
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
 * @param decorations - The diff decorations applied.
 * @param promptDomNode - The DOM node of the prompt widget.
 */
const rejectChanges = (
  decorations: ReturnType<typeof diffDecorations>,
  promptDomNode: HTMLElement,
) => {
  if (decorations) {
    decorations.clear();
  }

  // Clear the prompt widget content
  promptDomNode.innerHTML = '';
};
