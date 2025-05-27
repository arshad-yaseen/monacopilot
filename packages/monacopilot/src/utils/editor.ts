import type {
	CursorPosition,
	EditorModel,
	StandaloneCodeEditor,
} from '../types/monaco'

export const getCharBeforeCursor = (
	pos: CursorPosition,
	mdl: EditorModel,
): string => {
	const line = mdl.getLineContent(pos.lineNumber)
	return line[pos.column - 2]
}

export const getCharAfterCursor = (
	pos: CursorPosition,
	mdl: EditorModel,
): string | undefined => {
	const line = mdl.getLineContent(pos.lineNumber)
	return line[pos.column - 1]
}

export const getTextAfterCursorInLine = (
	pos: CursorPosition,
	mdl: EditorModel,
): string => {
	const line = mdl.getLineContent(pos.lineNumber)
	return line.slice(pos.column - 1)
}

export const getTextBeforeCursorInLine = (
	pos: CursorPosition,
	mdl: EditorModel,
): string => {
	const line = mdl.getLineContent(pos.lineNumber)
	return line.slice(0, pos.column - 1)
}

export const getTextBeforeCursor = (
	pos: CursorPosition,
	mdl: EditorModel,
): string =>
	mdl.getValueInRange({
		startLineNumber: 1,
		startColumn: 1,
		endLineNumber: pos.lineNumber,
		endColumn: pos.column,
	})

export const getTextAfterCursor = (
	pos: CursorPosition,
	mdl: EditorModel,
): string =>
	mdl.getValueInRange({
		startLineNumber: pos.lineNumber,
		startColumn: pos.column,
		endLineNumber: mdl.getLineCount(),
		endColumn: mdl.getLineMaxColumn(mdl.getLineCount()),
	})

export const getCurrentValue = (editor: StandaloneCodeEditor) => {
	return editor.getValue()
}
