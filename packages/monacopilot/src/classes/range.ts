import type {
	CursorPosition,
	EditorModel,
	EditorRange,
	Monaco,
} from '../types/monaco'
import { TextOverlapCalculator } from './text-overlap-calculator'

export class CompletionRange {
	private textOverlapCalculator: TextOverlapCalculator

	constructor(private monaco: Monaco) {
		this.textOverlapCalculator = new TextOverlapCalculator()
	}

	public computeInsertionRange(
		pos: CursorPosition,
		completion: string,
		mdl: EditorModel,
	): EditorRange {
		if (!completion) {
			return this.createEmptyRange(pos)
		}

		const startOffset = mdl.getOffsetAt(pos)
		const textBeforeCursor = mdl.getValue().substring(0, startOffset)
		const textAfterCursor = mdl.getValue().substring(startOffset)

		if (startOffset >= mdl.getValue().length) {
			return this.createEmptyRange(pos)
		}

		if (textAfterCursor.length === 0) {
			return this.createEmptyRange(pos)
		}

		const { startOverlapLength, maxOverlapLength } =
			this.textOverlapCalculator.findOverlaps(
				completion,
				textBeforeCursor,
				textAfterCursor,
			)

		const startPosition =
			startOverlapLength > 0
				? mdl.getPositionAt(startOffset - startOverlapLength)
				: pos
		const endOffset = startOffset + maxOverlapLength
		const endPosition = mdl.getPositionAt(endOffset)

		return new this.monaco.Range(
			startPosition.lineNumber,
			startPosition.column,
			endPosition.lineNumber,
			endPosition.column,
		)
	}

	public computeCacheRange(
		pos: CursorPosition,
		completion: string,
	): EditorRange {
		const startLineNumber = pos.lineNumber
		const startColumn = pos.column
		const completionLines = completion.split('\n')
		const lastLineIndex = completionLines.length - 1

		const endLineNumber = startLineNumber + lastLineIndex
		const endColumn =
			lastLineIndex === 0
				? startColumn + completionLines[0].length
				: completionLines[lastLineIndex].length + 1

		return new this.monaco.Range(
			startLineNumber,
			startColumn,
			endLineNumber,
			endColumn,
		)
	}

	private createEmptyRange(pos: CursorPosition): EditorRange {
		return new this.monaco.Range(
			pos.lineNumber,
			pos.column,
			pos.lineNumber,
			pos.column,
		)
	}
}
