import {Disposable, StandaloneCodeEditor} from '../types';
import {completionState} from './completion';

export interface SelectionActionsWidgetState {
  widgets: Set<string>;
}

export interface DiffDecorationState {
  clear: () => void;
}

export class SelectionActionsState {
  private stateMap: WeakMap<
    StandaloneCodeEditor,
    {
      widgetState: SelectionActionsWidgetState;
      cleanup?: () => void;
      diffDecorationState?: DiffDecorationState;
      isSelectionActionsWidgetOpen: boolean;
      disposables: Disposable[];
    }
  >;

  constructor() {
    this.stateMap = new WeakMap();
  }

  private getOrCreateState(editor: StandaloneCodeEditor) {
    let state = this.stateMap.get(editor);
    if (!state) {
      state = {
        widgetState: {
          widgets: new Set(),
        },
        isSelectionActionsWidgetOpen: false,
        disposables: [],
      };
      this.stateMap.set(editor, state);
    }
    return state;
  }

  getWidgetState(editor: StandaloneCodeEditor): SelectionActionsWidgetState {
    return this.getOrCreateState(editor).widgetState;
  }

  setCleanup(editor: StandaloneCodeEditor, cleanup: () => void): void {
    this.getOrCreateState(editor).cleanup = cleanup;
  }

  getCleanup(editor: StandaloneCodeEditor): (() => void) | undefined {
    return this.getOrCreateState(editor).cleanup;
  }

  setDiffDecorationState(
    editor: StandaloneCodeEditor,
    state: DiffDecorationState,
  ): void {
    this.getOrCreateState(editor).diffDecorationState = state;
  }

  getDiffDecorationState(
    editor: StandaloneCodeEditor,
  ): DiffDecorationState | undefined {
    return this.getOrCreateState(editor).diffDecorationState;
  }

  disposeWidgets(editor: StandaloneCodeEditor): void {
    const state = this.getWidgetState(editor);
    if (state.widgets.size > 0) {
      state.widgets.forEach(widgetId => {
        editor.removeContentWidget({
          getId: () => widgetId,
          getDomNode: () => document.createElement('div'),
          getPosition: () => null,
        });
      });
      state.widgets.clear();
    }
    this.setSelectionActionsWidgetOpen(editor, false);
  }

  disposeDiffDecorations(editor: StandaloneCodeEditor): void {
    const state = this.getDiffDecorationState(editor);
    if (state) {
      state.clear();
    }
    this.setDiffDecorationState(editor, {
      clear: () => {
        // No-op
      },
    });
  }

  setSelectionActionsWidgetOpen(
    editor: StandaloneCodeEditor,
    isOpen: boolean,
  ): void {
    if (isOpen) {
      completionState.clearState(editor);
    }
    this.getOrCreateState(editor).isSelectionActionsWidgetOpen = isOpen;
  }

  isSelectionActionsWidgetOpen(editor: StandaloneCodeEditor): boolean {
    return this.getOrCreateState(editor).isSelectionActionsWidgetOpen ?? false;
  }

  addDisposable(editor: StandaloneCodeEditor, disposable: Disposable): void {
    this.getOrCreateState(editor).disposables.push(disposable);
  }

  clearState(editor: StandaloneCodeEditor): void {
    this.disposeWidgets(editor);
    this.disposeDiffDecorations(editor);
    this.setSelectionActionsWidgetOpen(editor, false);
    // Perform cleanup for any remaining resources
    this.getCleanup(editor)?.();
    const state = this.getOrCreateState(editor);
    state.disposables.forEach(disposable => disposable.dispose());
    state.disposables = [];
    this.stateMap.delete(editor);
  }
}

export const selectionActionsState = new SelectionActionsState();
