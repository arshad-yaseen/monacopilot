import {ACTION_BUTTONS_WIDGET_CLASS} from '../../constants/classnames';
import {log} from '../../log';
import {selectionActionsState} from '../../state';
import {
  ContentWidgetPositionPreference,
  EditorContentWidget,
  EditorSelection,
  Monaco,
  RegisterSelectionActionsOptions,
  SelectionActionsRegistration,
  StandaloneCodeEditor,
} from '../../types';
import {isLineEmpty, removeSelection, uid} from '../../utils';
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

  // Initialize editor widget state
  selectionActionsState.getWidgetState(editor);

  const deregister = () => {
    selectionActionsState.clearState(editor);
    activeRegistration = null;
  };

  try {
    // Listen for mouse up event to detect end of selection
    const mouseUpListener = editor.onMouseUp(() => {
      const selection = editor.getSelection();
      if (
        selection &&
        !selection.isEmpty() &&
        !selectionActionsState.isSelectionActionsWidgetOpen(editor)
      ) {
        showActionButtonsWidget(editor, selection, options);
        selectionActionsState.setSelectionActionsWidgetOpen(editor, true);
      }
    });

    selectionActionsState.addDisposable(editor, mouseUpListener);

    // Listen for selection change event to detect keyboard selection
    const selectionChangeListener = editor.onDidChangeCursorSelection(e => {
      if (
        e.source === 'keyboard' &&
        !e.selection.isEmpty() &&
        !selectionActionsState.isSelectionActionsWidgetOpen(editor)
      ) {
        showActionButtonsWidget(editor, e.selection, options);
        selectionActionsState.setSelectionActionsWidgetOpen(editor, true);
      }
    });

    selectionActionsState.addDisposable(editor, selectionChangeListener);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      const selection = editor.getSelection();
      if (selection) {
        const mdl = editor.getModel();
        if (mdl && !isLineEmpty(selection.startLineNumber, mdl)) return;
        selectionActionsState.setSelectionActionsWidgetOpen(editor, true);
        showModifyWidget(editor, selection, options.modify);
      }
    });

    editor.addCommand(monaco.KeyCode.Escape, () => {
      selectionActionsState.disposeWidgets(editor);
      selectionActionsState.disposeDiffDecorations(editor);
      selectionActionsState.setSelectionActionsWidgetOpen(editor, false);
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

  const state = selectionActionsState.getWidgetState(editor);
  state.widgets.add(widget.getId());
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
