import {Context, PromptData, RelatedFile} from '../types';
import {joinWithAnd} from '../utils';

const createSystemPrompt = (context: Context | undefined): string => {
  const {technologies, resolvedCurrentLanguage, currentFileName} =
    context ?? {};
  const languageOrTechnologies =
    resolvedCurrentLanguage || joinWithAnd(technologies);

  return `You are an expert${
    languageOrTechnologies ? ` ${languageOrTechnologies} ` : ' '
  }developer assistant. Provide precise and contextually relevant code completions/generations${
    currentFileName ? ` for '${currentFileName}'` : ''
  }. Integrate seamlessly with the existing code, maintain consistency with the project's style, and follow the user's instructions. Consider the context of the current and related files.`;
};

const formatRelatedFiles = (relatedFiles: RelatedFile[]): string => {
  if (!relatedFiles?.length) {
    return '';
  }

  return relatedFiles
    .map(({path, content}) =>
      `
<related_file path="${path}">
  <code>
${content}
  </code>
</related_file>
`.trim(),
    )
    .join('\n');
};

const createUserPrompt = (
  instructions: string = '',
  context: Context | undefined,
): string => {
  const {relatedFiles} = context ?? {};
  const relatedFilesText = relatedFiles ? formatRelatedFiles(relatedFiles) : '';

  return `<task>
  ${instructions}
  ${relatedFilesText}
</task>`;
};

/**
 * Creates the complete prompt data including system and user prompts.
 * The prompt generated using this function includes the context if provided.
 *
 * @param instructions - The user's instructions for the prompt.
 * @param context - Optional context data.
 * @returns An object containing the system and user prompts.
 */
export const constructPromptBase = (
  instructions: string,
  context?: Context,
): PromptData => ({
  system: createSystemPrompt(context),
  user: createUserPrompt(instructions, context),
});
