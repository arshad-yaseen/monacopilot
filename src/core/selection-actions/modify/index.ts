import {
  ACTION_BUTTONS_WIDGET_BUTTON_KEY_CLASS,
  MODIFY_BUTTON_CLASS,
  MODIFY_BUTTON_KEY_CLASS,
  MODIFY_BUTTON_TEXT_CLASS,
} from '../../../constants/classnames';
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
): void => {
  const modifyButton = document.createElement('button');
  modifyButton.className = MODIFY_BUTTON_CLASS;

  const modifyButtonText = document.createElement('span');
  modifyButtonText.textContent = 'Modify';
  modifyButtonText.className = MODIFY_BUTTON_TEXT_CLASS;

  const modifyButtonKey = document.createElement('span');
  modifyButtonKey.textContent = '⌘K';
  modifyButtonKey.className = `${MODIFY_BUTTON_KEY_CLASS} ${ACTION_BUTTONS_WIDGET_BUTTON_KEY_CLASS}`;
  modifyButtonKey.setAttribute('aria-hidden', 'true');

  modifyButton.appendChild(modifyButtonText);
  modifyButton.appendChild(modifyButtonKey);

  const clickHandler = () => {
    disposeWidgets(editor);
    showModifyWidget(editor, selection, options);
  };

  modifyButton.addEventListener('click', clickHandler);
  modifyButton.onclick = clickHandler;

  modifyButton.setAttribute('title', 'Modify selected code');
  modifyButton.setAttribute('aria-label', 'Modify selected code (Command + K)');
  modifyButton.setAttribute('role', 'button');

  domNode.appendChild(modifyButton);
};
