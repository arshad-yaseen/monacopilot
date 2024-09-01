import {ErrorContext, ErrorDetails} from './error';

/**
 * Logger class for handling application-wide logging.
 * This class follows the Singleton pattern to ensure a single instance throughout the application.
 */
export class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public error(context: ErrorContext, details: ErrorDetails): void {
    console.error(this.styleMessage(details.message, context, 'error'));
    if (details.stack) {
      console.error(this.styleStackTrace(details.stack));
    }
  }

  public warn(context: ErrorContext, message: string): void {
    console.warn(this.styleMessage(message, context, 'warning'));
  }

  private styleMessage(
    message: string,
    context: ErrorContext,
    type: 'error' | 'warning',
  ): string {
    const timestamp = this.getTimestamp();
    const githubMessage =
      'Please create an issue on GitHub if the issue persists.';
    const boxWidth = 100;
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

    const color = type === 'error' ? '\x1b[31m' : '\x1b[33m';
    return `\n\x1b[1m\x1b[37m[${timestamp}]\x1b[0m${color} [${context}]\x1b[0m \x1b[2m${githubMessage}\x1b[0m\n${messageBox}\n`;
  }

  private styleStackTrace(stack: string): string {
    const lines = stack.split('\n');
    const styledLines = lines.map((line, index) => {
      if (index === 0) return `\x1b[31m${line}\x1b[0m`;
      return `\x1b[2m${line}\x1b[0m`;
    });
    return styledLines.join('\n');
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }
}
