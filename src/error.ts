import {Logger} from './logger';

export class ErrorHandler {
  private static readonly instance: ErrorHandler = new ErrorHandler();
  private logger: Logger;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): ErrorHandler {
    return ErrorHandler.instance;
  }

  public handleError(error: unknown, context: ErrorContext): ErrorDetails {
    const errorDetails = this.getErrorDetails(error);
    this.logger.error(context, errorDetails);
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
}

/**
 * Represents the context in which an error occurred.
 */
export enum ErrorContext {
  /** Error occurred while fetching Copilot completion */
  COPILOT_COMPLETION_FETCH = 'COPILOT_COMPLETION_FETCH_ERROR',
  /** Error occurred while fetching a completion item */
  FETCH_COMPLETION_ITEM = 'FETCH_COMPLETION_ITEM_ERROR',
  /** Error occurred during Copilot registration */
  REGISTER_COPILOT = 'REGISTER_COPILOT_ERROR',
  /** Unexpected or uncategorized error */
  UNEXPECTED = 'UNEXPECTED_ERROR',
}

export interface ErrorDetails {
  message: string;
  stack?: string;
  name: string;
  context?: any;
}

/**
 * Handles an error by logging it and returning the error details.
 * @param error - The error to be handled.
 * @param context - The context in which the error occurred.
 * @returns The details of the handled error.
 */
export const handleError = (
  error: unknown,
  context: ErrorContext,
): ErrorDetails => {
  const errorHandler = ErrorHandler.getInstance();
  return errorHandler.handleError(error, context);
};
