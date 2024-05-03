import {CompletionMetadata} from '../types/completion';

export const getSystemPrompt = (metadata: CompletionMetadata) =>
  `Complete the code/text snippet accurately, ensuring it is syntactically correct, semantically appropriate, and integrates seamlessly with both the preceding and following parts. Depending on the completion mode (${metadata.editorState.completionMode}), ${metadata.editorState.completionMode === 'continuation' ? 'continue the current line' : metadata.editorState.completionMode === 'contextual-fill' ? 'fill in the missing context' : 'expand the existing code'}. Output only the code/text snippet, without any additional comments or explanations.`;
