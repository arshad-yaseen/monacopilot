import type {PromptData} from '@monacopilot/core';

import type {CompletionMetadata} from './types';
import {joinWithAnd} from './utils/text';

const CURSOR_PLACEHOLDER = '<|developer_cursor_is_here|>';
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

    const isFullCompletion =
        completionMode === 'continue' || completionMode === 'complete';

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

    const systemInstruction = `You are an expert code ${noun} assistant. ${verb}${isFullCompletion ? ' the full' : ''} code naturally as if you were the developer, following their patterns and style. Use ${techStack || 'appropriate'} best practices. Focus on writing concise, accurate code that matches the context perfectly, including proper indentation and formatting to seamlessly integrate with the existing code. Do not include explanations, comments, or backticks.`;

    const userInstruction = `${relatedFilesText}

File: ${filename || 'unknown'}
Mode: ${completionMode}

Here is the code context with the ${CURSOR_PLACEHOLDER} marker indicating where to ${verb.toLowerCase()} the code:
\`\`\`
${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}
\`\`\`

Provide only the code that should replace the ${CURSOR_PLACEHOLDER} marker. Ensure it is properly indented and formatted to seamlessly integrate with the existing code. Do not include any additional text, explanations, or syntax highlighting. Your response will be directly inserted in place of the marker.`;

    return {
        system: systemInstruction,
        user: userInstruction,
    };
};
