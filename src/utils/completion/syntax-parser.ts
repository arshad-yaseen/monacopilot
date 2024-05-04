import {EditorModelType, EditorPositionType} from '../../types/common';
import {CompletionMetadata} from '../../types/completion';
import {getCharAtPosition} from './common';

export const isEmptyAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
) => {
  const line = model.getLineContent(position.lineNumber);
  const index = position.column - 1;
  const textAfterCursor = line.substring(index).trim();
  return textAfterCursor === '';
};

/** Check if there is code after the cursor */
export const isCodeAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
): boolean => {
  const acceptableCharsAfterCursor = new Set([
    '"',
    "'",
    '}',
    ']',
    ')',
    ',',
    ' ',
  ]);
  const line = model.getLineContent(position.lineNumber);
  const charAfterCursor = getCharAtPosition(line, position.column - 1);

  return !acceptableCharsAfterCursor.has(charAfterCursor) && !!charAfterCursor;
};

/** Get the before and after code of the cursor position */
export const getCodeBeforeAndAfterCursor = (
  position: EditorPositionType,
  model: EditorModelType,
): {codeBeforeCursor: string; codeAfterCursor: string} => {
  const codeBeforeCursor = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

  const codeAfterCursor = model.getValueInRange({
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: model.getLineCount(),
    endColumn: model.getLineMaxColumn(model.getLineCount()),
  });

  return {codeBeforeCursor, codeAfterCursor};
};

/** Check if the cursor is at the start of the line with code around */
export const isCursorAtStartWithCodeAround = (
  position: EditorPositionType,
  model: EditorModelType,
) => {
  const currentLine = model.getLineContent(position.lineNumber);
  const codeAfterCursorInCurrentLine = currentLine
    .slice(position.column - 1)
    .trim();
  const codeBeforeCursorInCurrentLine = currentLine
    .slice(0, position.column - 1)
    .trim();

  return (
    position.column <= 3 &&
    (codeAfterCursorInCurrentLine !== '' ||
      codeBeforeCursorInCurrentLine !== '')
  );
};

/**
 * Determines the most suitable completion mode based on the cursor position and surrounding code context.
 *
 * @returns The completion mode ('contextual-fill', 'continuation', 'expansion').
 */
export const determineCompletionMode = (
  position: EditorPositionType,
  model: EditorModelType,
): CompletionMetadata['editorState']['completionMode'] => {
  const textUntilPosition = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

  const currentLineText = model.getLineContent(position.lineNumber);

  if (isCursorAtTextEnd(currentLineText, position.column)) {
    if (isLineEmptyOrEndsWithClosingBrace(currentLineText)) {
      return 'continuation';
    }
    return 'line-continuation';
  }

  if (
    isInsideLiteralOrParentheses(
      textUntilPosition,
      currentLineText,
      position.column,
    )
  ) {
    return 'fill-in';
  }

  // Default to line-continuation mode if none of the specific conditions are met
  return 'line-continuation';
};

const isCursorAtTextEnd = (lineText: string, column: number): boolean => {
  const trimmedLine = lineText.trim();
  return (
    column > lineText.length || // Beyond the actual text
    [';', '{', '}'].some(char => trimmedLine.endsWith(char)) // Ends with statement or block delimiters
  );
};

// Check if the line is empty or ends with a closing brace
const isLineEmptyOrEndsWithClosingBrace = (lineText: string) => {
  const trimmedLine = lineText.trim();
  return trimmedLine.length === 0 || trimmedLine.endsWith('}');
};

const isInsideLiteralOrParentheses = (
  textUntilPosition: string,
  lineText: string,
  column: number,
): boolean => {
  const textBeforeCursor = textUntilPosition.trim();
  const charBeforeCursor = textBeforeCursor[textBeforeCursor.length - 1];
  const charAfterCursor = lineText[column - 1] || ''; // Safeguard against undefined for cursor at line end

  return (
    ['"', "'", '`', '(', '[', '{'].includes(charBeforeCursor) &&
    charAfterCursor ===
      {
        '"': '"',
        "'": "'",
        '`': '`',
        '(': ')',
        '[': ']',
        '{': '}',
      }[charBeforeCursor]
  );
};
