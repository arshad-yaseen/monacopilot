import {CompletionMetadata, CompletionMode, Technologies} from '../types';
import {joinWithAnd} from '../utils';

const CURSOR_PLACEHOLDER = '<<CURSOR>>';

const getProperLanguageName = (language?: string): string | undefined => {
  return language === 'javascript' ? 'latest JavaScript' : language;
};

const getDescriptionForMode = (mode: CompletionMode): string => {
  switch (mode) {
    case 'fill-in-the-middle':
      return 'filling in the middle of the code';
    case 'completion':
      return 'completing the code';
    default:
      return 'completing the code';
  }
};

export const generateSystemPrompt = (metadata: CompletionMetadata): string => {
  const language = getProperLanguageName(metadata.language);
  const description = getDescriptionForMode(
    metadata.editorState.completionMode,
  );
  const langText = language || '';
  return `You are an expert ${langText} code completion assistant with deep knowledge of software engineering principles, design patterns, and best practices. You excel at ${description} with precision, maintaining code consistency, and adhering to industry standards. Your completions are known for being semantically accurate, syntactically correct, and highly relevant to the given context.`;
};

const formatTechnology = (
  technologies?: Technologies,
  language?: string,
): string => {
  if (!technologies?.length && !language) return '';

  const technologiesText = joinWithAnd(technologies);
  const languageText = getProperLanguageName(language);

  return `The code is written${languageText ? ` in ${languageText}` : ''}${technologiesText ? ` using ${technologiesText}` : ''}. Ensure your completion aligns with the conventions and best practices of these technologies.`;
};

export const generateUserPrompt = (metadata: CompletionMetadata): string => {
  const {
    filename,
    language,
    technologies,
    editorState,
    codeBeforeCursor,
    codeAfterCursor,
    externalContext,
  } = metadata;

  const modeDescription = getDescriptionForMode(editorState.completionMode);
  const fileNameText = filename
    ? `the file named '${filename}'`
    : 'a larger project';

  let prompt = `You will be presented with a code snippet enclosed in '<code>' tags. The cursor location is marked with '${CURSOR_PLACEHOLDER}'. Your task is to assist with ${modeDescription}. This code is part of ${fileNameText}. Please `;

  switch (editorState.completionMode) {
    case 'fill-in-the-middle':
      prompt += `generate a completion to fill the middle of the code around '${CURSOR_PLACEHOLDER}'. Your completion must:
1. Replace '${CURSOR_PLACEHOLDER}' precisely.
2. Maintain perfect consistency with the existing code style, indentation, and naming conventions.
3. Ensure semantic accuracy and relevance to the surrounding context.
4. Start exactly from the cursor position without any preceding characters.
5. Not introduce any syntactical or semantic errors to the existing code.
6. Seamlessly integrate with both the code before and after the cursor.
7. Follow best practices and common patterns for the given language and technologies.`;
      break;
    case 'completion':
      prompt += `provide the necessary completion for '${CURSOR_PLACEHOLDER}'. Your completion must:
1. Start exactly from the cursor position without any preceding characters.
2. Maintain perfect consistency with the existing code style, indentation, and naming conventions.
3. Ensure semantic accuracy and relevance to the context.
4. Not introduce any syntactical or semantic errors to the existing code.
5. Provide a logical and appropriate continuation of the code.
6. Follow best practices and common patterns for the given language and technologies.
7. Be concise yet comprehensive, completing the current statement or block as needed.`;
      break;
  }

  prompt += `\n\nOutput only the necessary completion code, without any additional explanations, comments, or content. ${formatTechnology(technologies, language)}`;

  if (language) {
    prompt += `\n\nPay special attention to ${language}-specific syntax, built-in functions, and idiomatic expressions.`;
  }

  let codeForCompletion = `${codeBeforeCursor}${CURSOR_PLACEHOLDER}${codeAfterCursor}\n\n`;

  if (externalContext && externalContext.length > 0) {
    prompt += `\n\nConsider the following additional context from related files:`;
    codeForCompletion += externalContext
      .map(context => `\n// Path: ${context.path}\n${context.content}`)
      .join('\n');
  }

  prompt += `\n\n<code>\n${codeForCompletion}\n</code>`;

  return prompt.endsWith('.') ? prompt : `${prompt}.`;
};
