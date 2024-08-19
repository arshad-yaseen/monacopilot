export class ErrorHandler {
  private static readonly instance: ErrorHandler = new ErrorHandler();

  public static getInstance(): ErrorHandler {
    return ErrorHandler.instance;
  }

  public handleError(error: unknown, context: ErrorContext): ErrorDetails {
    const errorDetails = this.getErrorDetails(error);

    this.logError(context, errorDetails);

    return errorDetails;
  }

  private getErrorDetails(error: unknown): ErrorDetails {
    if (error instanceof Error) {
      return {
        message: error.message,
        name: error.name,
        stack: error.stack,
        context: (error as any).context,
      };
    }
    return {
      message: String(error),
      name: 'UnknownError',
    };
  }

  private styleMessage(message: string, context: ErrorContext): string {
    const timestamp = this.getTimestamp();
    const githubMessage =
      'Please create an issue on GitHub if the issue persists.';
    const boxWidth = 80;
    const horizontalLine = '─'.repeat(boxWidth - 2);
    const topBorder = `┌${horizontalLine}┐`;
    const bottomBorder = `└${horizontalLine}┘`;

    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      words.forEach(word => {
        if ((currentLine + word).length > maxWidth) {
          lines.push(currentLine.trim());
          currentLine = '';
        }
        currentLine += word + ' ';
      });

      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }

      return lines;
    };

    const wrappedMessage = wrapText(message, boxWidth - 4);

    const messageBox = [
      topBorder,
      ...wrappedMessage.map(line => `│ ${line.padEnd(boxWidth - 4)} │`),
      bottomBorder,
    ].join('\n');

    return `\n\x1b[1m\x1b[37m[${timestamp}]\x1b[0m \x1b[31m[${context}]\x1b[0m \x1b[2m${githubMessage}\x1b[0m\n${messageBox}\n`;
  }

  private logError(context: ErrorContext, details: ErrorDetails): void {
    console.error(this.styleMessage(details.message, context));
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }
}

export enum ErrorContext {
  COPILOT_COMPLETION_FETCH = 'COPILOT_COMPLETION_FETCH_ERROR',
  FETCH_COMPLETION_ITEM = 'FETCH_COMPLETION_ITEM_ERROR',
  REGISTER_COPILOT = 'REGISTER_COPILOT_ERROR',
  UNEXPECTED = 'UNEXPECTED_ERROR',
}

interface ErrorDetails {
  message: string;
  stack?: string;
  name: string;
  context?: any;
}

export const handleError = (
  error: unknown,
  context: ErrorContext,
): ErrorDetails => {
  return ErrorHandler.getInstance().handleError(error, context);
};
