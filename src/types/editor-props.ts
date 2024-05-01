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
export type ThemeType =
  | 'active4d'
  | 'all-hallows-eve'
  | 'amy'
  | 'birds-of-paradise'
  | 'blackboard'
  | 'brilliance-black'
  | 'brilliance-dull'
  | 'chrome-devtools'
  | 'clouds-midnight'
  | 'clouds'
  | 'cobalt'
  | 'cobalt2'
  | 'dawn'
  | 'dracula'
  | 'dreamweaver'
  | 'eiffel'
  | 'espresso-libre'
  | 'github-dark'
  | 'github-light'
  | 'github'
  | 'idle'
  | 'idlefingers'
  | 'iplastic'
  | 'katzenmilch'
  | 'krtheme'
  | 'kuroir-theme'
  | 'lazy'
  | 'magicwb-amiga'
  | 'merbivore-soft'
  | 'merbivore'
  | 'monoindustrial'
  | 'monokai-bright'
  | 'monokai'
  | 'night-owl'
  | 'nord'
  | 'oceanic-next'
  | 'pastels-on-dark'
  | 'slush-and-poppies'
  | 'solarized-dark'
  | 'solarized-light'
  | 'spacecadet'
  | 'sunburst'
  | 'textmate-mac-classic'
  | 'tomorrow-night-blue'
  | 'tomorrow-night-bright'
  | 'tomorrow-night-eighties'
  | 'tomorrow-night'
  | 'tomorrow'
  | 'twilight'
  | 'upstream-sunburst'
  | 'vibrant-ink'
  | 'xcode-default'
  | 'zenburnesque';

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
