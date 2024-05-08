import {CompletionMetadata} from '../types/completion';
import {ExternalContextType} from '../types/editor-props';

const formatExternalContext = (
  externalContext: ExternalContextType | undefined,
): string => {
  if (!externalContext) {
    return '';
  }
  return externalContext
    .map(context => `<${context.path}>${context.content}</${context.path}>`)
    .join('\n\n');
};

/**
 * Generates a detailed instruction for the LLM based on the completion metadata.
 * @param {CompletionMetadata} metadata - Metadata containing details for code completion.
 * @returns {Object} - An object containing the system and user prompts.
 */
export const getCompletionPrompt = (
  metadata: CompletionMetadata,
): {systemPrompt: string; userPrompt: string} => {
  const actionMap: Record<
    CompletionMetadata['editorState']['completionMode'],
    string
  > = {
    'line-continuation':
      'continue seamlessly from the cursor, maintaining syntactical correctness and logical flow',
    'fill-in':
      'accurately fill in the missing segment, ensuring it integrates perfectly with the content before and after the cursor while adhering to syntax and logical coherence',
    continuation:
      'complete the next logical segment based on the provided context, ensuring syntactical correctness and logical coherence',
  };

  const action = actionMap[metadata.editorState.completionMode];

  const systemPrompt = `You are a code completion assistant. Based on the cursor's position and the surrounding code context, begin typing at the cursor. The completion mode "${metadata.editorState.completionMode}" requires you to ${action}.
  ${metadata.language ? `Follow line breaks, indentation, and spacing rules according to the programming language "${metadata.language}".` : 'Follow general coding conventions.'}
  Output only the completion without additional explanations.`;

  const userPrompt = `
    ${metadata.filename ? `<current-file>The current file requiring completion: ${metadata.filename}</current-file>` : ''}

    <code-context>
      Full context including all lines before and after the cursor position:
      ${metadata.codeBeforeCursor}{cursor}${metadata.codeAfterCursor}
    </code-context>
    
    <immediate-context>
      Content directly before the cursor, serving as the immediate context for the completion:
      ${metadata.codeBeforeCursor}
    </immediate-context>

    <cursor-position>
      Line and column number where the completion should start:
      Line ${metadata.cursorPosition.lineNumber}, Column ${metadata.cursorPosition.columnNumber}
    </cursor-position>

    ${metadata.externalContext ? `<external-context>Other relevant files in the workspace: ${formatExternalContext(metadata.externalContext)}</external-context>` : ''}

    <completion-details>
      Mode specifying the nature of the auto-completion task:
      ${metadata.editorState.completionMode}
      ${metadata.language ? `Programming language which dictates formatting rules: ${metadata.language}` : 'No specific programming language provided.'}
      ${metadata.framework ? `Framework being used, if applicable: ${metadata.framework}` : ''}
    </completion-details>
  `;

  return {systemPrompt, userPrompt};
};
