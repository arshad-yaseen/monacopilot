import Copilot from './classes/copilot';
import CopilotEditor from './copilot-editor';
import type {CompletionRequest, CompletionResponse} from './types/completion';
import type CopilotEditorProps from './types/copilot-editor-props';
import type {Endpoint, Technologies, Theme} from './types/copilot-editor-props';

// Export everything from `@monaco-editor/react` except `Editor`, `EditorProps`, and `Theme`
// We have our own `Editor` as `CopilotEditor` and `EditorProps` as `CopilotEditorProps`
// We have our own `Theme` exported.
export type {
  BeforeMount,
  DiffBeforeMount,
  DiffEditor,
  DiffEditorProps,
  DiffOnMount,
  Monaco,
  MonacoDiffEditor,
  OnChange,
  OnMount,
  OnValidate,
  useMonaco,
  loader,
} from '@monaco-editor/react';

export {CopilotEditor as default};

export {
  CopilotEditorProps,
  Theme,
  Endpoint,
  Technologies,
  Copilot,
  CompletionRequest,
  CompletionResponse,
};
