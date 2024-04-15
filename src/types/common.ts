import type {EditorProps as MonacoEditorProps} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

export type EditorOptions = monaco.editor.IEditorOptions;
export type CodeEditorType = monaco.editor.IStandaloneCodeEditor;
export type EditorPosition = monaco.IPosition;

export interface EditorProps extends MonacoEditorProps {
  /**
   * Learn more about the `endpoint` prop [here](https://ai-monaco-editor.vercel.app/docs/api/nextjs#endpoint).
   */
  endpoint: string;
}
