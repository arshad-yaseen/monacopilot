export type Awaitable<T> = T | Promise<T>;

export type CopilotAIRequestResponse = {
    text: string | null;
    raw?: unknown;
    error?: string;
};
