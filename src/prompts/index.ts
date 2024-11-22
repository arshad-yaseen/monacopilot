import {CompletionMetadata, PromptData, RelatedFile} from '../types';
import {joinWithAnd} from '../utils';

const generateSystemPrompt = (metadata: CompletionMetadata): string => {
  const {technologies = [], filename, relatedFiles, language} = metadata;
  const languageOrTechnologies = joinWithAnd(
    [language, ...technologies].filter(
      (t): t is string => typeof t === 'string' && Boolean(t),
    ),
  );

  const sections = [
    `You are an expert ${
      languageOrTechnologies ? `${languageOrTechnologies} ` : ''
    }developer assistant specialized in precise code completion.`,

    `Your primary task is to provide accurate, context-aware code completions that seamlessly integrate with existing codebases${
      filename ? ` in '${filename}'` : ''
    }.`,

    `You must:
- Generate only the exact code required.
- Maintain strict adherence to provided instructions.
- Follow established code patterns and conventions.
- Consider the full context before generating code.`,

    relatedFiles?.length
      ? `Analyze and incorporate context from all provided related files to ensure consistent and appropriate code completion.`
      : '',

    language
      ? `Apply ${language}-specific best practices, idioms, and syntax conventions in all generated code.`
      : '',
  ];

  return sections.filter(Boolean).join('\n\n');
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
  <content_context>
\`\`\`
${content}
\`\`\`
  </content_context>
</related_file>`.trim(),
    )
    .join('\n\n');
};

const generateUserPrompt = (
  instructions: string = '',
  metadata: CompletionMetadata,
): string => {
  const {relatedFiles} = metadata;

  return `
<task_context>
  <primary_instructions>
${instructions.trim()}
  </primary_instructions>${
    relatedFiles?.length
      ? `
  <reference_files>
${formatRelatedFiles(relatedFiles)}
  </reference_files>`
      : ''
  }
</task_context>`.trim();
};

/**
 * Constructs a complete prompt with system and user contexts for code generation.
 *
 * @param instructions - Specific completion instructions.
 * @param metadata - Environment and context metadata.
 * @returns {PromptData} Structured prompt with system and user components.
 */
export const constructPromptWithContext = (
  instructions: string,
  metadata: CompletionMetadata,
): PromptData => ({
  system: generateSystemPrompt(metadata),
  user: generateUserPrompt(instructions, metadata),
});
