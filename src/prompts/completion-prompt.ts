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
You are a precise code completion engine. Given the ${language || 'code'} context:

${textBeforeCursor}<cursor>${textAfterCursor}

CRITICAL RULES:
1. NEVER repeat text before <cursor>
2. Start EXACTLY at cursor position
3. Output ONLY new code
4. No explanations/comments
5. Follow ${completionMode} mode: ${completionMode === 'continue' ? 'continue writing' : completionMode === 'insert' ? 'insert snippet' : 'complete block'}

Examples:
"const <cursor>" → "myVariable = 42" (NOT "const myVariable = 42")
"function hello<cursor>" → "(name) {}" (NOT "function hello(name) {}")
"const myVar = {key: <cursor>}" → "'value'" (NOT "'value'}")


Analyze context, maintain style, ensure syntax correctness. Provide ONLY the completion code without any explanations or comments`.trim();

  return constructPromptWithContext(instructions, {
    textBeforeCursor,
    textAfterCursor,
    editorState: {completionMode},
    language,
    ...rest,
  });
};

export default generateCompletionPrompt;
