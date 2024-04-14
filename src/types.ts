import type {EditorProps as MonacoEditorProps} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

export type EditorOptions = monaco.editor.IEditorOptions;
export interface EditorProps extends MonacoEditorProps {
  provider?: CompletionProviderType;
  model?: CompletionModelType;
  apiKey?: string;
}

export type CodeEditorType = monaco.editor.IStandaloneCodeEditor;

export type CompletionProviderType = 'anthropic';
export type CompletionModelType = 'claude-3-haiku-20240307';
