import {Copilot} from './classes';
import {registerCompletion, registerCopilot} from './core/completion/register';
import {registerSelectionActions} from './core/selection-actions/register';
import {buildContext} from './helpers/context';

export {
  registerCopilot,
  registerCompletion,
  registerSelectionActions,
  buildContext,
  Copilot,
};

export type {
  Monaco,
  StandaloneCodeEditor,
  RegisterCompletionOptions,
  CompletionRegistration,
  Context,
  CopilotOptions,
  CustomCopilotModel,
  CustomCopilotModelConfig,
  CustomCopilotModelTransformResponse,
  CompletionMetadata,
  CompletionApiRequest,
  CompletionApiRequestBody,
  CompletionApiRequestOptions,
  CopilotProvider,
  CopilotModel,
} from './types';
