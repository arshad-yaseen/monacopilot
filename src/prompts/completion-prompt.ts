import {CompletionMetadata, PromptData} from '../types';
import {constructPromptBase} from './prompt-base';

const CURSOR_PLACEHOLDER = '<cursor-position>';

/**
 * Generates a detailed prompt for code completions with context and clear instructionss.
 *
 * @param metadata - The completion metadata.
 * @returns The user prompt data.
 */
export const createCompletionPrompt = (
  metadata: CompletionMetadata,
): PromptData => {
  const {
    textBeforeCursor = '',
    textAfterCursor = '',
    context,
    editorState,
  } = metadata;

  const modeInstructions: Record<string, string> = {
    continue: 'Continue writing the code from where the cursor is positioned.',
    insert: 'Insert the appropriate code snippet at the cursor position.',
    complete:
      'Provide the necessary code to complete the current statement or block.',
  };

  const specificInstruction =
    modeInstructions[editorState.completionMode] ||
    'Continue your task based on the provided instructions.';

  const guidelines = `
<guidelines>
  <primary_instruction>${specificInstruction}</primary_instruction>
  <steps_to_follow>
    <step>Analyze the provided code and any related files thoroughly.</step>
    <step>Ensure the generated code integrates seamlessly with the existing code.</step>
    <step>Adhere to best practices and maintain consistent coding style.</step>
    <step>Do <strong>not</strong> include the code before the cursor in your response.</step>
    <step>Do <strong>not</strong> wrap your completion with markdown code syntax (\`\`\`) or inline code syntax (\`).</step>
    <step>Focus on correct syntax and language-specific conventions.</step>
    <step>Do <strong>not</strong> add explanations, comments, or placeholders.</step>
    <step>Return <strong>only</strong> the code required at the cursor position.</step>
  </steps_to_follow>
</guidelines>
`.trim();

  const currentFileContext = `<current_file><code>${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}</code></current_file>`;

  const instructions = `<task>
  ${guidelines}
  ${currentFileContext}
</task>`;

  return constructPromptBase(instructions, context);
};
