import {CompletionMetadata} from '../../types';
import {joinWithAnd} from '../../utils';

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
 * Generates a comprehensive system prompt for the AI assistant.
 *
 * @param metadata - The completion metadata.
 * @returns The system prompt string.
 */
const createSystemPrompt = (metadata: CompletionMetadata): string => {
  const languageOrTechnologies =
    getFormattedLanguageName(metadata.language) ||
    joinWithAnd(metadata.technologies);

  return `You are a highly skilled ${languageOrTechnologies} developer assistant. Your goal is to help complete the code accurately and efficiently.`;
};

/**
 * Generates a detailed user prompt with context and clear instructions.
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
${specificInstruction}

**Guidelines:**

- Analyze the provided code and any external files thoroughly.
- Ensure the generated code integrates seamlessly with the existing code.
- Adhere to best practices and maintain consistent coding style.
- Do **not** include the code before the cursor in your response.
- Do **not** wrap your completion with markdown code syntax (\`\`\`) or inline code syntax (\`).
- Focus on correct syntax and language-specific conventions.
- Do **not** add explanations, comments, or placeholders.
- Return **only** the code required at the cursor position.
`;

  const codeContext = `
**Current File:** \`${filename}\`

\`\`\`
${textBeforeCursor}█${textAfterCursor}
\`\`\`
`;

  const externalFiles =
    externalContext
      ?.map(
        ({path, content}) => `
**External File:** \`${path}\`

\`\`\`
${content}
\`\`\`
`,
      )
      .join('\n') || '';

  return `
${guidelines}

**Context:**

${codeContext}

${externalFiles}
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
