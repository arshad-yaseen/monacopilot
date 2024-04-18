import {type EditorProps as MonacoEditorProps} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import frameworks from '../constants/frameworks';

export type EditorOptions = monaco.editor.IEditorOptions;
export type EditorType = monaco.editor.IStandaloneCodeEditor;
export type EditorModel = monaco.editor.ITextModel;
export type EditorPosition = monaco.IPosition;

export type Endpoint = string;
export type Framework = (typeof frameworks)[number];

export interface EditorProps extends MonacoEditorProps {
  /**
   * Language of the current model.
   */
  language: string;
  /**
   * The API endpoint where you started the completion server.
   * [Learn more](https://ai-monaco-editor.vercel.app/docs/getting-started#endpoint)
   */
  endpoint: Endpoint;
  /**
   * The framework you want to use for the completion.
   * This can provide framework-specific completions.
   * If you don't specify a framework, the completion will be specific to the language (provided as the `language` prop).
   * [Learn more](https://ai-monaco-editor.vercel.app/docs/getting-started#framework)
   */
  framework?: Framework;
}
