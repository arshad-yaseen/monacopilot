import type {CompletionModel, CompletionProvider} from './completion';
import {
  CursorPosition,
  EditorCancellationToken,
  EditorModel,
  Monaco,
} from './monaco';

/**
 * Options for configuring the Copilot instance.
 */
export interface CopilotOptions {
  /**
   * The completion provider to use (e.g., 'openai', 'anthropic', 'groq').
   * If not specified, a default provider will be used.
   */
  provider?: CompletionProvider;

  /**
   * The specific model to use for completions.
   * Must be compatible with the chosen provider.
   * If not specified, a default model will be used.
   */
  model?: CompletionModel;

  /**
   * Additional headers to include in all Copilot API requests.
   * This can be used to pass custom authentication or other provider-specific headers.
   */
  headers?: Record<string, string>;
}

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
}[];

export interface RegisterCopilotOptions {
  /**
   * Language of the current model
   */
  language: string;
  /**
   * The API endpoint where you started the completion service.
   */
  endpoint: Endpoint;
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
  externalContext?: ExternalContext;
}
export interface CopilotRegistration {
  /**
   * Deregisters the Copilot from the Monaco editor.
   * This should be called when the Copilot is no longer needed.
   */
  deregister: () => void;
}

export interface InlineCompletionHandlerParams {
  monaco: Monaco;
  model: EditorModel;
  position: CursorPosition;
  token: EditorCancellationToken;

  isCompletionAccepted: boolean;
  onShowCompletion: () => void;
  options: RegisterCopilotOptions;
}
