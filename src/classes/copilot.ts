import {
  COMPLETION_PROVIDER_MODEL_MAP,
  DEFAULT_COMPLETION_MODEL,
  DEFAULT_COMPLETION_PROVIDER,
} from '../constants';
import {ErrorContext, handleError} from '../error';
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
} from '../types';
import {HTTP, joinWithAnd} from '../utils';

/**
 * Copilot class for handling completions using various AI providers.
 */
export class Copilot {
  private readonly apiKey: string;
  private readonly provider: CompletionProvider;
  private readonly model: CompletionModel;

  /**
   * Initializes the Copilot with an API key and optional configuration.
   * @param apiKey - The API key for the chosen provider.
   * @param options - Options for configuring the Copilot instance.
   */
  constructor(apiKey: string, options: CopilotOptions = {}) {
    this.validateInputs(apiKey, options);

    this.apiKey = apiKey;
    this.provider = options.provider ?? DEFAULT_COMPLETION_PROVIDER;
    this.model = options.model ?? DEFAULT_COMPLETION_MODEL;
  }

  /**
   * Sends a completion request to the API and returns the completion.
   * @param params - The metadata required to generate the completion.
   * @returns A promise resolving to the completed text snippet or an error.
   */
  public async complete({
    body,
    options,
  }: CompletionRequest): Promise<CompletionResponse> {
    const {completionMetadata} = body;
    const {headers: customHeaders = {}} = options ?? {};

    try {
      const requestBody = createRequestBody(
        completionMetadata,
        this.model,
        this.provider,
      );

      const endpoint = getProviderCompletionEndpoint(this.provider);
      const providerHeaders = createProviderHeaders(this.apiKey, this.provider);
      const mergedHeaders = {...customHeaders, ...providerHeaders};

      const chatCompletion = await HTTP.POST<
        ChatCompletion,
        ChatCompletionCreateParams
      >(endpoint, requestBody, {headers: mergedHeaders});

      return parseProviderChatCompletion(chatCompletion, this.provider);
    } catch (error) {
      const errorDetails = handleError(
        error,
        ErrorContext.COPILOT_COMPLETION_FETCH,
      );
      return {error: errorDetails.message, completion: null};
    }
  }

  private validateInputs(
    apiKey: string | undefined,
    options: CopilotOptions,
  ): void {
    if (!apiKey) {
      throw new Error(
        `Please provide ${this.provider ?? DEFAULT_COMPLETION_PROVIDER} API key.`,
      );
    }

    const {provider, model} = options;

    if ((provider && !model) || (!provider && model)) {
      throw new Error('Both provider and model must be specified together');
    }

    const selectedProvider = provider ?? DEFAULT_COMPLETION_PROVIDER;
    const selectedModel = model ?? DEFAULT_COMPLETION_MODEL;

    if (
      !COMPLETION_PROVIDER_MODEL_MAP[selectedProvider].includes(selectedModel)
    ) {
      const supportedModels = joinWithAnd(
        COMPLETION_PROVIDER_MODEL_MAP[selectedProvider],
      );
      throw new Error(
        `Model ${selectedModel} is not supported by ${selectedProvider} provider. Supported models: ${supportedModels}`,
      );
    }
  }
}
