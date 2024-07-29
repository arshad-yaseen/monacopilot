export class Logger {
  private static readonly instance: Logger = new Logger();

  private constructor() {}

  public static getInstance(): Logger {
    return Logger.instance;
  }

  public log(message: string, ...args: any[]): void {
    console.log(`[LOG] ${message}`, ...args);
  }

  public info(message: string, ...args: any[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  public error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  public debug(message: string, ...args: any[]): void {
    console.debug(`[DEBUG] ${message}`, ...args);
  }
}

export const getLogger = (): Logger => {
  return Logger.getInstance();
};
