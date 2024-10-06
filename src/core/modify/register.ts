import {log} from '../../log';
import {
  Disposable,
  EditorModifyState,
  EditorOverlayWidget,
  EditorSelection,
  ModifyRegistration,
  Monaco,
  OverlayWidgetPositionPreference,
  RegisterModifyOptions,
  StandaloneCodeEditor,
} from '../../types';
import {generateRandomString} from '../../utils';
import handleModifySelection from './handler';

const editorModifyState = new WeakMap<
  StandaloneCodeEditor,
  EditorModifyState
>();

let activeModifyRegistration: ModifyRegistration | null = null;

/**
 * Registers the select and modify functionality with the Monaco editor.
 * @param monaco - The Monaco instance.
 * @param editor - The editor instance.
 * @param options - Options for the modify functionality.
 * @returns A ModifyRegistration object with a deregister method.
 */
export const registerSelectAndModify = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  options: RegisterModifyOptions,
): ModifyRegistration => {
  // Deregister any existing modify registration
  if (activeModifyRegistration) {
    activeModifyRegistration.deregister();
  }

  const disposables: Disposable[] = [];

  // Initialize editor modify state
  const initialState: EditorModifyState = {
    isWidgetVisible: false,
    widgets: new Set<string>(),
  };
  editorModifyState.set(editor, initialState);

  try {
    // Listen for selection changes
    const selectionChangeListener = editor.onDidChangeCursorSelection(event => {
      const state = editorModifyState.get(editor);
      if (!state) return;

      const selection = event.selection;
      if (!selection.isEmpty()) {
        if (!state.isWidgetVisible) {
          state.isWidgetVisible = true;
          showModifyButton(monaco, editor, selection, options);
        }
      } else {
        if (state.isWidgetVisible) {
          state.isWidgetVisible = false;
          disposeModifyWidgets(editor);
        }
      }
    });
    disposables.push(selectionChangeListener);

    // Create modify registration object
    const registration: ModifyRegistration = {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        editorModifyState.delete(editor);
        disposeModifyWidgets(editor);
        activeModifyRegistration = null;
      },
    };

    activeModifyRegistration = registration;

    return registration;
  } catch (error) {
    if (options.onError) {
      options.onError(error as Error);
    } else {
      log.error(error);
    }

    return {
      deregister: () => {
        disposables.forEach(disposable => disposable.dispose());
        editorModifyState.delete(editor);
        disposeModifyWidgets(editor);
        activeModifyRegistration = null;
      },
    };
  }
};

/**
 * Shows the 'Modify' button overlay widget.
 * @param monaco - The Monaco instance.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the modify functionality.
 */
const showModifyButton = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: RegisterModifyOptions,
) => {
  const modifyButtonWidget = createModifyButtonWidget(
    monaco,
    editor,
    selection,
    options,
  );
  editor.addOverlayWidget(modifyButtonWidget);

  const state = editorModifyState.get(editor);
  if (state) {
    state.widgets.add(modifyButtonWidget.getId());
  }
};

/**
 * Disposes all modify-related widgets from the editor.
 * @param editor - The editor instance.
 */
const disposeModifyWidgets = (editor: StandaloneCodeEditor) => {
  const state = editorModifyState.get(editor);
  if (state && state.widgets.size > 0) {
    state.widgets.forEach(widgetId => {
      editor.removeOverlayWidget({
        getId: () => widgetId,
        getDomNode: () => null as unknown as HTMLElement,
        getPosition: () => null,
      });
    });
    state.widgets.clear();
  }
};

/**
 * Creates the 'Modify' button overlay widget.
 * @param monaco - The Monaco instance.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the modify functionality.
 * @returns The overlay widget.
 */
const createModifyButtonWidget = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: RegisterModifyOptions,
): EditorOverlayWidget => {
  const widgetId = `modify-button-widget-${generateRandomString(10)}`;
  const domNode = document.createElement('div');
  domNode.className = 'modify-button-widget';

  const button = document.createElement('button');
  button.textContent = 'Modify';
  button.onclick = () => {
    showPromptWidget(editor, selection, options);
    disposeModifyWidgets(editor);
  };

  domNode.appendChild(button);

  const widget: EditorOverlayWidget = {
    getId: () => widgetId,
    getDomNode: () => domNode,
    getPosition: () => ({
      position: selection.getStartPosition(),
      preference: OverlayWidgetPositionPreference.TOP_CENTER,
    }),
  };

  return widget;
};

/**
 * Shows the prompt input overlay widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the modify functionality.
 */
const showPromptWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: RegisterModifyOptions,
) => {
  const promptWidget = createPromptWidget(editor, selection, options);
  editor.addOverlayWidget(promptWidget);

  const state = editorModifyState.get(editor);
  if (state) {
    state.widgets.add(promptWidget.getId());
  }
};

/**
 * Creates the prompt input overlay widget.
 * @param editor - The editor instance.
 * @param selection - The current selection.
 * @param options - Options for the modify functionality.
 * @returns The overlay widget.
 */
const createPromptWidget = (
  editor: StandaloneCodeEditor,
  selection: EditorSelection,
  options: RegisterModifyOptions,
): EditorOverlayWidget => {
  const widgetId = `prompt-widget-${generateRandomString(10)}`;
  const domNode = document.createElement('div');
  domNode.className = 'prompt-widget';

  const textArea = document.createElement('textarea');
  textArea.placeholder = 'Describe your modifications...';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.onclick = () => {
    const prompt = textArea.value;
    if (prompt.trim()) {
      handleModifySelection(editor, selection, prompt, options, domNode);
    }
  };

  domNode.appendChild(textArea);
  domNode.appendChild(submitButton);

  const widget: EditorOverlayWidget = {
    getId: () => widgetId,
    getDomNode: () => domNode,
    getPosition: () => ({
      position: selection.getEndPosition(),
      preference: OverlayWidgetPositionPreference.TOP_CENTER,
    }),
  };

  return widget;
};
