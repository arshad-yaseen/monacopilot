import {registerCompletion} from 'core/completion/register';
import {Copilot} from 'core/copilot/instance';

export {registerCompletion, Copilot};

export type {Monaco, StandaloneCodeEditor} from 'types/monaco';

export type {
    CopilotOptions,
    CustomCopilotModel,
    CustomCopilotModelConfig,
    CustomCopilotModelTransformResponse,
} from 'types/copilot';

export type {
    CompletionMetadata,
    CompletionRequest,
    CompletionRequestBody,
    CompletionRequestOptions,
    RegisterCompletionOptions,
    CompletionRegistration,
} from 'types/completion';

export type {
    Provider,
    Model,
    OpenAIModel,
    GroqModel,
    AnthropicModel,
    GoogleModel,
    DeepSeekModel,
    OpenAIChatCompletion,
    DeepSeekChatCompletion,
    GroqChatCompletion,
    AnthropicChatCompletion,
} from 'types/ai';
