import {PromptData} from './copilot';
import {
  CursorPosition,
  EditorCancellationToken,
  EditorModel,
  EditorRange,
} from './monaco';

export type Endpoint = string;
export type Filename = string;
export type Technologies = string[];
export type ExternalContext = {
  /**
   * The relative path from the current editing code in the editor to an external file.
   *
   * Examples:
   * - To include a file `utils.js` in the same directory, set as `./utils.js`.
   * - To include a file `utils.js` in the parent directory, set as `../utils.js`.
   * - To include a file `utils.js` in the child directory, set as `./child/utils.js`.
   */
  path: string;

  /**
   * The content of the external file as a string.
   */
  content: string;
};

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
   * - `'onIdle'`: The completion service provides completions after a brief pause in typing.
   * - `'onTyping'`: The completion service offers completions in real-time as you type.
   *   - *Note:* Best suited for models with low response latency (e.g., Groq).
   *   - *Consideration:* May initiate additional background requests to deliver real-time suggestions.
   *
   * @default 'onIdle'
   */
  trigger?: 'onTyping' | 'onIdle';
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
  externalContext?: ExternalContext[];
  /**
   * The maximum number of lines of code to include in the completion request.
   * This limits the request size to the model to prevent `429 Too Many Requests` errors
   * and reduce costs for long code.
   *
   * It is recommended to set `maxContextLines` to `120` or less if you are using `Groq` as your provider,
   * since `Groq` does not implement pay-as-you-go pricing and has only low rate limits.
   */
  maxContextLines?: number;
}

export enum TriggerType {
  OnTyping = 'onTyping',
  OnIdle = 'onIdle',
}

export interface CompletionRegistration {
  /**
   * Deregisters the completion from the Monaco editor.
   * This should be called when the completion is no longer needed.
   */
  deregister: () => void;
}

export interface InlineCompletionHandlerParams {
  mdl: EditorModel;
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
   * Additional headers to include in the provider's completion requests.
   */
  headers?: Record<string, string>;
  /**
   * Custom prompt generator function for the completion request.
   * This function allows you to override the default system and user prompts
   * used in the completion request, providing more control over the AI's context and behavior.
   *
   * @param completionMetadata - Metadata about the current completion context
   * @returns An object containing custom 'system' and 'user' prompts
   */
  customPrompt?: CustomPrompt;
}

export type CustomPrompt = (
  completionMetadata: CompletionMetadata,
) => Partial<PromptData>;

export interface CompletionResponse {
  completion: string | null;
  error?: string;
}

export type CompletionMode = 'insert' | 'complete' | 'continue';

export interface CompletionMetadata {
  /**
   * The programming language of the code.
   */
  language: string | undefined;
  /**
   * The name of the file being edited.
   */
  filename: Filename | undefined;
  /**
   * The technologies used in the completion.
   */
  technologies: Technologies | undefined;
  /**
   * Additional context from related files.
   */
  externalContext: ExternalContext[] | undefined;
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
    /**
     * The mode of the completion.
     * - `fill-in-the-middle`: Indicates that the cursor is positioned within the existing text. In this mode, the AI will generate content to be inserted at the cursor position.
     * - `completion`: Indicates that the cursor is at the end of the existing text. In this mode, the AI will generate content to continue or complete the text from the cursor position.
     */
    completionMode: CompletionMode;
  };
}

export interface FetchCompletionItemParams {
  text: string;
  language: string;
  endpoint: Endpoint;
  filename?: Filename;
  technologies?: Technologies;
  externalContext?: ExternalContext[];
  maxContextLines?: number;
  mdl: EditorModel;
  pos: CursorPosition;
}

export interface CompletionCacheItem {
  completion: string;
  range: EditorRange;
  textBeforeCursorInLine: string;
}
