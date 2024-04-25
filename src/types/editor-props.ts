import {type EditorProps as MonacoEditorProps} from '@monaco-editor/react';

import frameworks from '../constants/frameworks';
import {EditorBuiltInTheme} from './common';

export type CompletionEndpointType = string;
export type FrameworkType = (typeof frameworks)[number];

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
  | 'chrome-devtools'
  | 'clouds-midnight'
  | 'clouds'
  | 'cobalt'
  | 'cobalt2'
  | 'dawn'
  | 'dominion-day'
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
   * [Learn more](https://rich-monaco-editor.vercel.app/docs/getting-started#endpoint)
   */
  completionEndpoint?: CompletionEndpointType;
  /**
   * The framework you want to use for the completion.
   * This can provide framework-specific completions.
   * If you don't specify a framework, the completion will be specific to the language (provided as the `language` prop).
   * [Learn more](https://rich-monaco-editor.vercel.app/docs/getting-started#framework)
   */
  framework?: FrameworkType;
  /**
   * The theme you want to use for the editor.
   * You can play with the themes [here](https://rich-monaco-editor.vercel.app/themes).
   */
  theme?: EditorBuiltInTheme | ThemeType;
}
