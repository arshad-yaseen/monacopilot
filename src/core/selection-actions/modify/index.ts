import {MODIFY_BUTTON_CLASS} from '../../../constants/modify';
import {
  EditorSelection,
  ModifyOptions,
  StandaloneCodeEditor,
} from '../../../types';
import {disposeWidgets} from '../actions-state';
import {showModifyWidget} from './widgets/modify-widget';

/**
 * Shows the modify button in the action buttons widget.
 *
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
  modifyButton.className = MODIFY_BUTTON_CLASS;
  modifyButton.onclick = () => {
    disposeWidgets(editor);
    showModifyWidget(editor, selection, options);
  };
  domNode.appendChild(modifyButton);
};
