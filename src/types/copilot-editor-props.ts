import type {EditorProps as MonacoEditorProps} from '@monaco-editor/react';

import type {EditorBuiltInTheme} from './common';

/**
 * Themes available for the Monacopilot
 */
// This theme type is generated automatically from the themes folder.
// Do not modify this type manually.
// If you want to add a new theme, you can add it to the themes folder and run `generate-themes` script.
// The script will automatically update this type.
type CustomTheme =
  | 'codesandbox-dark'
  | 'dracula-soft'
  | 'dracula'
  | 'github-dark-dimmed'
  | 'github-dark'
  | 'github-light'
  | 'monokai'
  | 'nord'
  | 'one-dark-pro-darker'
  | 'one-monokai';

export type Theme = EditorBuiltInTheme | CustomTheme;
export type Endpoint = string;
export type Filename = string;
export type Technologies = string[];
export type CompletionSpeed = 'little-faster' | 'normal';
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

export default interface CopilotEditorProps extends MonacoEditorProps {
  /**
   * The name of the file you are editing. This is used to provide more relevant completions based on the file's purpose.
   * For example, if you are editing a file named `utils.js`, the completions will be more relevant to utility functions.
   */
  filename?: Filename;
  /**
   * The API endpoint where you started the completion service.
   * [Learn more](https://monacopilot.vercel.app/docs/guide/copilot-setup#integrating-copilot-to-the-editor)
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
   * The theme you want to use for the editor.
   */
  theme?: Theme;
  /**
   * Controls the speed of the completion.
   * Set to `little-faster` for slightly faster completions. Note that this option has a high cost, though not exorbitant.
   * For a detailed cost comparison, see the [cost overview table](https://monacopilot.vercel.app/docs/copilot-cost-overview).
   * @default 'normal'
   */
  completionSpeed?: CompletionSpeed;
  /**
   * Helps to give more relevant completions based on the full context.
   * You can include things like the contents/codes of other files in the same workspace.
   */
  externalContext?: ExternalContext;
}
