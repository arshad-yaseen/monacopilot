import type { PromptData } from "@monacopilot/core";

import type { CompletionMetadata } from "./types/core";
import { joinWithAnd } from "./utils/text";

const CURSOR_PLACEHOLDER = "<|developer_cursor_is_here|>";

export const buildPrompt = (metadata: CompletionMetadata): PromptData => {
    return {
        instruction: getInstruction(),
        context: buildContext(metadata),
        fileContent: getFileContent(metadata),
    };
};

const getInstruction = (): string => {
    return "Provide concise and readable code completions that are syntactically and logically accurate, and seamlessly integrate with the existing context. Output only the raw code to be inserted at the cursor location without any additional text, comments, or text before or after the cursor.";
};

const buildContext = (metadata: CompletionMetadata): string => {
    const {
        technologies = [],
        filename,
        relatedFiles = [],
        language,
    } = metadata;

    const techStack = joinWithAnd(
        [language, ...technologies].filter((item): item is string =>
            Boolean(item),
        ),
    );

    const relatedFilesText =
        relatedFiles.length === 0
            ? ""
            : relatedFiles
                  .map(({ path, content }) => `### ${path}\n${content}`)
                  .join("\n\n");

    const contextHeader = [
        techStack ? `Technology stack: ${techStack}` : "",
        `File: ${filename || "unknown"}`,
    ]
        .filter(Boolean)
        .join("\n");

    return `${relatedFilesText ? `${relatedFilesText}\n\n` : ""}${contextHeader}`;
};

const getFileContent = (metadata: CompletionMetadata): string => {
    const { textBeforeCursor, textAfterCursor } = metadata;

    return `**Current code:**
\`\`\`
${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}
\`\`\``;
};
