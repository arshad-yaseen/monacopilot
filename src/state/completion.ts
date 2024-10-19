import {Disposable, StandaloneCodeEditor} from '../types';
import {selectionActionsState} from './selection-actions';

export interface CompletionStateType {
  isAccepted: boolean;
  isVisible: boolean;
  isManualTrigger: boolean;
  disposables: Disposable[];
}

export class CompletionState {
  private stateMap = new WeakMap<StandaloneCodeEditor, CompletionStateType>();

  getState(editor: StandaloneCodeEditor): CompletionStateType {
    if (!this.stateMap.has(editor)) {
      this.stateMap.set(editor, this.getInitialState());
    }
    return this.stateMap.get(editor) || this.getInitialState();
  }

  setState(
    editor: StandaloneCodeEditor,
    newState: Partial<CompletionStateType>,
  ): void {
    const currentState = this.getState(editor);
    this.stateMap.set(editor, {...currentState, ...newState});
  }

  clearState(editor: StandaloneCodeEditor): void {
    const state = this.getState(editor);
    state.disposables.forEach(({dispose}) => dispose());
    this.stateMap.delete(editor);
  }

  private getInitialState(): CompletionStateType {
    return {
      isAccepted: false,
      isVisible: false,
      isManualTrigger: false,
      disposables: [],
    };
  }

  canShowCompletion(editor: StandaloneCodeEditor): boolean {
    // If any of selection actions widget open, Don't fetch and show the completion.
    return !selectionActionsState.isSelectionActionsWidgetOpen(editor);
  }

  addDisposable(editor: StandaloneCodeEditor, disposable: Disposable): void {
    const state = this.getState(editor);
    state.disposables.push(disposable);
  }
}

export const completionState = new CompletionState();
