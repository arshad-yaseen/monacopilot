import {Copilot} from './classes';
import {registerCopilot} from './core/register';

export {registerCopilot, Copilot};

export type {
  Monaco,
  StandaloneCodeEditor,
  RegisterCopilotOptions,
  CopilotRegistration,
  CopilotOptions,
  CompletionMetadata,
  CompletionRequest,
  CompletionRequestBody,
  CompletionRequestOptions,
  CompletionProvider,
  CompletionModel,
  CompletionResponse,
} from './types';
