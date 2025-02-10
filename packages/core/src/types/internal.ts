import type {CustomPrompt} from './copilot';
import type {PickChatCompletion, Provider} from './llm';

export type CopilotResponse<P extends Provider> = {
    text: string | null;
    raw?: PickChatCompletion<P>;
    error?: string;
};

export type MakeAIRequestOptions<Meta> = {
    customPrompt?: CustomPrompt<Meta>;
    customHeaders?: Record<string, string>;
};
