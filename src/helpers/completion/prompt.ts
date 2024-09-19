import {CompletionMetadata, CompletionMode, Technologies} from '../../types';
import {joinWithAnd} from '../../utils';

const CURSOR_PLACEHOLDER = '<<CURSOR>>';

/**
 * Gets the proper display name for a programming language.
 */
const getProperLanguageName = (language?: string): string | undefined => {
  return language === 'javascript' ? 'latest JavaScript' : language;
};

/**
 * Gets the description for the completion mode.
 */
const getDescriptionForMode = (mode: CompletionMode): string => {
  switch (mode) {
    case 'fill-in-the-middle':
      return 'filling in the middle of the code';
    case 'completion':
      return 'completing the code';
  }
};

/**
 * Generates the system prompt for the AI model.
 */
const generateSystemPrompt = (metadata: CompletionMetadata): string => {
  const language = getProperLanguageName(metadata.language);
  const description = getDescriptionForMode(
    metadata.editorState.completionMode,
  );
  const langText = language ? ` ${language}` : '';
  return `You are an AI coding assistant with expertise in${langText} programming, specializing in ${description}. Your goal is to provide accurate, efficient, and context-aware code completions that align with the existing code and the developer's intent. Provide code that is syntactically correct, follows best practices, and integrates seamlessly with the provided code snippet.`;
};

/**
 * Formats the technology stack information.
 */
const formatTechnology = (
  technologies?: Technologies,
  language?: string,
): string => {
  if (!technologies?.length && !language) return '';
  const technologiesText = technologies
    ? ` using ${joinWithAnd(technologies)}`
    : '';
  const languageText = getProperLanguageName(language);
  const languageClause = languageText ? ` in ${languageText}` : '';
  return `The code is written${languageClause}${technologiesText}.`;
};

/**
 * Generates the user prompt for the AI model.
 */
const generateUserPrompt = (metadata: CompletionMetadata): string => {
  const {
    filename,
    language,
    technologies,
    editorState: {completionMode},
    textBeforeCursor,
    textAfterCursor,
    externalContext,
  } = metadata;

  const modeDescription = getDescriptionForMode(completionMode);
  const fileNameText = filename
    ? `the file named "${filename}"`
    : 'a larger project';

  let prompt = `Please assist with ${modeDescription} for the following code snippet, which is part of ${fileNameText}.\n\n`;

  prompt += formatTechnology(technologies, language);

  prompt += `\n\nPlease follow these guidelines when generating the completion:
- The cursor position is indicated by '${CURSOR_PLACEHOLDER}' in the code snippet.
- Begin your completion exactly at the cursor position.
- Do not duplicate any code that appears before or after the cursor in the provided snippet.
- Ensure that the completed code is syntactically correct and logically consistent with the surrounding code.
- Maintain the coding style and conventions used in the existing code.
- Optimize the code for readability and performance where applicable.
- Do not include any additional explanations or comments in your output.
- Output only the code completion, without wrapping it in markdown code syntax (e.g., no triple backticks).`;

  if (completionMode === 'fill-in-the-middle') {
    prompt += `\n- Since you are filling in the middle, replace '${CURSOR_PLACEHOLDER}' entirely with your completion.`;
  } else if (completionMode === 'completion') {
    prompt += `\n- Since you are completing the code, provide a logical continuation starting from '${CURSOR_PLACEHOLDER}'.`;
  }

  prompt += `\n\nHere's the code snippet for completion:\n\n<code>\n${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}\n</code>`;

  if (externalContext && externalContext.length > 0) {
    prompt += `\n\nAdditional context from related files:\n\n`;
    prompt += externalContext
      .map(context => `// Path: ${context.path}\n${context.content}\n`)
      .join('\n');
  }

  return prompt.endsWith('.') ? prompt : `${prompt}.`;
};

/**
 * Generates the system and user prompts for the AI model.
 */
export default function generatePrompt(metadata: CompletionMetadata): {
  system: string;
  user: string;
} {
  return {
    system: generateSystemPrompt(metadata),
    user: generateUserPrompt(metadata),
  };
}
