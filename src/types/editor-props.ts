import {type EditorProps as MonacoEditorProps} from '@monaco-editor/react';

import frameworks from '../constants/frameworks';

export type EndpointType = string;
export type FrameworkType = (typeof frameworks)[number];
export type CompletionSpeedType = 'slow' | 'normal' | 'fast';

export default interface EditorProps extends MonacoEditorProps {
  /**
   * The API endpoint where you started the completion service.
   * [Learn more](https://rich-monaco-editor.vercel.app/docs/getting-started#endpoint)
   */
  endpoint?: EndpointType;
  /**
   * The framework you want to use for the completion.
   * This can provide framework-specific completions.
   * If you don't specify a framework, the completion will be specific to the language (provided as the `language` prop).
   * [Learn more](https://rich-monaco-editor.vercel.app/docs/getting-started#framework)
   */
  framework?: FrameworkType;
  /**
   * Defines the completion speed with different cost-effectiveness and speed trade-offs:
   * - 'slow': Most cost-effective but slowest.
   * - 'normal': Balances cost and speed (default).
   * - 'fast': Increases speed and cost.
   * Learn more about cost differences and details at:
   * [Completion Speed Documentation](https://rich-monaco-editor.vercel.app/docs/getting-started#completion-speed)
   * @default 'normal'
   */
  completionSpeed?: CompletionSpeedType;
}
