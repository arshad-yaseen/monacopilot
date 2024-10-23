import {CompletionFormatter} from '../classes';
import {
  CursorPosition,
  EditorInlineCompletion,
  EditorInlineCompletionsResult,
  EditorRange,
  Monaco,
} from '../types';
import {getLastLineColumnCount} from './editor';

/**
 * Calculates the range where the completion should be inserted in the editor.
 *
 * @param position - The current cursor position in the editor.
 * @param model - The Monaco editor text model.
 * @param completion - The text of the completion to be inserted.
 * @returns The range where the completion should be inserted.
 */
export const computeCompletionInsertionRange = (
  monaco: Monaco,
  pos: CursorPosition,
  completion: string,
): EditorRange => {
  const newLineCount = completion.match(/\n/g)?.length || 0;
  const endLineNumber = pos.lineNumber + newLineCount;
  const lastLineColumnCount = getLastLineColumnCount(completion);
  const endColumn =
    newLineCount === 0 ? pos.column + lastLineColumnCount : lastLineColumnCount;
  return new monaco.Range(pos.lineNumber, pos.column, endLineNumber, endColumn);
};

export const formatCompletion = (completion: string): string => {
  return CompletionFormatter.create(completion)
    .removeMarkdownCodeSyntax()
    .removeExcessiveNewlines()
    .removeInvalidLineBreaks()
    .build();
};

export const createInlineCompletionResult = (
  items: EditorInlineCompletion[],
): EditorInlineCompletionsResult => ({
  items,
  enableForwardStability: true,
});
