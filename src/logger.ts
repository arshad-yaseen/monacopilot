const RED = '\x1b[91m';
const YELLOW = '\x1b[93m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

export const report = (error: unknown): {message: string; stack?: string} => {
  let errorMessage: string;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An unknown error occurred';
  }

  const formattedError = `${RED}${BOLD}[MONACOPILOT ERROR] ${errorMessage}${RESET}`;
  console.error(formattedError);

  return {message: errorMessage};
};

export const warn = (message: string): void => {
  console.warn(`${YELLOW}${BOLD}[MONACOPILOT WARN] ${message}${RESET}`);
};

export const log = (message: string): void => {
  console.log(`${BOLD}[MONACOPILOT] ${message}${RESET}`);
};

export const deprecated = (
  oldFeature: string,
  newFeature: string,
  location?: string,
): void =>
  console.warn(
    `${YELLOW}${BOLD}[MONACOPILOT DEPRECATED] "${oldFeature}" is deprecated${location ? ` in ${location}` : ''}. ` +
      `Please use "${newFeature}" instead. It will be removed in a future version.${RESET}`,
  );
