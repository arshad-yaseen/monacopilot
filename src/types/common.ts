import {Theme} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import {
  Endpoint,
  ExternalContext,
  Filename,
  Technologies,
} from './editor-props';

export type EditorOptions = monaco.editor.IEditorOptions;
export type StandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
export type EditorModel = monaco.editor.ITextModel;
export type EditorPosition = monaco.IPosition;
export type EditorRange = monaco.IRange;
export type EditorInlineCompletion = monaco.languages.InlineCompletion;
export type EditorThemeData = monaco.editor.IStandaloneThemeData;
export type EditorBuiltInTheme = Theme;

export interface FetchCompletionItemParams {
  code: string;
  language: string;
  endpoint: Endpoint;
  filename: Filename | undefined;
  technologies: Technologies | undefined;
  externalContext: ExternalContext | undefined;
  model: EditorModel;
  position: EditorPosition;
  token: monaco.CancellationToken;
}
