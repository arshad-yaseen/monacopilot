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

  const modeInstructions =
    completionMode === 'continue'
      ? '- Continue code naturally and seamlessly from the current cursor position, extending the existing logic and patterns.\n'
      : completionMode === 'insert'
        ? '- Insert code precisely between the given segments without breaking existing code.\n'
        : '- Complete the current code block in a contextually appropriate manner, ensuring that the resulting code is fully valid and consistent.\n';

  const system = `You are an advanced ${
    languageOrTechnologies ? `${languageOrTechnologies} ` : ''
  }AI code completion assistant, deeply knowledgeable and capable of generating contextually coherent, style-consistent, and logically sound code completions. Your goal is to provide the most accurate and contextually relevant code snippet at the cursor position, using all given context and adhering strictly to the specified mode. Focus on producing code that continues the user's existing work seamlessly, respects established conventions, and makes correct use of related files, recent changes, and the described technologies.

Instructions for Generation:
1. Analyze all provided context, including the code before and after the cursor, recent changes, language and technology stack, and related files. Align your completion with established patterns and the user’s evident coding style.
2. For the specified mode, ensure your completion follows the given guidelines:
   ${modeInstructions}
3. Strive for minimal yet complete code output. Do not add explanations, comments, or any non-code text. The user expects only the code that should appear at the cursor.
4. Ensure correct syntax, follow any style conventions inferred from the given code context (e.g., naming, indentation, spacing, patterns), and avoid introducing unnecessary complexity.
5. Respect Monaco Editor's inline suggest subwordSmart mode, producing suggestions that integrate seamlessly with the user's current editing context.

Context Provided:
- File: ${filename || 'current file'}
- Language: ${language || 'detected from context'}
- Mode: ${completionMode}
- Technologies: ${languageOrTechnologies || 'inferred from context'}

${
  metadata.recentChanges.length
    ? `Recent Changes:\n${metadata.recentChanges
        .map(change => `- ${change.natural}`)
        .join('\n')}`
    : ''
}`;

  const user = `Context:
1. Related Files:
${formatRelatedFiles(relatedFiles)}

2. Code State:
\`\`\`
${textBeforeCursor}<cursor>${textAfterCursor}
\`\`\`

Your Task:
Generate the most appropriate and contextually fitting code snippet at the <cursor> position. Do not include explanations, comments, or formatting outside the code snippet. Output only the completion code that should appear at <cursor>.`;

  return {system, user};
};
