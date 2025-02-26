export type Endpoint = string;
export type Filename = string;
export type Technologies = string[];
export type RelatedFile = {
    /**
     * The relative path from the current editing code in the editor to an external file.
     *
     * Examples:
     * - To include a file `utils.js` in the same directory, set as `./utils.js`.
     * - To include a file `utils.js` in the parent directory, set as `../utils.js`.
     * - To include a file `utils.js` in the child directory, set as `./child/utils.js`.
     */
    path: string;

    /**
     * The content of the external file as a string.
     */
    content: string;
};

export interface BaseCopilotMetadata {
    /**
     * The programming language of the code.
     */
    language: string | undefined;
    /**
     * The name of the file being edited.
     */
    filename: Filename | undefined;
    /**
     * The technologies used in the completion.
     */
    technologies: Technologies | undefined;
    /**
     * Additional context from related files.
     */
    relatedFiles: RelatedFile[] | undefined;
    /**
     * The text that appears after the cursor.
     */
    textAfterCursor: string;
    /**
     * The text that appears before the cursor.
     */
    textBeforeCursor: string;
    /**
     * The current cursor position.
     */
    cursorPosition: {
        /**
         * line number (starts at 1)
         */
        readonly lineNumber: number;
        /**
         * column (the first character in a line is between column 1 and column 2)
         */
        readonly column: number;
    };
}
