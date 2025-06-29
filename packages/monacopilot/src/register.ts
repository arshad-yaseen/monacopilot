import { logger } from '@monacopilot/core'

import { createInlineCompletionsProvider } from './completions-provider'
import { createKeyDownListener } from './key-events'
import { completionCache } from './processor'
import {
	createInitialState,
	deleteEditorState,
	getEditorState,
	setEditorState,
	updateEditorOptions,
} from './state'
import type {
	CompletionRegistration,
	RegisterCompletionOptions,
} from './types/core'
import type { Disposable, Monaco, StandaloneCodeEditor } from './types/monaco'

/**
 * Registers completion functionality with the Monaco editor.
 * @param monaco - The Monaco instance.
 * @param editor - The editor instance.
 * @param options - Options for the completion.
 * @returns A CompletionRegistration object with deregister and trigger methods.
 */
export const registerCompletion = (
	monaco: Monaco,
	editor: StandaloneCodeEditor,
	options: RegisterCompletionOptions,
): CompletionRegistration => {
	const disposables: Disposable[] = []

	setEditorState(editor, createInitialState(options))

	editor.updateOptions({
		inlineSuggest: {
			enabled: true,
		},
	})

	try {
		const state = getEditorState(editor)

		if (!state) {
			logger.warn('Completion is not registered properly. State not found.')
			return createEmptyRegistration()
		}

		const provider = createInlineCompletionsProvider(monaco, editor, options)
		if (provider) {
			disposables.push(provider)
		}

		const keyDownListener = createKeyDownListener(
			monaco,
			editor,
			state,
			options,
		)
		disposables.push(keyDownListener)

		const registration: CompletionRegistration = {
			deregister: () => {
				for (const disposable of disposables) {
					disposable.dispose()
				}
				completionCache.clear()
				deleteEditorState(editor)
			},
			trigger: () => handleTriggerCompletion(editor),
			updateOptions: (callback) => {
				updateEditorOptions(editor, callback(state.options || options))
			},
		}

		return registration
	} catch (error) {
		if (options.onError) {
			options.onError(error as Error)
		} else {
			logger.report(error)
		}

		return {
			deregister: () => {
				for (const disposable of disposables) {
					disposable.dispose()
				}
				deleteEditorState(editor)
			},
			trigger: () => {},
			updateOptions: () => {},
		}
	}
}

export const handleTriggerCompletion = (editor: StandaloneCodeEditor) => {
	const state = getEditorState(editor)
	if (!state) {
		logger.warn(
			'Completion is not registered. Use `registerCompletion` to register completion first.',
		)
		return
	}
	state.isExplicitlyTriggered = true
	editor.trigger('keyboard', 'editor.action.inlineSuggest.trigger', {})
}

const createEmptyRegistration = (): CompletionRegistration => {
	return {
		deregister: () => {},
		trigger: () => {},
		updateOptions: () => {},
	}
}
