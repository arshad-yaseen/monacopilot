import type {PromptData} from '@monacopilot/core';

import type {CompletionMetadata, RelatedFile} from './types';
import {capitalizeFirstLetter, joinWithAnd} from './utils/text';

const compileRelatedFiles = (files?: RelatedFile[]): string => {
    if (!files || files.length === 0) {
        return '';
    }

    return files
        .map(({path, content}) => {
            return `
### Path: ${path}
\`\`\`
${content}
\`\`\``.trim();
        })
        .join('\n\n');
};

export const craftCompletionPrompt = (
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

    const mergedTechStack = joinWithAnd(
        [language, ...technologies].filter(
            (item): item is string => typeof item === 'string' && !!item,
        ),
    );

    const systemInstruction = `
You are an EXCELLENT code completion assistant.

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

**Completion Constraints (MUST)**
1. MUST start after: "${textBeforeCursor.slice(-3)}"
2. MUST end before: "${textAfterCursor.slice(0, 3)}"

Output ONLY the raw code to be inserted at the cursor location without any additional text, comments, or code block syntax.`;

    return {
        system: systemInstruction,
        user: userInstruction,
    };
};
