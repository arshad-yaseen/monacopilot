import {Copilot} from './classes';
import {registerCompletion, registerCopilot} from './core/completion/register';
import {registerSelectAndModify} from './core/modify/register';

export {registerCopilot, registerCompletion, registerSelectAndModify, Copilot};

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
