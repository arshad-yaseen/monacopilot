import {Theme} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import {
  EndpointType,
  ExternalContextType,
  FilenameType,
  FrameworkType,
} from './editor-props';

export type EditorOptionsType = monaco.editor.IEditorOptions;
export type EditorType = monaco.editor.IStandaloneCodeEditor;
export type EditorModelType = monaco.editor.ITextModel;
export type EditorPositionType = monaco.IPosition;
export type EditorRangeType = monaco.IRange;
export type EditorInlineCompletionType = monaco.languages.InlineCompletion;
export type EditorThemeData = monaco.editor.IStandaloneThemeData;
export type EditorBuiltInTheme = Theme;

export interface FetchCompletionItemParams {
  code: string;
  language: string;
  endpoint: EndpointType;
  filename: FilenameType | undefined;
  framework: FrameworkType | undefined;
  externalContext: ExternalContextType | undefined;
  model: EditorModelType;
  position: EditorPositionType;
  token: monaco.CancellationToken;
}
