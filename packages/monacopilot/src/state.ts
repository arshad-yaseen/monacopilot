import type { RegisterCompletionOptions } from './types/core'
import type { EditorCompletionState } from './types/internal'
import type { StandaloneCodeEditor } from './types/monaco'

const editorCompletionState = new WeakMap<
	StandaloneCodeEditor,
	EditorCompletionState
>()

export const getEditorState = (editor: StandaloneCodeEditor) => {
	return editorCompletionState.get(editor)
}

export const setEditorState = (
	editor: StandaloneCodeEditor,
	state: EditorCompletionState,
) => {
	editorCompletionState.set(editor, state)
}

export const deleteEditorState = (editor: StandaloneCodeEditor) => {
	editorCompletionState.delete(editor)
}

export const createInitialState = (
	options?: RegisterCompletionOptions,
): EditorCompletionState => ({
	isCompletionAccepted: false,
	isCompletionVisible: false,
	isExplicitlyTriggered: false,
	hasRejectedCurrentCompletion: false,
	options,
})

export const updateEditorOptions = (
	editor: StandaloneCodeEditor,
	updatedOptions: Partial<RegisterCompletionOptions>,
) => {
	const state = getEditorState(editor)
	if (!state || !state.options) return

	state.options = {
		...state.options,
		...updatedOptions,
	}
}
