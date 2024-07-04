class ErrorHandler {
  private error: unknown;

  constructor(error: unknown) {
    this.error = error;
  }

  private logError(prefix: string, message: string, details?: unknown): void {
    console.error(`${prefix}: ${message}`, details);
  }

  public monacopilotError(message: string): void {
    this.logError('MONACO_PILOT_ERROR', message, this.error);
  }

  public apiError(message: string): void {
    this.logError('API_ERROR', message, this.error);
  }

  public completionError(message: string): void {
    this.logError('COMPLETION_ERROR', message, this.error);
  }

  public predictionError(message: string): void {
    this.logError('PREDICTION_ERROR', message, this.error);
  }

  public editorError(message: string): void {
    this.logError('EDITOR_ERROR', message, this.error);
  }

  public unexpectedError(): void {
    if (this.error instanceof Error) {
      this.logError('UNEXPECTED_ERROR', this.error.message, this.error.stack);
    } else {
      this.logError('UNKNOWN_ERROR', String(this.error));
    }
  }
}

const err = (error: unknown) => new ErrorHandler(error);

export default err;
