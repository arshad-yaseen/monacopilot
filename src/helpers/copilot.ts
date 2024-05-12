import {CompletionMetadata, CompletionMode} from '../types/completion';

const CURSOR_PLACEHOLDER = '<|cursor|>';

const getDescriptionForMode = (mode: CompletionMode): string => {
  switch (mode) {
    case 'fill-in-the-middle':
      return 'filling in the middle of code';
    case 'continuation':
      return 'continuing the code';
    default:
      return 'unknown mode';
  }
};

export const generateSystemPrompt = (metadata: CompletionMetadata): string => {
  const {
    language = 'the language',
    filename,
    framework,
    editorState,
  } = metadata;

  let prompt = `As an expert ${language} code completion assistant known for high accuracy in ${getDescriptionForMode(editorState.completionMode)}, could you assist with the code at the cursor location marked '${CURSOR_PLACEHOLDER}'? This code is part of ${filename ? `the ${filename} file` : 'a larger project'}. Please `;

  switch (editorState.completionMode) {
    case 'fill-in-the-middle':
      prompt += `generate a completion to fill the middle of the code surrounding '${CURSOR_PLACEHOLDER}'. Ensure the completion precisely replaces '${CURSOR_PLACEHOLDER}', maintaining consistency, semantic accuracy, and relevance to the context.`;
      break;
    case 'continuation':
      prompt += `provide a continuation from '${CURSOR_PLACEHOLDER}'. The completion should fluidly extend the existing code, precisely replacing '${CURSOR_PLACEHOLDER}' while adhering to ${language} standards and ensuring semantic correctness and contextual appropriateness.`;
      break;
  }

  prompt += ` Output only the necessary completion code, without additional explanations or content.`;

  if (framework) {
    prompt += ` The code utilizes the ${framework} framework in ${language}.`;
  } else {
    prompt += ` The code is implemented in ${language}.`;
  }

  return prompt.endsWith('.') ? prompt : prompt + '.';
};

export const generateUserPrompt = (metadata: CompletionMetadata): string => {
  const {codeBeforeCursor, codeAfterCursor, externalContext} = metadata;

  let prompt = `${codeBeforeCursor}${CURSOR_PLACEHOLDER}${codeAfterCursor}\n\n`;

  // Append external context information if available
  if (externalContext && externalContext.length > 0) {
    prompt += externalContext
      .map(context => `// Path: ${context.path}\n${context.content}\n`)
      .join('\n');
  }

  return prompt;
};
