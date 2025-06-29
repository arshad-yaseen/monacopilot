import type { RegisterCompletionOptions } from './types/core'
import type {
	CompletionKeyEventHandlerParams,
	EditorCompletionState,
} from './types/internal'
import type {
	EditorKeyboardEvent,
	Monaco,
	StandaloneCodeEditor,
} from './types/monaco'

const ACCEPTANCE_KEYS = {
	TAB: (monaco: Monaco, event: EditorKeyboardEvent) =>
		event.keyCode === monaco.KeyCode.Tab,
	CMD_RIGHT_ARROW: (monaco: Monaco, event: EditorKeyboardEvent) =>
		event.keyCode === monaco.KeyCode.RightArrow && event.metaKey,
} as const

class CompletionKeyEventHandler {
	constructor(
		private readonly monaco: Monaco,
		private readonly state: EditorCompletionState,
		private readonly initialOptions: RegisterCompletionOptions,
	) {}

	handleKeyEvent(event: EditorKeyboardEvent): void {
		const options = this.state.options || this.initialOptions

		const params = {
			monaco: this.monaco,
			event,
			state: this.state,
			options,
		}

		this.handleCompletionAcceptance(params)
		this.handleCompletionRejection(params)
	}

	private handleCompletionAcceptance(
		params: CompletionKeyEventHandlerParams,
	): boolean {
		const shouldAcceptCompletion =
			params.state.isCompletionVisible && this.isAcceptanceKey(params.event)

		if (!shouldAcceptCompletion) {
			params.state.isCompletionAccepted = false
			return false
		}

		params.options.onCompletionAccepted?.()
		params.state.isCompletionAccepted = true
		params.state.isCompletionVisible = false
		return true
	}

	private handleCompletionRejection(
		params: CompletionKeyEventHandlerParams,
	): boolean {
		if (!this.shouldRejectCompletion(params)) {
			return false
		}

		params.options.onCompletionRejected?.()
		params.state.hasRejectedCurrentCompletion = true
		return true
	}

	private shouldRejectCompletion(
		params: CompletionKeyEventHandlerParams,
	): boolean {
		return (
			params.state.isCompletionVisible &&
			!params.state.hasRejectedCurrentCompletion &&
			!params.state.isCompletionAccepted &&
			!this.isAcceptanceKey(params.event)
		)
	}

	private isAcceptanceKey(event: EditorKeyboardEvent): boolean {
		return Object.values(ACCEPTANCE_KEYS).some((keyCheck) =>
			keyCheck(this.monaco, event),
		)
	}
}

export const createKeyDownListener = (
	monaco: Monaco,
	editor: StandaloneCodeEditor,
	state: EditorCompletionState,
	options: RegisterCompletionOptions,
) => {
	const handler = new CompletionKeyEventHandler(monaco, state, options)
	return editor.onKeyDown((event) => handler.handleKeyEvent(event))
}
