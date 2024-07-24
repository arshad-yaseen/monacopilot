import {Copilot} from './classes';
import {registerCopilot} from './copilot/register';
import type {
  CompletionRequest,
  CompletionResponse,
  CopilotOptions,
  CopilotRegistration,
  Monaco,
  RegisterCopilotOptions,
  StandaloneCodeEditor,
} from './types';

export {registerCopilot, Copilot};

export type {
  Monaco,
  StandaloneCodeEditor,
  RegisterCopilotOptions,
  CopilotRegistration,
  CopilotOptions,
  CompletionRequest,
  CompletionResponse,
};
