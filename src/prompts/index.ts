import {CompletionMetadata, PromptData, RelatedFile} from '../types';
import {joinWithAnd} from '../utils';

const generateSystemPrompt = (metadata: CompletionMetadata): string => {
  const {technologies, filename, relatedFiles} = metadata;
  const languageOrTechnologies = joinWithAnd(technologies);

  const persona = `You are an expert ${languageOrTechnologies ? `${languageOrTechnologies} ` : ''}developer assistant.`;

  const instructions = `Your task is to provide precise and contextually relevant code completions, modifications, or generations`;

  const fileContext = filename ? `for the file '${filename}'` : '';

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

const generateUserPrompt = (
  instructions: string = '',
  metadata: CompletionMetadata,
): string => {
  const {relatedFiles} = metadata;
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
 * Generates a complete prompt for AI code assistance.
 *
 * This function creates a structured prompt that includes:
 * 1. A system prompt with context and guidelines
 * 2. A user prompt with specific instructions and related files
 *
 * @param instructions - The specific task or request from the user
 * @param metadata - Additional information about the code environment
 * @returns An object with 'system' and 'user' properties containing the respective prompts
 */
export const constructPromptWithContext = (
  instructions: string,
  metadata: CompletionMetadata,
): PromptData => ({
  system: generateSystemPrompt(metadata),
  user: generateUserPrompt(instructions, metadata),
});
