import Completion from './classes/completion';
import Editor from './editor';
import type EditorProps from './types/editor-props';
import type {
  CompletionEndpointType,
  FrameworkType,
  ThemeType,
} from './types/editor-props';

export * from '@monaco-editor/react';

export {
  Editor,
  Completion,
  EditorProps,
  ThemeType as Theme,
  CompletionEndpointType,
  FrameworkType,
};
