import type {PromptData} from '@monacopilot/core';

import type {CompletionMetadata, RelatedFile} from './types';
import {joinWithAnd} from './utils/text';

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
You are an EXCELLENT predictive code completion assistant.

Your goal is to predict and complete the next logical code segment that the developer would write, making their coding experience more efficient and enjoyable.

You should:
1. Provide complete, functional code segments with full implementation details
2. Complete entire functions or logical blocks when appropriate
3. Consider common patterns and best practices
4. Ensure the output is immediately useful and runnable

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

Complete the code at <cursor> position.

Guidelines:
1. Start after: "${textBeforeCursor.slice(-5)}"
2. End before: "${textAfterCursor.slice(0, 5)}"
3. Provide complete, working implementations
4. Follow established patterns
5. Ensure code is production-ready

Output ONLY the implementation without additional text or syntax.`;

    return {
        system: systemInstruction,
        user: userInstruction,
    };
};
