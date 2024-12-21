import {CompletionMetadata, PromptData, RelatedFile} from '../types';
import {joinWithAnd} from '../utils';

const compileRelatedFiles = (files?: RelatedFile[]): string => {
  if (!files || files.length === 0) {
    return '';
  }

  return files
    .map(({path, content}) => {
      return `
<related_file>
  <filePath>${path}</filePath>
  <fileContent>
\`\`\`
${content}
\`\`\`
  </fileContent>
</related_file>`.trim();
    })
    .join('\n\n');
};

export const craftCompletionPrompt = (meta: CompletionMetadata): PromptData => {
  const {
    technologies = [],
    filename,
    relatedFiles,
    language,
    textBeforeCursor = '',
    textAfterCursor = '',
    editorState: {completionMode},
  } = meta;

  const mergedTechStack = joinWithAnd(
    [language, ...technologies].filter(
      (item): item is string => typeof item === 'string' && !!item,
    ),
  );

  const systemInstruction = `
Take your time to reason as an exceptional${
    mergedTechStack ? ' ' + mergedTechStack : ''
  } code-generating assistant. You must produce solutions that are:

1. Scrutinized carefully for syntax, semantics, and relevancy.
2. Perfectly aligned with the prescribed completion mode and formatting norms.
3. Free from logical or contextual slip-ups in the final result.

Contextual Data:
- Active File: ${filename || 'Untitled'}
- Main Language: ${language || 'Undetermined'}
- Mode of Completion: ${completionMode}
- Detected Technologies: ${mergedTechStack || 'None'}

Execution Directives:
- Insert the code snippet exactly at the specified cursor mark, omitting any superfluous commentary.
- If other files are relevant, incorporate details from them cautiously.
- Respect the completion mode rules for ${completionMode}:
  ${
    completionMode === 'continue'
      ? '- Expand from the cursor, upholding continuity in the surrounding code.'
      : completionMode === 'insert'
        ? '- Place the snippet precisely at the cursor location (marked by <cursor>).\n' +
          '  - Only output the exact code to be inserted, without surrounding code.\n' +
          '  - Example:\n' +
          '    Input: const num = Math.random(); console.log(<cursor>);\n' +
          '    Correct: num\n' +
          '    Incorrect: `num` or console.log(num)'
        : '- Extend the existing code flow without deviating from its logic.'
  }
`;

  const userInstruction = `
Below is all the context you have:

1. Related Files in Workspace:
${compileRelatedFiles(relatedFiles)}

2. Existing Source with Cursor:
\`\`\`
${textBeforeCursor}<cursor>${textAfterCursor}
\`\`\`

Please craft a minimal yet complete snippet to fill in at <cursor>. Double-check correctness and ensure no syntactic or semantic flaws. Provide only the snippet as final output—no added explanations.
`;

  return {
    system: systemInstruction,
    user: userInstruction,
  };
};
