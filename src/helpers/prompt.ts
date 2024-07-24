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
  return `You are a world-class${langText} coding assistant renowned for your exceptional expertise in ${description}.`;
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
    ? `the file named ${filename}`
    : 'a larger project';

  let prompt = `You will be presented with a code snippet in '<code>' tag where the cursor location is marked with '${CURSOR_PLACEHOLDER}'. 
  Your task is to assist with ${modeDescription}. This code is part of ${fileNameText}. Please `;
  switch (editorState.completionMode) {
    case 'fill-in-the-middle':
      prompt += `generate a completion to fill the middle of the code around '${CURSOR_PLACEHOLDER}'. 
      Ensure the completion replaces '${CURSOR_PLACEHOLDER}' precisely, maintaining consistency, semantic accuracy, and relevance to the context. 
      The completion must start exactly from the cursor position without any preceding or following characters, 
      and it should not introduce any syntactical or semantic errors to the existing code.`;
      break;
    case 'completion':
      prompt += `provide the necessary completion for '${CURSOR_PLACEHOLDER}' while ensuring consistency, semantic accuracy, and relevance to the context. 
      The completion must start exactly from the cursor position without any preceding or following characters, 
      and it should not introduce any syntactical or semantic errors to the existing code.`;
      break;
  }
  prompt += ` Output only the necessary completion code, without additional explanations or content.
  ${formatTechnology(technologies, language)}`;
  let codeForCompletion = `${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}\n\n`;
  if (externalContext && externalContext.length > 0) {
    codeForCompletion += externalContext
      .map(context => `// Path: ${context.path}\n${context.content}\n`)
      .join('\n');
  }
  prompt += `\n\n<code>\n${codeForCompletion}\n</code>`;
  return prompt.endsWith('.') ? prompt : `${prompt}.`;
};
