import {type EditorProps as MonacoEditorProps} from '@monaco-editor/react';

import frameworks from '../constants/frameworks';
import {EditorBuiltInTheme} from './common';

export type EndpointType = string;
export type FilenameType = string;
export type FrameworkType = (typeof frameworks)[number];
export type CompletionSpeedType = 'little-faster' | 'normal';
export type ExternalContextType = Array<{
  /**
   * The relative path from the current editing file to an external file.
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
}>;

/**
 * Themes available for the Rich Monaco Editor.
 */
// This theme type is generated automatically from the themes folder.
// Do not modify this type manually.
// If you want to add a new theme, you can add it to the themes folder and run `generate-themes` script.
// The script will automatically update this type.
export type ThemeType =
  | 'codesandbox-dark'
  | 'github-dark-dimmed'
  | 'github-dark'
  | 'github-light'
  | 'monokai';

export default interface EditorProps extends MonacoEditorProps {
  /**
   * The name of the file you are editing. This is used to provide more relevant completions based on the file's purpose.
   * For example, if you are editing a file named `utils.js`, the completions will be more relevant to utility functions.
   */
  filename?: FilenameType;
  /**
   * The API endpoint where you started the completion service.
   * [Learn more](https://monacopilot.vercel.app/docs/guide/copilot-setup#integrating-copilot-to-the-editor)
   */
  endpoint?: EndpointType;
  /**
   * The framework you want to use for the completion.
   * This can provide framework-specific completions.
   * If you don't specify a framework, the completion will be specific to the language (provided as the `language` prop).
   */
  framework?: FrameworkType;
  /**
   * The theme you want to use for the editor.
   */
  theme?: EditorBuiltInTheme | ThemeType;
  /**
   * Controls the speed of the completion.
   * Set to `little-faster` for slightly faster completions. Note that this option has a high cost, though not exorbitant.
   * For a detailed cost comparison, see the [cost overview table](https://monacopilot.vercel.app/docs/copilot-cost-overview).
   * @default 'normal'
   */
  completionSpeed?: CompletionSpeedType;
  /**
   * Helps to give more relevant completions based on the full context.
   * You can include things like the contents/codes of other files in the same workspace.
   */
  externalContext?: ExternalContextType;
}
