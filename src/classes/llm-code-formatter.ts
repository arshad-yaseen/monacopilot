/**
 * This class is responsible for formatting code completions from LLMs
 * to ensure that they are displayed correctly in the editor.
 */
export class LLMCodeFormatter {
  private formattedCode = '';

  private constructor(code: string) {
    this.formattedCode = code;
  }

  public static create(code: string): LLMCodeFormatter {
    return new LLMCodeFormatter(code);
  }

  public setCode(code: string): LLMCodeFormatter {
    this.formattedCode = code;
    return this;
  }

  public removeInvalidLineBreaks(): LLMCodeFormatter {
    this.formattedCode = this.formattedCode.trimEnd();
    return this;
  }

  public removeMarkdownCodeSyntax(): LLMCodeFormatter {
    this.formattedCode = this.removeMarkdownCodeBlocks(this.formattedCode);
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

  public removeExcessiveNewlines(): LLMCodeFormatter {
    this.formattedCode = this.formattedCode.replace(/\n{3,}/g, '\n\n');
    return this;
  }

  public build(): string {
    return this.formattedCode;
  }
}
