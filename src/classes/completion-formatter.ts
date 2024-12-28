/**
 * This class is responsible for formatting code completions
 * to ensure that they are displayed correctly in the editor.
 */
export class CompletionFormatter {
  private formattedCompletion = '';
  private currentColumn = 0;

  private constructor(completion: string, currentColumn: number) {
    this.formattedCompletion = completion;
    this.currentColumn = currentColumn;
  }

  public static create(
    completion: string,
    currentColumn: number,
  ): CompletionFormatter {
    return new CompletionFormatter(completion, currentColumn);
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
    if (lines.length <= 1) return this;

    const indentation = ' '.repeat(this.currentColumn - 1);
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

    return result.trim();
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
