import {ModifyMetadata, PromptData} from '../types';
import {constructPromptBase} from './prompt-base';

const CURSOR_PLACEHOLDER = '<cursor-position>';

/**
 * Generates a detailed prompt for code modifications with context and clear instructions.
 *
 * @param metadata - The completion metadata.
 * @returns The user prompt data.
 */
export const createModifyPrompt = (metadata: ModifyMetadata): PromptData => {
  const {
    textBeforeCursor = '',
    textAfterCursor = '',
    context,
    prompt,
    selectedText,
    fullText,
  } = metadata;

  const guidelines = `
<guidelines>
  <primary_instruction>${prompt}</primary_instruction>
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

  let instructions: string;

  if (selectedText) {
    instructions = `<task>
  ${guidelines}
  <selected_text>${selectedText}</selected_text>
  <full_text>${fullText}</full_text>
</task>`;
  } else {
    instructions = `<task>
  ${guidelines}
  <current_file><code>${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}</code></current_file>
</task>`;
  }

  return constructPromptBase(instructions, context);
};
