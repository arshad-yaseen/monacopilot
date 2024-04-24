import {type EditorProps as MonacoEditorProps} from '@monaco-editor/react';

import frameworks from '../constants/frameworks';
import themes from '../themes';
import {EditorBuiltInTheme} from './common';

export type CompletionEndpointType = string;
export type FrameworkType = (typeof frameworks)[number];
export type ThemeType = keyof typeof themes;

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
