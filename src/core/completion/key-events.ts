import {
  EditorKeyboardEvent,
  Monaco,
  RegisterCompletionOptions,
  StandaloneCodeEditor,
} from '../../types';
import {EditorCompletionState} from './editor-state';

type KeyEventHandlerParams = {
  monaco: Monaco;
  event: EditorKeyboardEvent;
  state: EditorCompletionState;
  options: RegisterCompletionOptions;
};

export const createKeyDownListener = (
  monaco: Monaco,
  editor: StandaloneCodeEditor,
  state: EditorCompletionState,
  options: RegisterCompletionOptions,
) => {
  // Reset the explicit trigger flag to prevent automatic completions
  // This ensures completions only show when explicitly requested by the user
  state.isExplicitlyTriggered = false;

  return editor.onKeyDown(event => {
    handleCompletionAcceptance({monaco, event, state, options});
    handleCompletionRejection({monaco, event, state, options});
  });
};

export const handleCompletionAcceptance = ({
  monaco,
  event,
  state,
  options,
}: KeyEventHandlerParams): boolean => {
  const shouldAcceptCompletion =
    state.isCompletionVisible && isAcceptanceKey(monaco, event);

  if (shouldAcceptCompletion) {
    options.onCompletionAccepted?.();
    state.isCompletionAccepted = true;
    state.isCompletionVisible = false;
    return true;
  }

  state.isCompletionAccepted = false;
  return false;
};

export const handleCompletionRejection = ({
  monaco,
  event,
  state,
  options,
}: KeyEventHandlerParams): boolean => {
  const isNonAcceptanceKey = !isAcceptanceKey(monaco, event);

  const shouldRejectCompletion =
    state.isCompletionVisible &&
    !state.hasRejectedCurrentCompletion &&
    !state.isCompletionAccepted &&
    isNonAcceptanceKey;

  if (shouldRejectCompletion) {
    options.onCompletionRejected?.();
    state.hasRejectedCurrentCompletion = true;
    return true;
  }

  return false;
};

// Function to check if key event is Tab or Cmd+RightArrow
const isAcceptanceKey = (monaco: Monaco, event: EditorKeyboardEvent): boolean =>
  event.keyCode === monaco.KeyCode.Tab ||
  (event.keyCode === monaco.KeyCode.RightArrow && event.metaKey);
