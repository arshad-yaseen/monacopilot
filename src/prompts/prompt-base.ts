import {Context, PromptData, RelatedFile} from '../types';
import {joinWithAnd} from '../utils';

const createSystemPrompt = (context: Context | undefined): string => {
  const {technologies, resolvedCurrentLanguage, currentFileName, relatedFiles} =
    context ?? {};
  const languageOrTechnologies =
    resolvedCurrentLanguage || joinWithAnd(technologies);

  const persona = `You are an expert ${languageOrTechnologies ? `${languageOrTechnologies} ` : ''}developer assistant.`;

  const instructions = `Your task is to provide precise and contextually relevant code completions, modifications, or generations`;

  const fileContext = currentFileName
    ? `for the file '${currentFileName}'`
    : '';

  const relatedFilesInfo =
    relatedFiles && relatedFiles.length > 0
      ? `Consider the context of the current and related files provided.`
      : '';

  const codeStyleGuidelines = `Ensure that your responses integrate seamlessly with the existing code and maintain consistency with the project's style and conventions.`;

  const reasoning = `Before providing the completion or modification, think through the problem step-by-step, considering best practices and any potential edge cases.`;

  const systemPrompt = `${persona}
${instructions} ${fileContext}.
${codeStyleGuidelines}
${relatedFilesInfo}
${reasoning}`;

  return systemPrompt.trim();
};

const formatRelatedFiles = (relatedFiles: RelatedFile[]): string => {
  if (!relatedFiles?.length) {
    return '';
  }

  return relatedFiles
    .map(({path, content}) =>
      `
<related_file>
  <path>${path}</path>
  <content>
\`\`\`
${content}
\`\`\`
  </content>
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

  return `
<task>
  <instructions>
${instructions.trim()}
  </instructions>
  ${relatedFilesText}
</task>
`.trim();
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
