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
        const lines = this.formattedCompletion.split('\n');

        if (this.textBeforeCursorInLine.trim() !== '') {
            return this;
        }

        const firstLine = lines[0].trimStart();
        const firstLineIndent = lines[0].length - firstLine.length;

        if (lines.length === 1) {
            this.formattedCompletion = firstLine;
            return this;
        }

        this.formattedCompletion =
            firstLine +
            '\n' +
            lines
                .slice(1)
                .map(line => {
                    const currentLineIndent =
                        line.length - line.trimStart().length;
                    const trimAmount = Math.min(
                        firstLineIndent,
                        currentLineIndent,
                    );
                    const trimmedStart = line.slice(trimAmount);
                    return ' '.repeat(this.currentColumn - 1) + trimmedStart;
                })
                .join('\n');

        return this;
    }

    private removeMarkdownCodeBlocks(text: string): string {
        const lines = text.split('\n');
        const result: string[] = [];
        let inCodeBlock = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isCodeBlockStart = line.trim().startsWith('```');

            if (isCodeBlockStart && !inCodeBlock) {
                inCodeBlock = true;
                continue;
            }

            if (isCodeBlockStart && inCodeBlock) {
                inCodeBlock = false;
                continue;
            }

            result.push(line);
        }

        return result.join('\n');
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
