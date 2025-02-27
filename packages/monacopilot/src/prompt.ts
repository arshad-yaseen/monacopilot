import type {PromptData} from '@monacopilot/core';

import type {CompletionMetadata} from './types/core';
import {joinWithAnd} from './utils/text';

const CURSOR_PLACEHOLDER = '<|developer_cursor_is_here|>';

export const buildPrompt = (metadata: CompletionMetadata): PromptData => {
    return {
        instruction: getInstruction(),
        context: buildContext(metadata),
        fileContent: getFileContent(metadata),
    };
};

const getInstruction = (): string => {
    return `You are an expert code assistant completing code in an editor. Provide concise, accurate code that seamlessly integrates with the existing context.`;
};

const buildContext = (metadata: CompletionMetadata): string => {
    const {technologies = [], filename, relatedFiles = [], language} = metadata;

    const techStack = joinWithAnd(
        [language, ...technologies].filter((item): item is string =>
            Boolean(item),
        ),
    );

    const relatedFilesText =
        relatedFiles.length === 0
            ? ''
            : relatedFiles
                  .map(({path, content}) => `### ${path}\n${content}`)
                  .join('\n\n');

    const contextHeader = [
        techStack ? `Technology stack: ${techStack}` : '',
        `File: ${filename || 'unknown'}`,
    ]
        .filter(Boolean)
        .join('\n');

    return `${relatedFilesText ? `${relatedFilesText}\n\n` : ''}${contextHeader}`;
};

const getFileContent = (metadata: CompletionMetadata): string => {
    const {textBeforeCursor, textAfterCursor} = metadata;

    return `**Current code:**
\`\`\`
${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}
\`\`\``;
};
