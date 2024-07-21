import {Copilot} from './classes';
import {registerCopilot} from './copilot/register';
import type {
  CompletionRequest,
  CompletionResponse,
  Monaco,
  RegisterCopilotOptions,
  StandaloneCodeEditor,
} from './types';

export {registerCopilot, Copilot};

export type {
  Monaco,
  StandaloneCodeEditor,
  RegisterCopilotOptions,
  CompletionRequest,
  CompletionResponse,
};
