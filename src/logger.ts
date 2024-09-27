import {ErrorLogDetails, LoggerContext} from './types';

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

  public error(message: string): void {
    console.error(`${Logger.RED}${Logger.BOLD}${message}${Logger.RESET}`);
  }

  public warn(message: string): void {
    console.warn(`${Logger.YELLOW}${Logger.BOLD}${message}${Logger.RESET}`);
  }

  public log(message: string): void {
    console.log(message);
  }
}

/**
 * Singleton class for handling errors and logging.
 */
class ErrorHandler {
  private static readonly instance: ErrorHandler = new ErrorHandler();
  private readonly logger: Logger;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): ErrorHandler {
    return ErrorHandler.instance;
  }

  /**
   * Handles an error by logging it and returning the error details.
   * @param error - The error to be handled.
   * @param context - The context in which the error occurred.
   * @returns The details of the handled error.
   */
  public handleError(error: unknown, context: LoggerContext): ErrorLogDetails {
    const errorDetails = this.getErrorDetails(error);
    this.logger.error(`[${context}] ${errorDetails.message}`);
    return errorDetails;
  }

  private getErrorDetails(error: unknown): ErrorLogDetails {
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
      stack: undefined,
      context: LoggerContext.UNEXPECTED,
    };
  }
}

export const logError = (
  error: unknown,
  context: LoggerContext,
): ErrorLogDetails => {
  return ErrorHandler.getInstance().handleError(error, context);
};

export const logWarning = (message: string, context: LoggerContext): void => {
  Logger.getInstance().warn(`[${context}] ${message}`);
};
