import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

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
export type EditorDeltaDecoration = monaco.editor.IModelDeltaDecoration;
export type EditorDecorationsCollection =
  monaco.editor.IEditorDecorationsCollection;
export type EditorDecorationOptions = monaco.editor.IModelDecorationOptions;
