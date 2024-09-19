import {
  COPILOT_PROVIDER_MODEL_MAP,
  COPILOT_PROVIDERS,
  DEFAULT_COPILOT_MODEL,
  DEFAULT_COPILOT_PROVIDER,
} from '../constants';
import {ErrorContext, handleError} from '../error';
import generatePrompt from '../helpers/completion/prompt';
import {
  createProviderHeaders,
  createRequestBody,
  getCopilotProviderEndpoint,
  parseProviderChatCompletion,
} from '../helpers/provider';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  CompletionRequest,
  CompletionResponse,
  CopilotModel,
  CopilotOptions,
  CopilotProvider,
  CustomCopilotModel,
} from '../types';
import {HTTP, joinWithAnd} from '../utils';

export class Copilot {
  private readonly apiKey: string;
  private readonly provider: CopilotProvider;
  private readonly model: CopilotModel | CustomCopilotModel;

  /**
   * Initializes the Copilot instance with an API key and optional configuration.
   * @param apiKey - The API key for the chosen provider.
   * @param options - Optional configuration for the Copilot instance.
   */
  constructor(apiKey: string, options: CopilotOptions = {}) {
    if (!apiKey) {
      throw new Error('Please provide an API key.');
    }

    this.apiKey = apiKey;
    this.provider = options.provider ?? DEFAULT_COPILOT_PROVIDER;
    this.model = options.model ?? DEFAULT_COPILOT_MODEL;

    this.validateInputs();
  }

  /**
   * Validates the inputs provided to the constructor.
   * Ensures the selected model is supported by the provider.
   */
  private validateInputs(): void {
    if (!COPILOT_PROVIDERS.includes(this.provider)) {
      throw new Error(
        `The provider "${this.provider}" is not supported. Please choose a supported provider: ${joinWithAnd(
          COPILOT_PROVIDERS,
        )}. If you're using a custom model, you don't need to specify a provider.`,
      );
    }

    if (
      typeof this.model === 'string' &&
      !COPILOT_PROVIDER_MODEL_MAP[this.provider].includes(this.model)
    ) {
      const supportedModels = joinWithAnd(
        COPILOT_PROVIDER_MODEL_MAP[this.provider],
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

    // Generate the prompt
    const basePrompt = generatePrompt(completionMetadata);
    const prompt = customPrompt
      ? {...basePrompt, ...customPrompt(completionMetadata)}
      : basePrompt;

    // Prepare the request details
    let endpoint = getCopilotProviderEndpoint(this.provider);
    let requestBody: ChatCompletionCreateParams;
    let headers = createProviderHeaders(this.apiKey, this.provider);

    if (typeof this.model === 'object' && 'config' in this.model) {
      const customConfig = this.model.config(this.apiKey, prompt);
      endpoint = customConfig.endpoint ?? endpoint;
      requestBody =
        (customConfig.body as unknown as ChatCompletionCreateParams) ?? {};
      headers = {...headers, ...customConfig.headers};
    } else {
      requestBody = createRequestBody(
        this.model as CopilotModel,
        this.provider,
        prompt,
      );
    }

    // Merge custom headers
    headers = {...headers, ...customHeaders};

    try {
      // Send the completion request
      const chatCompletion = await HTTP.POST<
        ChatCompletion,
        ChatCompletionCreateParams
      >(endpoint, requestBody, {headers});

      let completionResponse: CompletionResponse;

      if (typeof this.model === 'object' && 'transformResponse' in this.model) {
        const transformedResponse =
          this.model.transformResponse(chatCompletion);
        completionResponse = {
          completion:
            transformedResponse.text ?? transformedResponse.completion,
        };
      } else {
        const parsedCompletion = parseProviderChatCompletion(
          chatCompletion,
          this.provider,
        );
        completionResponse = {completion: parsedCompletion};
      }

      return completionResponse;
    } catch (error) {
      const errorDetails = handleError(
        error,
        ErrorContext.COPILOT_COMPLETION_FETCH,
      );
      return {error: errorDetails.message, completion: null};
    }
  }
}
