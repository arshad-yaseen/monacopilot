import {type EditorProps as MonacoEditorProps} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import frameworks from '../constants/frameworks';

export type EditorOptionsType = monaco.editor.IEditorOptions;
export type EditorType = monaco.editor.IStandaloneCodeEditor;
export type EditorModelType = monaco.editor.ITextModel;
export type EditorPositionType = monaco.IPosition;
export type EditorRangeType = monaco.IRange;
export type EditorInlineCompletionType = monaco.languages.InlineCompletion;

export type EndpointType = string;
export type FrameworkType = (typeof frameworks)[number];

export interface EditorProps extends MonacoEditorProps {
  /**
   * Language of the current model.
   */
  language: string;
  /**
   * The API endpoint where you started the completion service.
   * [Learn more](https://ai-monaco-editor.vercel.app/docs/getting-started#endpoint)
   */
  endpoint: EndpointType;
  /**
   * The framework you want to use for the completion.
   * This can provide framework-specific completions.
   * If you don't specify a framework, the completion will be specific to the language (provided as the `language` prop).
   * [Learn more](https://ai-monaco-editor.vercel.app/docs/getting-started#framework)
   */
  framework?: FrameworkType;
}
