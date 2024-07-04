import type {EditorProps as MonacoEditorProps} from '@monaco-editor/react';

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

export default interface MonaCopilotProps extends MonacoEditorProps {
  /**
   * The name of the file you are editing. This is used to provide more relevant completions based on the file's purpose.
   * For example, if you are editing a file named `utils.js`, the completions will be more relevant to utility functions.
   */
  filename?: Filename;
  /**
   * The API endpoint where you started the completion service.
   * [Learn more](https://monacopilot.vercel.app/copilot/setup#integrating-copilot-to-the-editor)
   */
  endpoint?: Endpoint;
  /**
   * The technologies (libraries, frameworks, etc.) you want to use for the completion.
   * This can provide technology-specific completions.
   * If you don't specify a technology, the completion will be specific to the language (provided as the `language` prop).
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
