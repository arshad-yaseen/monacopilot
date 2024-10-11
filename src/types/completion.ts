import {Context} from './context';
import {CustomPrompt} from './copilot';
import {
  CursorPosition,
  EditorCancellationToken,
  EditorModel,
  EditorRange,
  StandaloneCodeEditor,
} from './monaco';

export type Endpoint = string;

export interface RegisterCompletionOptions {
  /**
   * The API endpoint to fetch the completion item from.
   */
  endpoint: Endpoint;
  /**
   * The context object containing contextual information for generating relevant completions.

   * This object is created by the `buildContext` function from monacopilot.
   * It helps tailor completions to the specific project environment and coding context.
   */
  context: Context;
  /**
   * Specifies when the completion service should provide code completions.
   *
   * Options:
   * - `'onIdle'`: Provides completions after a brief pause in typing.
   * - `'onTyping'`: Provides completions in real-time as you type.
   *   - *Note:* Best suited for models with low response latency (e.g., Groq).
   *   - *Consideration:* May initiate additional background requests to deliver real-time suggestions.
   * - `'onDemand'`: Completions are not provided automatically. You need to trigger the completion manually, possibly by using the `trigger` function from `registerCompletion` return.
   *
   * @default 'onIdle'
   */
  trigger?: 'onTyping' | 'onIdle' | 'onDemand';
  /**
   * Callback function that is called when an error occurs during the completion request.
   * This function allows you to handle errors gracefully and provide appropriate feedback to the user.
   * @param error - The error object containing information about the encountered error.
   */
  onError?: OnError;
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
}

export type OnError = (error: Error) => void;

export enum TriggerType {
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
   * Deregisters the completion from the Monaco editor.
   * This should be called when the completion is no longer needed.
   */
  deregister: () => void;
}

export interface InlineCompletionHandlerParams {
  mdl: EditorModel;
  editor: StandaloneCodeEditor;
  pos: CursorPosition;
  token: EditorCancellationToken;

  isCompletionAccepted: boolean;
  onShowCompletion: () => void;
  options: RegisterCompletionOptions;
}

export type LocalPredictionSnippets = Record<string, string>;
export interface LocalPrediction {
  language: string;
  snippets: LocalPredictionSnippets;
}

export interface CompletionApiRequest {
  /**
   * The body of the completion request.
   */
  body: CompletionApiRequestBody;
  /**
   * Additional options to include in the completion request.
   */
  options?: CompletionApiRequestOptions;
}

export interface CompletionApiRequestBody {
  /**
   * The metadata required to generate the completion.
   */
  metadata: CompletionMetadata;
}

export interface CompletionApiRequestOptions {
  /**
   * Custom headers to include in the request to the AI provider.
   */
  headers?: Record<string, string>;
  /**
   * Custom prompt generator function for the completion request.
   * This function allows you to override the default system and user prompts
   * used in the completion request, providing more control over the AI's context and behavior.
   *
   * @param metadata - Metadata about the current completion context
   * @returns An object containing custom 'system' and 'user' prompts
   */
  customPrompt?: CustomPrompt<CompletionMetadata>;
}

export interface CompletionApiResponse {
  completion: string | null;
  error?: string;
}

export type CompletionMode = 'insert' | 'complete' | 'continue';

export interface CompletionMetadata {
  /**
   * The context object containing contextual information for generating relevant completions.
   */
  context?: Context;
  /**
   * The text that appears after the cursor.
   */
  textAfterCursor: string;
  /**
   * The text that appears before the cursor.
   */
  textBeforeCursor: string;
  /**
   * The current cursor position.
   */
  cursorPosition: CursorPosition;
  /**
   * The current state of the editor.
   */
  editorState: {
    completionMode: CompletionMode;
  };
}

export type EditorState = {
  /**
   * The mode of the completion.
   * - `fill-in-the-middle`: Indicates that the cursor is positioned within the existing text. In this mode, the AI will generate content to be inserted at the cursor position.
   * - `completion`: Indicates that the cursor is at the end of the existing text. In this mode, the AI will generate content to continue or complete the text from the cursor position.
   */
  completionMode: CompletionMode;
};

export type FetchCompletionItemHandler = (
  params: FetchCompletionItemParams,
) => Promise<FetchCompletionItemReturn>;

export type FetchCompletionItemReturn = {
  completion: string | null;
};

export interface FetchCompletionItemParams {
  endpoint: string;
  body: CompletionApiRequestBody;
}

export interface ConstructCompletionMetadataParams {
  mdl: EditorModel;
  pos: CursorPosition;
  options: RegisterCompletionOptions;
}

export interface CompletionCacheItem {
  completion: string;
  range: EditorRange;
  textBeforeCursorInLine: string;
}
