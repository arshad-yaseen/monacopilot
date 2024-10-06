/**
 * Logger class for consistent logging across the application.
 */
class Logger {
  private static readonly instance: Logger = new Logger();
  private static readonly RED = '\x1b[31m';
  private static readonly YELLOW = '\x1b[33m';
  private static readonly RESET = '\x1b[0m';
  private static readonly BOLD = '\x1b[1m';

  private constructor() {}

  public static getInstance(): Logger {
    return Logger.instance;
  }

  public error(error: unknown): {message: string; stack?: string} {
    let errorMessage: string;
    let errorStack: string | undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorStack = error.stack;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = 'An unknown error occurred';
    }

    const formattedError = `${Logger.RED}${Logger.BOLD}[MONACOPILOT ERROR] ${errorMessage}${Logger.RESET}`;
    console.error(formattedError);

    if (errorStack) {
      console.error(
        `${Logger.RED}[MONACOPILOT ERROR] Stack trace:${Logger.RESET}\n${errorStack}`,
      );
    }

    return {message: errorMessage, stack: errorStack};
  }

  public warning(message: string): void {
    console.warn(
      `${Logger.YELLOW}${Logger.BOLD}[MONACOPILOT WARN] ${message}${Logger.RESET}`,
    );
  }

  public information(message: string): void {
    console.log(`${Logger.BOLD}[MONACOPILOT] ${message}${Logger.RESET}`);
  }
}

export const log = Logger.getInstance();
