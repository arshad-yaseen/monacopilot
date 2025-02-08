const RED = '\x1b[91m';
const YELLOW = '\x1b[93m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return 'An unknown error occurred';
  }
};

export const report = (error: unknown): {message: string; stack?: string} => {
  const errorMessage = parseErrorMessage(error);

  const formattedError = `${RED}${BOLD}[MONACOPILOT ERROR] ${errorMessage}${RESET}`;
  console.error(formattedError);

  return {message: errorMessage};
};

export const warn = (message: string, error?: unknown): void => {
  console.warn(
    `${YELLOW}${BOLD}[MONACOPILOT WARN] ${message}${error ? `\n${parseErrorMessage(error)}` : ''}${RESET}`,
  );
};

export const warnDeprecated = (
  oldFeature: string,
  newFeature: string,
  location?: string,
): void =>
  console.warn(
    `${YELLOW}${BOLD}[MONACOPILOT DEPRECATED] "${oldFeature}" is deprecated${location ? ` in ${location}` : ''}. ` +
      `Please use "${newFeature}" instead. It will be removed in a future version.${RESET}`,
  );
