import {Monaco} from './common';
import type {CompletionModel} from './completion';
import {
  EditorCancellationToken,
  EditorInlineCompletionContext,
  EditorModel,
  EditorPosition,
  StandaloneCodeEditor,
} from './editor';
import {
  Endpoint,
  ExternalContext,
  Filename,
  Technologies,
} from './monacopilot-props';

export interface CopilotOptions {
  model: CompletionModel | undefined;
}

export interface RegisterCopilotParams {
  monaco: Monaco;
  editor: StandaloneCodeEditor;
  endpoint: Endpoint;
  language: string;
  filename?: Filename;
  technologies?: Technologies;
  externalContext?: ExternalContext;
}

export interface InlineCompletionHandlerParams {
  monaco: Monaco;
  model: EditorModel;
  position: EditorPosition;
  context: EditorInlineCompletionContext;
  token: EditorCancellationToken;
  hasCompletionBeenAccepted: boolean;
  onShowCompletion: () => void;
  options: Omit<RegisterCopilotParams, 'monaco' | 'editor'>;
}
