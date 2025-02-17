export const isCancellationError = (err: unknown): boolean => {
    if (typeof err === 'string') {
        return err === 'Cancelled' || err === 'AbortError';
    } else if (err instanceof Error) {
        return err.message === 'Cancelled' || err.name === 'AbortError';
    }
    return false;
};
