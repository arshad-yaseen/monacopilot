import {ACTION_BUTTONS_WIDGET_CLASS} from '../../constants';
import {log} from '../../log';
import {
  ContentWidgetPositionPreference,
  Disposable,
  EditorContentWidget,
  EditorSelection,
  Monaco,
  RegisterSelectionActionsOptions,
  SelectionActionsRegistration,
  StandaloneCodeEditor,
} from '../../types';
import {removeSelection, uid} from '../../utils';
import {
  cleanups,
  disposeDiffDecorations,
  disposeWidgets,
  editorWidgetState,
} from './actions-state';
import {showModifyButton} from './modify';
import {showModifyWidget} from './modify/widgets/modify-widget';

let activeRegistration: SelectionActionsRegistration | null = null;

/**
 * Registers the selection action functionality with the Monaco editor.
 *
 * @param monaco - The Monaco instance.
 * @param editor - The editor instance.
 * @param options - Options for the action functionality.
 * @returns A SelectionActionsRegistration object with a deregister method.
 */
export const registerSelectionActions = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterSelectionActionsOptions,
): SelectionActionsRegistration => {
  // Currently unused; reserved for future use
  void monaco;

  // Deregister any existing registration
  if (activeRegistration) {
    activeRegistration.deregister();
  }

  const disposables: Disposable[] = [];

  // Initialize editor widget state
  editorWidgetState.set(editor, {
    isModifyWidgetVisible: false,
    widgets: new Set<string>(),
  });

  const deregister = () => {
    disposables.forEach(disposable => disposable.dispose());
    editorWidgetState.delete(editor);
    const cleanup = cleanups.get(editor);
    if (cleanup) {
      cleanup();
      cleanups.delete(editor);
    }
    disposeWidgets(editor);
    disposeDiffDecorations(editor);
    activeRegistration = null;
  };

  try {
    // Listen for selection changes
    const selectionChangeListener = editor.onDidChangeCursorSelection(event => {
      const state = editorWidgetState.get(editor);
      if (!state) return;

      const selection = event.selection;
      if (!selection.isEmpty()) {
        if (!state.isModifyWidgetVisible) {
          // Dispose of existing widgets and decorations
          disposeWidgets(editor);
          disposeDiffDecorations(editor);

          showActionButtonsWidget(editor, selection, options);
        }
      } else if (!state.isModifyWidgetVisible) {
        disposeWidgets(editor);
        disposeDiffDecorations(editor);
      }
    });
    disposables.push(selectionChangeListener);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      const selection = editor.getSelection();
      if (selection) {
        showModifyWidget(editor, selection, options.modify);
      }
    });

    editor.addCommand(monaco.KeyCode.Escape, () => {
      disposeWidgets(editor);
      disposeDiffDecorations(editor);
      const selection = editor.getSelection();
      if (selection) {
        removeSelection(editor, selection);
      }
    });

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
 * Shows the action buttons content widget.
 *
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
  editor.addContentWidget(widget);

  const state = editorWidgetState.get(editor);
  if (state) {
    state.widgets.add(widget.getId());
  }
};

/**
 * Creates the action buttons content widget.
 *
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the action functionality.
 * @returns The content widget.
 */
const createActionButtonsWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: RegisterSelectionActionsOptions,
): EditorContentWidget => {
  const widgetId = `action-buttons-widget-${uid()}`;
  const domNode = document.createElement('div');
  domNode.className = ACTION_BUTTONS_WIDGET_CLASS;

  // Modify Button
  if (options.actions.includes('modify')) {
    showModifyButton(editor, domNode, selection, options.modify);
  }

  return {
    getId: () => widgetId,
    getDomNode: () => domNode,
    getPosition: () => ({
      position: selection.getStartPosition(),
      preference: [
        ContentWidgetPositionPreference.ABOVE,
        ContentWidgetPositionPreference.BELOW,
        ContentWidgetPositionPreference.EXACT,
      ],
    }),
  };
};
