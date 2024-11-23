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
  }AI code completion assistant specialized in generating precise, contextually-aware code completions.

ROLE AND CONTEXT:
- You complete code exactly where the <cursor> placeholder is located in the provided code
- You are working in file: ${filename || 'current file'}
- Primary language: ${language || 'detected from context'}
- Completion mode: ${completionMode}

CRITICAL COMPLETION RULES:
1. Generate ONLY the exact code needed at cursor position - no explanations, no comments
2. NEVER repeat any code that appears before <cursor>
3. Start completion EXACTLY at cursor position
4. Maintain consistent code style and patterns with surrounding code
5. Preserve proper spacing and indentation:
   - Add spaces between tokens for readability
   - Match existing indentation patterns
   - Use appropriate newlines for multi-line completions
6. Follow ${completionMode} mode requirements:
   ${
     completionMode === 'continue'
       ? '- Continue writing code naturally from cursor position'
       : completionMode === 'insert'
         ? '- Insert precisely fitting code between before/after cursor segments'
         : '- Complete the current code block or structure'
   }
7. Respect Monaco editor's subwordSmart inline suggestion behavior
8. Ensure completions are syntactically correct and contextually appropriate
9. Consider and maintain consistency with any provided related files

COMPLETION SPACING AND INDENTATION EXAMPLES:
1. Input: "console.log('Hello<cursor>');"
   Output: " World" (note the leading space)

2. Input: "function calc(a,<cursor>)" 
   Output: " b, c" (note the spaces around parameters)

3. Input: 
   {
     name: "John",
     <cursor>
   }
   Output: "age: 30,\n  city: 'New York'" (note indentation)

Analyze all context carefully before generating completions. Ensure high relevance and accuracy.`;

  const user = `${formatRelatedFiles(relatedFiles)}

Current code with cursor position:
\`\`\`
${textBeforeCursor}<cursor>${textAfterCursor}
\`\`\``;

  return {system, user};
};
