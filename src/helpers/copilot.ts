import {CompletionMetadata, CompletionMode} from '../types/completion';

const getPromptPlaceholder = (completionMode: CompletionMode) => {
  return completionMode === 'fill-in-the-middle'
    ? '<<FILL_IN_THE_MIDDLE>>'
    : '<<CONTINUATION>>';
};

/**
 * Generates a detailed instruction for the LLM based on the completion metadata.
 * @param {CompletionMetadata} metadata - Metadata containing details for code completion.
 * @returns {Object} - An object containing the system and user prompts.
 */
export const getSystemPrompt = (metadata: CompletionMetadata): string => {
  const {
    language = 'the language',
    filename,
    framework,
    editorState,
  } = metadata;

  const placeholder = getPromptPlaceholder(editorState.completionMode);

  let prompt = `As an expert ${language} code completion assistant known for high accuracy in code completion, could you assist with the code at the location marked '${placeholder}' placeholder? This code is part of the ${filename ? `${filename} file` : 'a larger project'}. Please `;

  switch (editorState.completionMode) {
    case 'fill-in-the-middle':
      prompt += `generate a completion to fill the middle of the code surrounding '${placeholder}'. Ensure the completion precisely replaces '${placeholder}', maintaining consistency, semantic accuracy, and relevance to the context.`;
      break;
    case 'continuation':
      prompt += `provide a continuation from '${placeholder}'. The completion should fluidly extend the existing code, precisely replacing '${placeholder}' while adhering to ${language} standards and ensuring semantic correctness and contextual appropriateness.`;
      break;
  }

  prompt += ` Directly output only the necessary completion code, without additional explanations or content.`;

  if (framework) {
    prompt += ` The code utilizes the ${framework} framework in ${language}.`;
  } else {
    prompt += ` The code is implemented in ${language}.`;
  }

  prompt = prompt.trim().endsWith('.') ? prompt : prompt + '.';

  return prompt;
};

export const getUserPrompt = (metadata: CompletionMetadata): string => {
  const {editorState, codeBeforeCursor, codeAfterCursor, externalContext} =
    metadata;
  const placeholder = getPromptPlaceholder(editorState.completionMode);

  let prompt = `${codeBeforeCursor}${placeholder}${codeAfterCursor}\n`;

  // Append external context information if it exists
  if (externalContext && externalContext.length > 0) {
    prompt += externalContext
      .map(context => `// Path: ${context.path}\n${context.content}\n`)
      .join('\n');
  }

  return prompt;
};
