import {getLogger, Logger} from './logger';

export class ErrorHandler {
  private static readonly instance: ErrorHandler = new ErrorHandler();
  private readonly logger: Logger;

  private constructor() {
    this.logger = getLogger();
  }

  public static getInstance(): ErrorHandler {
    return ErrorHandler.instance;
  }

  public handleError(error: unknown, context: ErrorContext): void {
    const errorDetails = this.getErrorDetails(error);
    this.logger.error(`${context}: ${errorDetails.message}`, errorDetails);
  }

  private getErrorDetails(error: unknown): ErrorDetails {
    if (error instanceof Error) {
      return {
        message: error.message,
        name: error.name,
        stack: error.stack,
      };
    }
    return {
      message: String(error),
      name: 'UnknownError',
    };
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
}

export const handleError = (error: unknown, context: ErrorContext): void => {
  ErrorHandler.getInstance().handleError(error, context);
};
