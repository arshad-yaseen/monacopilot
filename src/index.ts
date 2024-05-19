import Copilot from './classes/copilot';
import Editor from './editor';
import type EditorProps from './types/editor-props';
import type {
  EndpointType,
  TechnologiesType,
  ThemeType,
} from './types/editor-props';

export * from '@monaco-editor/react';

export {
  Editor,
  Copilot,
  EditorProps,
  ThemeType as Theme,
  EndpointType,
  TechnologiesType,
};
