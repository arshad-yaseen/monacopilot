import {CompletionMetadata, RelatedFile} from 'types/completion';
import {PromptData} from 'types/copilot';

import {capitalizeFirstLetter, joinWithAnd} from 'utils/text';

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
You are an expert code completion assistant.

**Context:**
File: ${filename || 'Untitled'}
Language: ${language || 'Undetermined'} 
Mode: ${completionMode}
Stack: ${mergedTechStack || 'None'}`;

  const userInstruction = `
**Related Files:**
${compileRelatedFiles(relatedFiles)}

**Source:**
\`\`\`
${textBeforeCursor}<cursor>${textAfterCursor}
\`\`\`

${capitalizeFirstLetter(completionMode)} the code at <cursor>.

Output only the raw code to be inserted at the cursor location without any additional text or comments.`;

  return {
    system: systemInstruction,
    user: userInstruction,
  };
};
