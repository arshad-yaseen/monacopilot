export class ErrorHandler {
  private static readonly instance: ErrorHandler = new ErrorHandler();

  private constructor() {}

  public static getInstance(): ErrorHandler {
    return ErrorHandler.instance;
  }

  public handleError(error: unknown, context: ErrorContext): ErrorDetails {
    const errorDetails = this.getErrorDetails(error);
    const styledMessage = `\x1b[31m[${context}]\x1b[0m \x1b[1m${errorDetails.message}\x1b[0m`;
    console.error(styledMessage);
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
  /** Error occurred during completion registration */
  REGISTER_COMPLETION = 'REGISTER_COMPLETION_ERROR',
  /** Error occurred while triggering completion */
  TRIGGER_COMPLETION = 'TRIGGER_COMPLETION_ERROR',
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
