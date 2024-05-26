import Copilot from './classes/copilot';
import Editor from './editor';
import type {CompletionRequest, CompletionResponse} from './types/completion';
import type EditorProps from './types/editor-props';
import type {Endpoint, Technologies, Theme} from './types/editor-props';

export * from '@monaco-editor/react';

export {
  Editor,
  EditorProps,
  Theme,
  Endpoint,
  Technologies,
  Copilot,
  CompletionRequest,
  CompletionResponse,
};
