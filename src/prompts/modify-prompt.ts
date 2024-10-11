import {ModifyMetadata, PromptData} from '../types';
import {constructPromptBase} from './prompt-base';

const CURSOR_TOKEN = '<cursor>';

export const generateModifyPrompt = (metadata: ModifyMetadata): PromptData => {
  const {
    textBeforeCursor = '',
    textAfterCursor = '',
    context,
    prompt: userInstruction,
    selectedText,
    selection,
    fullText,
  } = metadata;

  let instructions = '';

  if (selectedText && selection) {
    instructions = `
You are a helpful assistant proficient in code editing.

**Task:** ${userInstruction}

**Instructions:**
- Modify only the code between lines **${selection.startLineNumber}** and **${selection.endLineNumber}**.
- Preserve all code outside the specified lines exactly as it is.
- Ensure the modified code integrates seamlessly with the existing code.
- Maintain the original formatting and indentation.
- Do **not** include any additional text or explanations.
- Return **only** the modified code between the specified lines.

**Full Code Context:**
\`\`\`
${fullText}
\`\`\`

**Code to Modify:**
\`\`\`
${selectedText}
\`\`\`
`;
  } else {
    instructions = `
You are a helpful assistant proficient in code editing.

**Task:** ${userInstruction}

**Instructions:**
- Make the modifications at the cursor position indicated by **<cursor>**.
- Preserve all code outside the cursor position exactly as it is.
- Ensure the modified code integrates seamlessly with the existing code.
- Maintain the original formatting and indentation.
- Do **not** include any additional text or explanations.
- Return **only** the modified code inserted at the cursor position.

**Full Code Context:**
\`\`\`
${fullText}
\`\`\`

**Code with Cursor Position:**
\`\`\`
${textBeforeCursor}${CURSOR_TOKEN}${textAfterCursor}
\`\`\`
`;
  }

  return constructPromptBase(instructions.trim(), context);
};
