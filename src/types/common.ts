import {Theme} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

export type EditorOptions = monaco.editor.IEditorOptions;
export type StandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
export type EditorModel = monaco.editor.ITextModel;
export type EditorPosition = monaco.IPosition;
export type EditorRange = monaco.IRange;
export type EditorInlineCompletion = monaco.languages.InlineCompletion;
export type EditorThemeData = monaco.editor.IStandaloneThemeData;
export type EditorBuiltInTheme = Theme;
export type EditorCompletionCancellationToken = monaco.CancellationToken;
