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

export class Copilot {
  private readonly apiKey: string;
  private readonly provider: CompletionProvider;
  private readonly model: CompletionModel | CustomModel;

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
    this.provider = options.provider ?? DEFAULT_COMPLETION_PROVIDER;
    this.model = options.model ?? DEFAULT_COMPLETION_MODEL;

    this.validateInputs();
  }

  /**
   * Validates the inputs provided to the constructor.
   * Ensures the selected model is supported by the provider.
   */
  private validateInputs(): void {
    if (
      typeof this.model === 'string' &&
      !COMPLETION_PROVIDER_MODEL_MAP[this.provider].includes(this.model)
    ) {
      const supportedModels = joinWithAnd(
        COMPLETION_PROVIDER_MODEL_MAP[this.provider],
      );
      throw new Error(
        `Model "${this.model}" is not supported by the "${this.provider}" provider. Supported models: ${supportedModels}`,
      );
    }
  }

  /**
   * Generates the prompt based on the completion metadata and any custom prompt function.
   * @param completionMetadata - The metadata for the completion.
   * @param customPrompt - An optional custom prompt function.
   * @returns The generated prompt.
   */
  private generatePrompt(
    completionMetadata: any,
    customPrompt?: (metadata: any) => any,
  ): any {
    const basePrompt = generatePrompt(completionMetadata);
    return customPrompt
      ? {...basePrompt, ...customPrompt(completionMetadata)}
      : basePrompt;
  }

  /**
   * Prepares the request details including endpoint, request body, and headers.
   * @param prompt - The generated prompt.
   * @param customHeaders - Any custom headers to include.
   * @returns An object containing the endpoint, request body, and headers.
   */
  private prepareRequest(
    prompt: any,
    customHeaders: Record<string, string>,
  ): {
    endpoint: string;
    requestBody: ChatCompletionCreateParams;
    headers: Record<string, string>;
  } {
    let endpoint = getProviderCompletionEndpoint(this.provider);
    let requestBody: ChatCompletionCreateParams;
    let headers = createProviderHeaders(this.apiKey, this.provider);

    if (typeof this.model === 'object' && 'config' in this.model) {
      const customModelConfig = this.model.config(this.apiKey, prompt);
      endpoint = customModelConfig.endpoint ?? endpoint;
      requestBody =
        (customModelConfig.body as unknown as ChatCompletionCreateParams) ?? {};
      headers = {...headers, ...customModelConfig.headers};
    } else {
      requestBody = createRequestBody(
        this.model as CompletionModel,
        this.provider,
        prompt,
      );
    }

    const mergedHeaders = {...headers, ...customHeaders};
    return {endpoint, requestBody, headers: mergedHeaders};
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
    const prompt = this.generatePrompt(completionMetadata, customPrompt);

    // Prepare the request details
    const {endpoint, requestBody, headers} = this.prepareRequest(
      prompt,
      customHeaders,
    );

    try {
      // Send the completion request
      const chatCompletion = await HTTP.POST<
        ChatCompletion,
        ChatCompletionCreateParams
      >(endpoint, requestBody, {headers});

      // Return the parsed completion response
      if (typeof this.model === 'object' && 'transformResponse' in this.model) {
        return this.model.transformResponse(chatCompletion);
      } else {
        return parseProviderChatCompletion(chatCompletion, this.provider);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      const errorDetails = handleError(
        error,
        ErrorContext.COPILOT_COMPLETION_FETCH,
      );
      return {error: errorDetails.message, completion: null};
    }
  }
}
