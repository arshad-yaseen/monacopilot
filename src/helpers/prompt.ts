import {CompletionMetadata, CompletionMode} from '../types/completion';

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
      return 'unknown mode';
  }
};

export const generateSystemPrompt = (metadata: CompletionMetadata): string => {
  const language = getProperLanguageName(metadata.language);
  const description = getDescriptionForMode(
    metadata.editorState.completionMode,
  );
  const langText = language || '';
  return `You are an expert ${langText} code completion assistant known for exceptional skill in ${description}.`;
};

export const generateUserPrompt = (metadata: CompletionMetadata): string => {
  const {
    filename,
    framework,
    editorState,
    codeBeforeCursor,
    codeAfterCursor,
    externalContext,
  } = metadata;

  const language = getProperLanguageName(metadata.language);
  const modeDescription = getDescriptionForMode(editorState.completionMode);
  const fileNameText = filename
    ? `the file named ${filename}`
    : 'a larger project';

  const frameworkText = framework
    ? ` The code utilizes the ${framework} framework in ${language}.`
    : ` The code is implemented in ${language}.`;

  let prompt = `You will be presented with a code snippet where the cursor location is marked with '${CURSOR_PLACEHOLDER}'. Your task is to assist with ${modeDescription}. This code is part of ${fileNameText}. Please `;

  switch (editorState.completionMode) {
    case 'fill-in-the-middle':
      prompt += `generate a completion to fill the middle of the code around '${CURSOR_PLACEHOLDER}'. Ensure the completion replaces '${CURSOR_PLACEHOLDER}' precisely, maintaining consistency, semantic accuracy, and relevance to the context. The completion must start exactly from the cursor position without any preceding or following characters, and it should not introduce any syntactical or semantic errors to the existing code.`;
      break;
    case 'completion':
      prompt += `provide the necessary completion for '${CURSOR_PLACEHOLDER}' while ensuring consistency, semantic accuracy, and relevance to the context. The completion must start exactly from the cursor position without any preceding or following characters, and it should not introduce any syntactical or semantic errors to the existing code.`;
      break;
  }

  prompt += ` Output only the necessary completion code, without additional explanations or content.${frameworkText}`;

  let codeForCompletion = `${codeBeforeCursor}${CURSOR_PLACEHOLDER}${codeAfterCursor}\n\n`;

  if (externalContext && externalContext.length > 0) {
    codeForCompletion += externalContext
      .map(context => `// Path: ${context.path}\n${context.content}\n`)
      .join('\n');
  }

  prompt += `\n\n<code>\n${codeForCompletion}\n</code>`;

  return prompt.endsWith('.') ? prompt : `${prompt}.`;
};
