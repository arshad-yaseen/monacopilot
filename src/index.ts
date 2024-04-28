import Copilot from './classes/copilot';
import Editor from './editor';
import type EditorProps from './types/editor-props';
import type {
  endpointType,
  FrameworkType,
  ThemeType,
} from './types/editor-props';

export * from '@monaco-editor/react';

export {
  Editor,
  Copilot,
  EditorProps,
  ThemeType as Theme,
  endpointType,
  FrameworkType,
};
