import {CompletionMetadata, PromptData, RelatedFile} from '../types';
import {joinWithAnd} from '../utils';

const formatRelatedFiles = (
  relatedFiles: RelatedFile[] | undefined,
): string => {
  if (!relatedFiles?.length) return '';

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
</related_file>`.trim(),
    )
    .join('\n\n');
};

export const generateCompletionPrompt = (
  metadata: CompletionMetadata,
): PromptData => {
  const {
    technologies = [],
    filename,
    relatedFiles,
    language,
    textBeforeCursor = '',
    textAfterCursor = '',
    editorState: {completionMode},
  } = metadata;

  const languageOrTechnologies = joinWithAnd(
    [language, ...technologies].filter(
      (t): t is string => typeof t === 'string' && Boolean(t),
    ),
  );

  const system = `You are an expert ${
    languageOrTechnologies ? `${languageOrTechnologies} ` : ''
  }AI code completion assistant. Generate precise, contextually-aware code completions by:

1. Analyzing code context, patterns and conventions
2. Determining appropriate completions based on mode and context
3. Ensuring proper formatting and style consistency
4. Respect the monaco editor's inline suggest subwordSmart mode

Context:
- File: ${filename || 'current file'}
- Language: ${language || 'detected from context'}
- Mode: ${completionMode}
- Technologies: ${languageOrTechnologies || 'inferred from context'}

Guidelines:
- Maintain consistent style and patterns
- Consider related files and context
- Follow mode-specific behavior (${completionMode}):
  ${
    completionMode === 'continue'
      ? '- Continue code naturally from cursor'
      : completionMode === 'insert'
        ? '- Insert precisely between segments'
        : '- Complete current code block'
  }`;

  const user = `Context:
1. Related Files:
${formatRelatedFiles(relatedFiles)}

2. Code State:
\`\`\`
${textBeforeCursor}<cursor>${textAfterCursor}
\`\`\`

Generate appropriate code completion at <cursor> position (Output only code without any comments or explanations):`;

  return {system, user};
};
