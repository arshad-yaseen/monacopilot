export class CompletionFormatter {
    private formattedCompletion = '';
    private currentColumn = 0;
    private textBeforeCursorInLine = '';

    constructor(
        completion: string,
        currentColumn: number,
        textBeforeCursorInLine: string,
    ) {
        this.formattedCompletion = completion;
        this.currentColumn = currentColumn;
        this.textBeforeCursorInLine = textBeforeCursorInLine;
    }

    public setCompletion(completion: string): CompletionFormatter {
        this.formattedCompletion = completion;
        return this;
    }

    public removeInvalidLineBreaks(): CompletionFormatter {
        this.formattedCompletion = this.formattedCompletion.trimEnd();
        return this;
    }

    public removeMarkdownCodeSyntax(): CompletionFormatter {
        this.formattedCompletion = this.removeMarkdownCodeBlocks(
            this.formattedCompletion,
        );
        return this;
    }

    public indentByColumn(): CompletionFormatter {
        // Split completion into lines
        const lines = this.formattedCompletion.split('\n');

        // Skip indentation if there's only one line or if there's text before cursor in the line
        if (lines.length <= 1 || this.textBeforeCursorInLine.trim() !== '') {
            return this;
        }

        // Create indentation string based on current column position
        const indentation = ' '.repeat(this.currentColumn - 1);

        // Keep first line as is, indent all subsequent lines
        this.formattedCompletion =
            lines[0] +
            '\n' +
            lines
                .slice(1)
                .map(line => indentation + line)
                .join('\n');

        return this;
    }

    private removeMarkdownCodeBlocks(text: string): string {
        const codeBlockRegex = /```[\s\S]*?```/g;
        let result = text;
        let match: RegExpExecArray | null;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            const codeBlock = match[0];
            const codeContent = codeBlock.split('\n').slice(1, -1).join('\n');
            result = result.replace(codeBlock, codeContent);
        }

        return result.replace(/^\n+|\n+$/g, '');
    }

    public removeExcessiveNewlines(): CompletionFormatter {
        this.formattedCompletion = this.formattedCompletion.replace(
            /\n{3,}/g,
            '\n\n',
        );
        return this;
    }

    public build(): string {
        return this.formattedCompletion;
    }
}
