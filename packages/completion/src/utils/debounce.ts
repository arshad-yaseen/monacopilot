export const typingDebouncedAsync = <
    T extends (...args: any[]) => Promise<any>,
>(
    func: T,
    baseWait: number = 600,
    threshold: number = 200,
): {
    (...args: Parameters<T>): Promise<ReturnType<T>>;
    cancel: () => void;
} => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastCallTime = 0;
    let lastArgs: Parameters<T> | null = null;
    let currentPromise: Promise<ReturnType<T>> | null = null;
    let isExecuting = false;

    const debouncedFunc = (...args: Parameters<T>): Promise<ReturnType<T>> => {
        if (isExecuting) {
            return Promise.resolve(undefined as ReturnType<T>);
        }

        lastArgs = args;
        const currentTime = Date.now();
        const timeSinceLastCall = currentTime - lastCallTime;
        lastCallTime = currentTime;

        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }

        const delay = timeSinceLastCall < threshold ? baseWait : threshold;

        currentPromise = new Promise((resolve, reject) => {
            timeoutId = setTimeout(async () => {
                isExecuting = true;
                try {
                    if (lastArgs) {
                        const result = await func(...lastArgs);
                        resolve(result);
                    } else {
                        resolve(undefined as ReturnType<T>);
                    }
                } catch (error) {
                    reject(error);
                } finally {
                    isExecuting = false;
                    timeoutId = null;
                    lastArgs = null;
                }
            }, delay);
        });

        return currentPromise;
    };

    debouncedFunc.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastArgs = null;
    };

    return debouncedFunc;
};
