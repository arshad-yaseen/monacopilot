const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

const parseErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === "string") {
        return error;
    } else {
        return "An unknown error occurred";
    }
};

const report = (error: unknown): { message: string; stack?: string } => {
    const errorMessage = parseErrorMessage(error);

    const formattedError = `${BOLD}[MONACOPILOT ERROR] ${errorMessage}${RESET}`;
    console.error(formattedError);

    return { message: errorMessage };
};

const warn = (message: string, error?: unknown): void => {
    console.warn(
        `${BOLD}[MONACOPILOT WARN] ${message}${error ? `\n${parseErrorMessage(error)}` : ""}${RESET}`,
    );
};

const warnDeprecated = (
    oldFeature: string,
    newFeature: string,
    location?: string,
): void =>
    console.warn(
        `${BOLD}[MONACOPILOT DEPRECATED] "${oldFeature}" is deprecated${location ? ` in ${location}` : ""}. ` +
            `Please use "${newFeature}" instead. It will be removed in a future version.${RESET}`,
    );

export const logger = {
    report,
    warn,
    warnDeprecated,
};
