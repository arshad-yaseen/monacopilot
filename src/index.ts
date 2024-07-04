import {Copilot} from './classes';
import MonaCopilot from './monacopilot';
import type {
  CompletionRequest,
  CompletionResponse,
  Endpoint,
  MonaCopilotProps,
  Technologies,
} from './types';

// Export everything from `@monaco-editor/react` except `Editor`, `EditorProps`, and `Theme`
// We have our own `Editor` as `MonaCopilot` and `EditorProps` as `MonaCopilotProps`.
export {
  type BeforeMount,
  type DiffBeforeMount,
  type DiffEditorProps,
  type DiffOnMount,
  type Monaco,
  type MonacoDiffEditor,
  type OnChange,
  type OnMount,
  type OnValidate,
  type Theme,
  DiffEditor,
  useMonaco,
  loader,
} from '@monaco-editor/react';

export {
  MonaCopilot as default,
  MonaCopilotProps,
  Endpoint,
  Technologies,
  Copilot,
  CompletionRequest,
  CompletionResponse,
};
