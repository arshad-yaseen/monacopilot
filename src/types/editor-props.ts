import {type EditorProps as MonacoEditorProps} from '@monaco-editor/react';

import frameworks from '../constants/frameworks';
import {EditorBuiltInTheme} from './common';

export type EndpointType = string;
export type FrameworkType = (typeof frameworks)[number];
export type CompletionSpeedType = 'little-faster' | 'normal';

/**
 * Themes available for the Rich Monaco Editor.
 */
// This theme type is generated automatically from the themes folder.
// Do not modify this type manually.
// If you want to add a new theme, you can add it to the themes folder and run `generate-themes` script.
// The script will automatically update this type.
export type ThemeType = 'codesandbox-dark' | 'github-dark-dimmed' | 'github-dark' | 'github-light' | 'monokai';

export default interface EditorProps extends MonacoEditorProps {
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
}
