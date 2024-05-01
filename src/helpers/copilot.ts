import {
  PROMPT_COMPLETION_MODE_PLACEHOLDER,
  PROMPT_CURSOR_POSITION_PLACEHOLDER,
  PROMPT_LANGUAGE_PLACEHOLDER,
} from '../constants/completion';
import {CompletionMetadata} from '../types/completion';

// Function to replace placeholders in the completion system prompt
export const fillSystemPromptPlaceholders = (
  systemPrompt: string,
  completionMetadata: CompletionMetadata,
): string => {
  const cursorPositionText = `line ${completionMetadata.cursorPosition.lineNumber}, column ${completionMetadata.cursorPosition.columnNumber}`;

  let prompt = systemPrompt.replace(
    PROMPT_CURSOR_POSITION_PLACEHOLDER,
    cursorPositionText,
  );

  const completionModeDescriptions = {
    'contextual-fill': 'fills in at the current cursor position',
    continuation:
      'continues the code from the cursor, while ensuring correct syntax both before and after to maintain integrity.',
    expansion:
      'expands the code from the cursor position to the next logical block or statement.',
  };

  prompt = prompt.replace(
    PROMPT_COMPLETION_MODE_PLACEHOLDER,
    completionModeDescriptions[completionMetadata.editorState.completionMode],
  );

  prompt = prompt.replace(
    PROMPT_LANGUAGE_PLACEHOLDER,
    completionMetadata.language,
  );

  return prompt;
};
