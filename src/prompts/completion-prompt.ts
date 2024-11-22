import {constructPromptWithContext} from '.';
import {CompletionMetadata, PromptData} from '../types';

const generateCompletionPrompt = ({
  textBeforeCursor = '',
  textAfterCursor = '',
  editorState: {completionMode},
  language,
  ...rest
}: CompletionMetadata): PromptData => {
  const instructions = `
Given the ${language || 'code'} context:

${textBeforeCursor}<cursor>${textAfterCursor}

CRITICAL RULES:
1. NEVER repeat text before <cursor>
2. Start EXACTLY at cursor position
3. Output ONLY new code
4. No explanations/comments
5. Do not add unnecessary quotes or backticks around code
6. Follow ${completionMode} mode: ${
    completionMode === 'continue'
      ? 'continue writing'
      : completionMode === 'insert'
        ? 'insert exactly missing code between'
        : 'complete block'
  }
7. Respect Monaco editor subwordSmart inline suggest mode (MANDATORY)

Analyze context, maintain style, ensure syntax correctness. Provide ONLY the completion code without any explanations or comments.`.trim();

  return constructPromptWithContext(instructions, {
    textBeforeCursor,
    textAfterCursor,
    editorState: {completionMode},
    language,
    ...rest,
  });
};

export default generateCompletionPrompt;
