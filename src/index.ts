import {registerCompletion} from './core/completion/register';
import {Copilot} from './core/copilot/instance';

export {registerCompletion, Copilot};

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
  Provider,
  Model,
  OpenAIModel,
  GroqModel,
  AnthropicModel,
  OpenAIChatCompletion,
  DeepSeekChatCompletion,
  GroqChatCompletion,
  AnthropicChatCompletion,
} from './types';
