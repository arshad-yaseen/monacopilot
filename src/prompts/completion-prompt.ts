import {constructPromptWithContext} from '.';
import {CompletionMetadata, PromptData} from '../types';

const CURSOR_TOKEN = '<cursor>';

const generateCompletionPrompt = (metadata: CompletionMetadata): PromptData => {
  const {
    textBeforeCursor = '',
    textAfterCursor = '',
    editorState: {completionMode},
  } = metadata;

  const codeFile = `<code_file>
${textBeforeCursor}${CURSOR_TOKEN}${textAfterCursor}
</code_file>`;

  const completionModeInstructions: Record<string, string> = {
    continue: '-- Continue writing the code from the current cursor location.',
    insert: '-- Insert the appropriate code snippet at the cursor point.',
    complete:
      '-- Supply the necessary code to finish the ongoing statement or block.',
  };

  const instructions = `
You are an expert coding assistant. Your task is to provide code completions based on the current cursor position in the code.

Below is the code file with a special token '${CURSOR_TOKEN}' indicating the current cursor position.

${codeFile}

Please provide the code that should be inserted at the cursor position, following these guidelines:

- Carefully analyze the code context before and after the cursor to understand what code is needed.
- Follow best practices and maintain a consistent coding style with the existing code.
- Ensure the generated code integrates smoothly with the existing codebase.
- Do **not** include any code that is before the cursor in your response.
- Do **not** include any explanations, comments, or placeholders.
- Avoid wrapping your completion with markdown code blocks (\`\`\` or \`).
- Provide **only** the necessary code to be inserted at the cursor location.

Depending on the completion mode, adjust your completion accordingly:

- **Completion Mode**: ${completionMode}
${completionModeInstructions[completionMode] || ''}

Remember to output **only** the code that should be inserted at the cursor, without any additional formatting or explanations.
`.trim();

  return constructPromptWithContext(instructions, metadata);
};

export default generateCompletionPrompt;
