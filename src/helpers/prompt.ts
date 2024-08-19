import {CompletionMetadata, CompletionMode, Technologies} from '../types';
import {joinWithAnd} from '../utils';

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
export const generateSystemPrompt = (metadata: CompletionMetadata): string => {
  const language = getProperLanguageName(metadata.language);
  const description = getDescriptionForMode(
    metadata.editorState.completionMode,
  );
  const langText = language ? ` ${language}` : '';
  return `You are an advanced AI coding assistant with expertise in ${description} for${langText} programming. Your goal is to provide accurate, efficient, and context-aware code completions. Remember, your role is to act as an extension of the developer's thought process, providing intelligent and contextually appropriate code completions.`;
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
export const generateUserPrompt = (metadata: CompletionMetadata): string => {
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

  let prompt = `You are tasked with ${modeDescription} for a code snippet. The code is part of ${fileNameText}.\n\n`;

  prompt += formatTechnology(technologies, language);

  prompt += `\n\nHere are the details about how the completion should be generated:
  - The cursor position is marked with '${CURSOR_PLACEHOLDER}'.
  - Your completion must start exactly at the cursor position.
  - Do not repeat any code that appears before or after the cursor.
  - Ensure your completion does not introduce any syntactical or logical errors.\n`;

  if (completionMode === 'fill-in-the-middle') {
    prompt += `  - If filling in the middle, replace '${CURSOR_PLACEHOLDER}' entirely with your completion.\n`;
  } else if (completionMode === 'completion') {
    prompt += `  - If completing the code, start from '${CURSOR_PLACEHOLDER}' and provide a logical continuation.\n`;
  }

  prompt += `  - Optimize for readability and performance where possible.

  Remember to output only the completion code without any additional explanation, and do not wrap it in markdown code syntax, such as three backticks (\`\`\`).

  Here's the code snippet for completion:

  <code>
  ${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}
  </code>`;

  if (externalContext && externalContext.length > 0) {
    prompt += `\n\nAdditional context from related files:\n\n`;
    prompt += externalContext
      .map(context => `// Path: ${context.path}\n${context.content}\n`)
      .join('\n');
  }

  return prompt.endsWith('.') ? prompt : `${prompt}.`;
};
