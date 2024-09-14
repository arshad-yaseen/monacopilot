import {
  COMPLETION_PROVIDER_MODEL_MAP,
  DEFAULT_COMPLETION_MODEL,
  DEFAULT_COMPLETION_PROVIDER,
} from '../constants';
import {ErrorContext, handleError} from '../error';
import generatePrompt from '../helpers/prompt';
import {
  createProviderHeaders,
  createRequestBody,
  getProviderCompletionEndpoint,
  parseProviderChatCompletion,
} from '../helpers/provider';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  CompletionModel,
  CompletionProvider,
  CompletionRequest,
  CompletionResponse,
  CopilotOptions,
  CustomModel,
} from '../types';
import {HTTP, joinWithAnd} from '../utils';

/**
 * Copilot class for handling completions using various AI providers.
 */
export class Copilot {
  private readonly apiKey: string;
  private readonly provider: CompletionProvider;
  private readonly model: CompletionModel;
  private readonly customModel?: CustomModel;

  /**
   * Initializes the Copilot with an API key and optional configuration.
   * @param apiKey - The API key for the chosen provider.
   * @param options - Options for configuring the Copilot instance.
   */
  constructor(apiKey: string, options: CopilotOptions = {}) {
    if (!apiKey) {
      throw new Error('Please provide an API key.');
    }

    this.apiKey = apiKey;
    this.provider = options.provider ?? DEFAULT_COMPLETION_PROVIDER;
    this.model = options.model ?? DEFAULT_COMPLETION_MODEL;
    this.customModel = options.customModel;

    this.validateInputs();
  }

  /**
   * Validates the inputs provided to the constructor.
   */
  private validateInputs(): void {
    if (!COMPLETION_PROVIDER_MODEL_MAP[this.provider].includes(this.model)) {
      const supportedModels = joinWithAnd(
        COMPLETION_PROVIDER_MODEL_MAP[this.provider],
      );
      throw new Error(
        `Model "${this.model}" is not supported by the "${this.provider}" provider. Supported models: ${supportedModels}`,
      );
    }
  }

  /**
   * Sends a completion request to the API and returns the completion.
   * @param request - The completion request containing the body and options.
   * @returns A promise resolving to the completion response or an error.
   */
  public async complete(
    request: CompletionRequest,
  ): Promise<CompletionResponse> {
    const {body, options} = request;
    const {completionMetadata} = body;
    const {headers: customHeaders = {}, customPrompt} = options ?? {};

    const customModel = this.customModel;

    const basePrompt = generatePrompt(completionMetadata);
    const prompt = customPrompt
      ? {...basePrompt, ...customPrompt(completionMetadata)}
      : basePrompt;

    let endpoint = getProviderCompletionEndpoint(this.provider);
    let requestBody = createRequestBody(this.model, this.provider, prompt);
    let headers = createProviderHeaders(this.apiKey, this.provider);

    if (customModel) {
      const customModelConfig = customModel.config(this.apiKey, prompt);
      endpoint = customModelConfig.endpoint ?? endpoint;
      requestBody =
        (customModelConfig.body as unknown as ChatCompletionCreateParams) ??
        requestBody;
      headers = {...headers, ...customModelConfig.headers};
    }

    const mergedHeaders = {...headers, ...customHeaders};

    try {
      const chatCompletion = await HTTP.POST<
        ChatCompletion,
        ChatCompletionCreateParams
      >(endpoint, requestBody as ChatCompletionCreateParams, {
        headers: mergedHeaders,
      });

      return customModel
        ? customModel.response(chatCompletion)
        : parseProviderChatCompletion(chatCompletion, this.provider);
    } catch (error) {
      const errorDetails = handleError(
        error,
        ErrorContext.COPILOT_COMPLETION_FETCH,
      );
      return {error: errorDetails.message, completion: null};
    }
  }
}
