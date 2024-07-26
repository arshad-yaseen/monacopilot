import {CompletionMetadata, CompletionMode, Technologies} from '../types';
import {joinWithAnd} from '../utils';

const CURSOR_PLACEHOLDER = '<cursor>';

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
  return `You are an advanced AI coding assistant with expertise in ${description} for${langText} programming. Your goal is to provide accurate, efficient, and context-aware code completions.

  ### Instructions:
  - Provide only the requested code completion without any additional explanations or markdown.
  - Ensure your suggestions seamlessly integrate with the existing code structure and style.
  - Maintain consistent indentation and formatting with the surrounding code.
  - Start your completion exactly at the cursor position (${CURSOR_PLACEHOLDER}).
  - Do not repeat any existing code before or after the cursor.
  - Respect the project's coding conventions, naming styles, and design patterns.
  - Consider the broader context of the file and project when making suggestions.
  - Optimize for readability, maintainability, and performance where applicable.
  - Handle potential errors and edge cases in your completions when appropriate.
  - Utilize modern language features and best practices specific to${langText}.
  - If multiple valid completions exist, choose the most likely and idiomatic one.
  - If you cannot provide a meaningful completion, return an empty string.

  ### Formatting Rules:
  - Do not include any markdown or code block syntax.
  - Insert newlines after opening brackets ({, [, () and before closing brackets (}, ], )).
  - Add newlines after commas in multi-line structures.
  - Do not suggest newlines after spaces or existing newlines.
  - Match the indentation level of the current line for new lines.

  Remember, your role is to act as an extension of the developer's thought process, providing intelligent and contextually appropriate code completions.`;
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
    editorState,
    textBeforeCursor,
    textAfterCursor,
    externalContext,
  } = metadata;
  const modeDescription = getDescriptionForMode(editorState.completionMode);
  const fileNameText = filename
    ? `the file named "${filename}"`
    : 'a larger project';

  let prompt = `You are tasked with ${modeDescription} for a code snippet. The code is part of ${fileNameText}.

  Your objective is to:
  1. Analyze the provided code snippet and its context.
  2. Generate a completion that seamlessly integrates with the existing code.
  3. Ensure your completion is syntactically correct and semantically meaningful.
  4. Adhere to the project's coding style and conventions.
  5. Consider the broader context of the file and any provided external context.

  ${formatTechnology(technologies, language)}

  Specific instructions:
  - The cursor position is marked with '${CURSOR_PLACEHOLDER}'.
  - Your completion must start exactly at the cursor position.
  - Do not repeat any code that appears before or after the cursor.
  - Ensure your completion does not introduce any syntactical or logical errors.
  - If filling in the middle, replace '${CURSOR_PLACEHOLDER}' entirely with your completion.
  - If completing the code, start from '${CURSOR_PLACEHOLDER}' and provide a logical continuation.
  - Consider any imports, function definitions, or class structures in the surrounding code.
  - If applicable, use appropriate error handling and follow language-specific best practices.
  - Optimize for readability and performance where possible.

  Remember, output only the necessary completion code without any additional explanations or content.

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
