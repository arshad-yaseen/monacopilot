import {Copilot} from './classes';
import {registerCompletion, registerCopilot} from './core/completion/register';
import {registerSelectionActions} from './core/selection-actions/register';

export {registerCopilot, registerCompletion, registerSelectionActions, Copilot};

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
