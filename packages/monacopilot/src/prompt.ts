import type {PromptData} from '@monacopilot/core';

import type {CompletionMetadata} from './types';
import {joinWithAnd} from './utils/text';

const CURSOR_PLACEHOLDER = '<|user_cursor_is_here|>';
const COMPLETION_MODE_TEXTS = {
    insert: {
        noun: 'insertion',
        verb: 'Insert',
    },
    complete: {
        noun: 'completion',
        verb: 'Complete',
    },
    continue: {
        noun: 'continuation',
        verb: 'Continue',
    },
};

export const buildDefaultPrompt = (
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

    const {noun, verb} = COMPLETION_MODE_TEXTS[completionMode];

    const techStack = joinWithAnd(
        [language, ...technologies].filter(
            (item): item is string => typeof item === 'string' && !!item,
        ),
    );

    const relatedFilesText =
        !relatedFiles || relatedFiles.length === 0
            ? ''
            : relatedFiles
                  .map(({path, content}) => `### ${path}\n${content}`)
                  .join('\n\n');

    const systemInstruction = `You are an expert code ${noun} assistant. ${verb} code naturally as if you were the developer, following their patterns and style. Use ${techStack || 'appropriate'} best practices. Focus on writing concise, accurate code that matches the context perfectly. Do not include explanations or comments.`;

    const userInstruction = `${relatedFilesText}

File: ${filename || 'unknown'}
Mode: ${completionMode}

Here is the code context. The ${CURSOR_PLACEHOLDER} indicates where you should ${noun.toLowerCase()}:
\`\`\`
${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}
\`\`\`

${verb} the code at the cursor position. Provide only the exact code that should be inserted, without any additional text, explanation, or syntax highlighting. Your response will be directly inserted into the code.`;

    return {
        system: systemInstruction,
        user: userInstruction,
    };
};
