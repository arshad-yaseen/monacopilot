import {fetchModifiedCode} from '../../helpers/modify/fetch-modified-code';
import {log} from '../../log';
import {
  EditorDecorationsCollection,
  EditorSelection,
  RegisterModifyOptions,
  StandaloneCodeEditor,
} from '../../types';
import {applyDiffDecorations} from '../../utils';

/**
 * Handles the modification of the selected code.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param prompt - The user's prompt describing the modifications.
 * @param options - Options for the modify functionality.
 * @param promptDomNode - The DOM node of the prompt widget.
 */
const handleModifySelection = async (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  prompt: string,
  options: RegisterModifyOptions,
  promptDomNode: HTMLElement,
) => {
  const model = editor.getModel();
  if (!model) return;

  const originalCode = model.getValueInRange(selection);

  try {
    // Indicate loading state
    promptDomNode.classList.add('loading');

    const modifiedCode = await fetchModifiedCode(originalCode, prompt, options);

    // Remove loading state
    promptDomNode.classList.remove('loading');

    // Apply diff decorations
    const decorations = applyDiffDecorations(
      editor,
      originalCode,
      modifiedCode,
    );

    if (!decorations) return;

    // Update the prompt widget to show Accept/Reject buttons
    showAcceptRejectControls(
      editor,
      promptDomNode,
      decorations,
      selection,
      modifiedCode,
    );
  } catch (error) {
    // Remove loading state
    promptDomNode.classList.remove('loading');

    if (options.onError) {
      options.onError(error as Error);
    } else {
      log.error(error);
    }
  }
};

export default handleModifySelection;

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
  decorations: EditorDecorationsCollection,
  selection: EditorSelection,
  modifiedCode: string,
) => {
  // Clear existing content in the prompt widget
  promptDomNode.innerHTML = '';

  // Create Accept and Reject buttons
  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Accept';
  acceptButton.onclick = () => {
    acceptChanges(editor, decorations, selection, modifiedCode);
  };

  const rejectButton = document.createElement('button');
  rejectButton.textContent = 'Reject';
  rejectButton.onclick = () => {
    rejectChanges(decorations);
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
 */
const acceptChanges = (
  editor: StandaloneCodeEditor,
  decorations: EditorDecorationsCollection | null,
  selection: EditorSelection,
  modifiedCode: string,
) => {
  const model = editor.getModel();
  if (!model) return;

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

  if (decorations) {
    decorations.clear();
  }
};

/**
 * Rejects the changes and restores the editor to its original state.
 * @param editor - The editor instance.
 * @param decorations - The diff decorations applied.
 */
const rejectChanges = (decorations: EditorDecorationsCollection | null) => {
  if (decorations) {
    decorations.clear();
  }
};
