import {Theme} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import {ALL_BRACKETS} from '../constants';

export type EditorOptions = monaco.editor.IEditorOptions;
export type StandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
export type EditorModel = monaco.editor.ITextModel;
export type EditorPosition = monaco.IPosition;
export type EditorRange = monaco.IRange;
export type EditorInlineCompletion = monaco.languages.InlineCompletion;
export type EditorThemeData = monaco.editor.IStandaloneThemeData;
export type EditorBuiltInTheme = Theme;
export type EditorCancellationToken = monaco.CancellationToken;
export type EditorInlineCompletionContext =
  monaco.languages.InlineCompletionContext;
export type EditorInlineCompletionsResult =
  monaco.languages.InlineCompletions<monaco.languages.InlineCompletion>;

// Misc
export type Bracket = (typeof ALL_BRACKETS)[number];
