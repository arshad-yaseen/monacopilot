/**
 * This class is responsible for formatting code completions
 * to ensure that they are displayed correctly in the editor.
 */
export class CompletionFormatter {
  private formattedCompletion = '';

  private constructor(completion: string) {
    this.formattedCompletion = completion;
  }

  public static create(completion: string): CompletionFormatter {
    return new CompletionFormatter(completion);
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
