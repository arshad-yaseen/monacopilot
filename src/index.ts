import {Copilot} from './classes';
import {registerCompletion, registerCopilot} from './core/completion/register';

export {registerCopilot, registerCompletion, Copilot};

export type {
  Monaco,
  StandaloneCodeEditor,
  RegisterCompletionOptions,
  CompletionRegistration,
  CopilotOptions,
  CustomCopilotModel,
  CustomCopilotModelConfig,
  CustomCopilotModelTransformResponse,
  CompletionMetadata,
  CompletionRequest,
  CompletionRequestBody,
  CompletionRequestOptions,
  CopilotProvider,
  CopilotModel,
} from './types';
