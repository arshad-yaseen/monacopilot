import type {
    BaseCopilotMetadata,
    CustomPrompt,
    Endpoint,
    Filename,
    RelatedFile,
    Technologies,
} from '@monacopilot/core';

import {FetchCompletionItemHandler} from './internal';
import type {
    CursorPosition,
    EditorCancellationToken,
    EditorModel,
    EditorRange,
    Monaco,
} from './monaco';

export type CompletionMetadata = BaseCopilotMetadata;

export interface RegisterCompletionOptions {
    /**
     * Language of the current model
     */
    language: string;
    /**
     * The API endpoint where you started the completion service.
     */
    endpoint: Endpoint;
    /**
     * Specifies when the completion service should provide code completions.
     *
     * Options:
     * - `'onIdle'`: Provides completions after a brief pause in typing.
     * - `'onTyping'`: Provides completions in real-time as you type.
     *   - *Consideration:* May initiate additional background requests to deliver real-time suggestions.
     * - `'onDemand'`: Completions are not provided automatically. You need to trigger the completion manually, possibly by using the `trigger` function from `registerCompletion` return.
     *
     * @default 'onIdle'
     */
    trigger?: Trigger;
    /**
     * The name of the file you are editing. This is used to provide more relevant completions based on the file's purpose.
     * For example, if you are editing a file named `utils.js`, the completions will be more relevant to utility functions.
     */
    filename?: Filename;
    /**
     * The technologies (libraries, frameworks, etc.) you want to use for the completion.
     * This can provide technology-specific completions.
     * If you don't specify a technology, the completion will be specific to the language (provided as the `language`).
     *
     * @example
     * ['react', 'nextjs', 'tailwindcss', 'tanstack/react-query']
     * ['tensorflow', 'keras', 'numpy', 'pandas']
     * etc.
     */
    technologies?: Technologies;
    /**
     * Helps to give more relevant completions based on the full context.
     * You can include things like the contents/codes of other files in the same workspace.
     */
    relatedFiles?: RelatedFile[];
    /**
     * The maximum number of lines of code to include in the completion request.
     * This limits the request size to the model to prevent `429 Too Many Requests` errors
     * and reduce costs for long code.
     *
     * @default 100
     */
    maxContextLines?: number;
    /**
     * Determines if completions should be cached.
     * Enabling caching can enhance performance by reusing previous results when the cursor position and context remain the same while editing.
     * @default true
     */
    enableCaching?: boolean;
    /**
     * When an error occurs during the completion process or requests, Monacopilot will log it to the console by default
     * rather than throwing errors. This ensures smooth editing even when completions are unavailable.
     * You can provide this callback to handle errors yourself, which will disable the default console logging.
     * @param error - The error object containing information about the encountered error.
     */
    onError?: (error: Error) => void;
    /**
     * Custom fetch completion handler. This function overrides the default fetch completion handler.
     * It allows you to customize how completion requests are made and responses are processed.
     * You can implement your own logic for fetching and processing completions.
     * The function should return either a string (the completion to be inserted into the editor) or null.
     * @param params - The parameters for the completion request.
     * @param {string} params.endpoint - The endpoint to fetch the completion from.
     * @param {CompletionRequestBody} params.body - The body of the completion request.
     * @returns {Promise<{completion: string | null}>} An object containing the completion or null if no completion is available.
     */
    requestHandler?: FetchCompletionItemHandler;

    /**
     * Callback function that is triggered when a completion is shown in the editor.
     * @param completion - The completion text that is being shown.
     * @param range - The editor range where the completion will be inserted.
     */
    onCompletionShown?: (
        completion: string,
        range: EditorRange | undefined,
    ) => void;

    /**
     * Callback function triggered when a completion is accepted by the user.
     */
    onCompletionAccepted?: () => void;

    /**
     * Callback function triggered when a completion is rejected by the user.
     */
    onCompletionRejected?: () => void;
    /**
     * Optional function to determine whether a completion should be triggered.
     * This allows for custom logic to control when completions are shown.
     *
     * @param {object} params - Parameters for the trigger decision
     * @param {string} params.text - The current text in the editor
     * @param {CursorPosition} params.position - The current cursor position
     * @param {Trigger} params.triggerType - The type of trigger that initiated the completion
     * @returns {boolean} - Return true to allow the completion, false to prevent it
     */
    triggerIf?: (params: {
        text: string;
        position: CursorPosition;
        triggerType: Trigger;
    }) => boolean;
}

export type Trigger = 'onTyping' | 'onIdle' | 'onDemand';

export enum TriggerEnum {
    OnTyping = 'onTyping',
    OnIdle = 'onIdle',
    OnDemand = 'onDemand',
}

export interface CompletionRegistration {
    /**
     * Triggers the completion.
     */
    trigger: () => void;
    /**
     * Deregisters the completion provider and cleans up all associated resources.
     * This should be called when unmounting the editor or when completion features
     * are no longer needed to prevent memory leaks and ensure proper cleanup.
     */
    deregister: () => void;
}

export interface InlineCompletionProcessorParams {
    monaco: Monaco;
    mdl: EditorModel;
    pos: CursorPosition;
    token: EditorCancellationToken;

    isCompletionAccepted: boolean;
    options: RegisterCompletionOptions;
}

export type LocalPredictionSnippets = Record<string, string>;
export interface LocalPrediction {
    language: string;
    snippets: LocalPredictionSnippets;
}

export interface CompletionRequest {
    /**
     * The body of the completion request.
     */
    body: CompletionRequestBody;
    /**
     * Additional options to include in the completion request.
     */
    options?: CompletionRequestOptions;
}

export interface CompletionRequestBody {
    /**
     * The metadata required to generate the completion.
     */
    completionMetadata: CompletionMetadata;
}

export interface CompletionRequestOptions {
    /**
     * Custom headers to include in the request to the LLM provider.
     */
    headers?: Record<string, string>;
    /**
     * Custom prompt generator function for the completion request.
     * This function allows you to override the default prompt
     * used in the completion request, providing more control over the AI's context and behavior.
     *
     * @param completionMetadata - Metadata about the current completion context
     * @returns A partial PromptData object that can override context and/or instruction
     * @see {@link https://github.com/arshad-yaseen/monacopilot/blob/main/packages/monacopilot/src/prompt.ts | Monacopilot default prompt implementation}
     */
    customPrompt?: CustomPrompt<CompletionMetadata>;
}

export interface CompletionResponse {
    /**
     * The completion text.
     */
    completion: string | null;
    /**
     * The error message.
     */
    error?: string;
    /**
     * The raw response from the LLM.
     */
    raw?: unknown;
}
