import {log} from '../../log';
import {
  Disposable,
  EditorOverlayWidget,
  EditorSelection,
  Monaco,
  OverlayWidgetPositionPreference,
  RegisterSelectionActionsOptions,
  SelectionActionsRegistration,
  StandaloneCodeEditor,
} from '../../types';
import {generateUniqueId} from '../../utils';
import {showModifyButton} from './modify';
import {disposeWidgets, editorWidgetState} from './widgets-state';

let activeRegistration: SelectionActionsRegistration | null = null;

/**
 * Registers the selection action functionality with the Monaco editor.
 * @param monaco - The Monaco instance.
 * @param editor - The editor instance.
 * @param options - Options for the action functionality.
 * @returns A ModifyRegistration object with a deregister method.
 */
export const registerSelectionActions = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterSelectionActionsOptions,
): SelectionActionsRegistration => {
  // Deregister any existing registration
  if (activeRegistration) {
    activeRegistration.deregister();
  }

  const disposables: Disposable[] = [];

  // Initialize editor widget state
  editorWidgetState.set(editor, {
    isWidgetVisible: false,
    widgets: new Set<string>(),
  });

  const deregister = () => {
    disposables.forEach(disposable => disposable.dispose());
    editorWidgetState.delete(editor);
    disposeWidgets(editor);
    activeRegistration = null;
  };

  try {
    // Listen for selection changes
    const selectionChangeListener = editor.onDidChangeCursorSelection(event => {
      const state = editorWidgetState.get(editor);
      if (!state) return;

      const selection = event.selection;
      if (!selection.isEmpty()) {
        if (!state.isWidgetVisible) {
          state.isWidgetVisible = true;
          showActionButtonsWidget(editor, selection, options);
        }
      } else if (state.isWidgetVisible) {
        state.isWidgetVisible = false;
        disposeWidgets(editor);
      }
    });
    disposables.push(selectionChangeListener);

    // Create registration object
    const registration: SelectionActionsRegistration = {
      deregister,
    };

    activeRegistration = registration;

    return registration;
  } catch (error) {
    if (options.onError) {
      options.onError(error as Error);
    } else {
      log.error(error);
    }

    return {deregister};
  }
};

/**
 * Shows the action buttons overlay widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 */
export const showActionButtonsWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: RegisterSelectionActionsOptions,
) => {
  const widget = createActionButtonsWidget(editor, selection, options);
  editor.addOverlayWidget(widget);

  const state = editorWidgetState.get(editor);
  if (state) {
    state.widgets.add(widget.getId());
  }
};

/**
 * Creates the action buttons overlay widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 * @returns The overlay widget.
 */
const createActionButtonsWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: RegisterSelectionActionsOptions,
): EditorOverlayWidget => {
  const widgetId = `action-buttons-widget-${generateUniqueId()}`;
  const domNode = document.createElement('div');
  domNode.className = 'action-buttons-widget';

  // Modify Button
  showModifyButton(editor, domNode, selection, options.modify);

  return {
    getId: () => widgetId,
    getDomNode: () => domNode,
    getPosition: () => ({
      position: selection.getStartPosition(),
      preference: OverlayWidgetPositionPreference.TOP_CENTER,
    }),
  };
};
