import * as monaco from 'monaco-editor';

export type Monaco = typeof monaco;

export type StandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
export type EditorModel = monaco.editor.ITextModel;
export type CursorPosition = monaco.IPosition;
export type EditorRange = monaco.IRange;
export type EditorInlineCompletion = monaco.languages.InlineCompletion;
export type EditorThemeData = monaco.editor.IStandaloneThemeData;
export type EditorCancellationToken = monaco.CancellationToken;
export type EditorInlineCompletionContext =
  monaco.languages.InlineCompletionContext;
export type EditorInlineCompletionsResult =
  monaco.languages.InlineCompletions<monaco.languages.InlineCompletion>;
export type Disposable = monaco.IDisposable;
