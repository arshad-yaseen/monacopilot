export * from './errors';

export class MonacoPilotError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: any,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class CompletionError extends MonacoPilotError {
  constructor(message: string, details?: any) {
    super('COMPLETION_ERROR', message, details);
  }
}
