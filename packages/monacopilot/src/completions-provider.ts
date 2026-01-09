import { DEFAULT_TRIGGER } from './defaults'
import { processInlineCompletions } from './processor'
import { getEditorState } from './state'
import { type RegisterCompletionOptions, TriggerEnum } from './types/core'
import type { Monaco, StandaloneCodeEditor } from './types/monaco'
import { getCurrentValue } from './utils/editor'

export const createInlineCompletionsProvider = (
	monaco: Monaco,
	editor: StandaloneCodeEditor,
	initialOptions: RegisterCompletionOptions,
) => {
	const state = getEditorState(editor)
	if (!state) return null

	return monaco.languages.registerInlineCompletionsProvider(
		initialOptions.language,
		{
			provideInlineCompletions: (mdl, pos, _, token) => {
				// check if the completion is for the specific editor.
				// This prevents completions from being shown in other editors
				// when multiple editors are present on the same page.
				if (mdl !== editor.getModel()) {
					return { items: [] }
				}

				const options = state.options || initialOptions

				if (
					// Skip completion if trigger is on-demand and not explicitly triggered by user
					(options.trigger === TriggerEnum.OnDemand &&
						!state.isExplicitlyTriggered) ||
					// Skip completion if triggerIf returns false
					(options.triggerIf &&
						!options.triggerIf({
							text: getCurrentValue(editor),
							position: pos,
							triggerType: options.trigger ?? DEFAULT_TRIGGER,
						}))
				) {
					return
				}

				return processInlineCompletions({
					monaco,
					mdl,
					pos,
					token,
					isCompletionAccepted: state.isCompletionAccepted,
					options,
				})
			},
			handleItemDidShow: (_, item, completion) => {
				state.isExplicitlyTriggered = false
				state.hasRejectedCurrentCompletion = false

				if (state.isCompletionAccepted) return

				state.isCompletionVisible = true
				const options = state.options || initialOptions
				options.onCompletionShown?.(completion, item.range)
			},
			disposeInlineCompletions: () => {},
			// @ts-expect-error this method was the predecessor of disposeInlineCompletions (now it's renamed), so keep this for backward compatibility with older monaco versions
			freeInlineCompletions: () => {
				/* No-op */
			},
		},
	)
}
