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

export const getCompletionInstruction = (
  metadata: CompletionMetadata,
): string => {
  let actionDescription: string;
  switch (metadata.editorState.completionMode) {
    case 'line-continuation':
      actionDescription =
        'continue seamlessly from the cursor, maintaining syntactical correctness and logical flow';
      break;
    case 'fill-in':
      actionDescription =
        'accurately fill in the missing segment, ensuring it integrates perfectly with the content before and after the cursor while adhering to syntax and logical coherence';
      break;
    default:
      actionDescription =
        'complete the next logical segment based on the provided context, ensuring syntactical correctness and logical coherence';
  }

  return `
    <completion-instruction>
      You are a code completion assistant. Based on the cursor's position and the surrounding context, begin typing at the cursor. The completion mode "${metadata.editorState.completionMode}" requires you to ${actionDescription}.
      Follow line breaks, indentation, and spacing rules according to the programming language "${metadata.language}". Output only the completion without additional explanations.
    </completion-instruction>

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

    <external-context>
      Other relevant files in the workspace:
      ${formatExternalContext(metadata.externalContext)}
    </external-context>

    <completion-details>
      Mode specifying the nature of the auto-completion task:
      ${metadata.editorState.completionMode}
      Programming language which dictates formatting rules:
      ${metadata.language}
    </completion-details>
  `;
};
