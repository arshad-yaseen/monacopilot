import Copilot from './classes/core/copilot';
import MonaCopilot from './monacopilot';
import type {CompletionRequest, CompletionResponse} from './types/completion';
import type MonaCopilotProps from './types/monacopilot-props';
import type {Endpoint, Technologies, Theme} from './types/monacopilot-props';

// Export everything from `@monaco-editor/react` except `Editor`, `EditorProps`, and `Theme`
// We have our own `Editor` as `MonaCopilot` and `EditorProps` as `MonaCopilotProps`
// We have our own `Theme` exported.
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
  DiffEditor,
  useMonaco,
  loader,
} from '@monaco-editor/react';

export {
  MonaCopilot as default,
  MonaCopilotProps,
  Theme,
  Endpoint,
  Technologies,
  Copilot,
  CompletionRequest,
  CompletionResponse,
};
