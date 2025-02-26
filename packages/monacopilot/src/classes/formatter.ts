export class CompletionFormatter {
    private formattedCompletion = '';

    constructor(completion: string) {
        this.formattedCompletion = completion;
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
