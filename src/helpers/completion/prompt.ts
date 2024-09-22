import {CompletionMetadata} from '../../types';
import {joinWithAnd} from '../../utils';

const CURSOR_PLACEHOLDER = '<user-current-cursor-position-is-here>';

/**
 * Retrieves the appropriate language name for display.
 *
 * @param language - The language code.
 * @returns The formatted language name or undefined.
 */
const getFormattedLanguageName = (language?: string): string | undefined => {
  if (language === 'javascript') {
    return 'JavaScript (ESNext)';
  }
  return language;
};

/**
 * Generates a comprehensive system prompt for the AI assistant, giving it a specific role.
 *
 * @param metadata - The completion metadata.
 * @returns The system prompt string.
 */
const createSystemPrompt = (metadata: CompletionMetadata): string => {
  const languageOrTechnologies =
    getFormattedLanguageName(metadata.language) ||
    joinWithAnd(metadata.technologies);

  return `You are an expert ${languageOrTechnologies} developer assistant with extensive experience in code completion and adhering to best coding practices. Your role is to provide precise and contextually relevant code completions without any errors, including syntax, punctuation, spaces, tabs, and line breaks. Focus on integrating seamlessly with the existing code and follow the user's instructions carefully.`;
};

/**
 * Generates a detailed user prompt with context and clear instructions, structured using XML tags.
 *
 * @param metadata - The completion metadata.
 * @returns The user prompt string.
 */
const createUserPrompt = (metadata: CompletionMetadata): string => {
  const {
    filename = '/',
    textBeforeCursor = '',
    textAfterCursor = '',
    externalContext,
    editorState,
  } = metadata;

  const modeInstructions: Record<string, string> = {
    continue: 'Continue writing the code from where the cursor is positioned.',
    insert: 'Insert the appropriate code snippet at the cursor position.',
    complete:
      'Provide the necessary code to complete the current statement or block.',
  };

  const specificInstruction = modeInstructions[editorState.completionMode];

  const guidelines = `
<guidelines>
  <instruction>${specificInstruction}</instruction>
  <steps>
    <step>Analyze the provided code and any external files thoroughly.</step>
    <step>Ensure the generated code integrates seamlessly with the existing code.</step>
    <step>Adhere to best practices and maintain consistent coding style.</step>
    <step>Do <strong>not</strong> include the code before the cursor in your response.</step>
    <step>Do <strong>not</strong> wrap your completion with markdown code syntax (\`\`\`) or inline code syntax (\`).</step>
    <step>Focus on correct syntax and language-specific conventions.</step>
    <step>Do <strong>not</strong> add explanations, comments, or placeholders.</step>
    <step>Return <strong>only</strong> the code required at the cursor position.</step>
  </steps>
</guidelines>
`;

  const codeContext = `
<context>
  <current_file path="${filename}">
    <code>
${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}
    </code>
  </current_file>
</context>
`;

  const externalFiles =
    externalContext
      ?.map(
        ({path, content}) => `
<external_file path="${path}">
  <code>
${content}
  </code>
</external_file>
`,
      )
      .join('\n') || '';

  return `
<task>
  ${guidelines}
  ${codeContext}
  ${externalFiles}
</task>
`;
};

/**
 * Generates the system and user prompts based on the completion metadata.
 *
 * @param metadata - The completion metadata.
 * @returns An object containing both the system and user prompts.
 */
export default function generatePrompt(metadata: CompletionMetadata): {
  system: string;
  user: string;
} {
  return {
    system: createSystemPrompt(metadata),
    user: createUserPrompt(metadata),
  };
}
