import {COPILOT_PROVIDER_MODEL_MAP, COPILOT_PROVIDERS} from '../constants';
import {craftCompletionPrompt} from '../helpers/prompt';
import {
  createProviderEndpoint,
  createProviderHeaders,
  createRequestBody,
  parseProviderChatCompletion,
} from '../helpers/provider';
import {deprecated, report} from '../logger';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  CompletionMetadata,
  CompletionRequest,
  CompletionResponse,
  CopilotModel,
  CopilotOptions,
  CopilotProvider,
  CustomCopilotModel,
  CustomPrompt,
  PromptData,
} from '../types';
import {HTTP, joinWithAnd} from '../utils';

export class Copilot {
  private readonly apiKey: string;
  private provider: CopilotProvider | undefined;
  private model: CopilotModel | CustomCopilotModel;

  constructor(apiKey: string, options: CopilotOptions) {
    this.validateParams(apiKey, options);

    this.apiKey = apiKey;
    this.provider = options.provider;
    this.model = options.model;

    this.validateInputs();
  }

  private validateParams(apiKey: string, options: CopilotOptions): void {
    if (!apiKey) {
      throw new Error('Please provide an API key.');
    }

    if (
      !options ||
      (typeof options === 'object' && Object.keys(options).length === 0)
    ) {
      throw new Error('Please provide options.');
    }
  }

  private validateInputs(): void {
    // Check if using a custom model (has config property)
    if (typeof this.model === 'object') {
      // Custom models cannot have a provider specified
      if (this.provider !== undefined) {
        throw new Error(
          'Provider should not be specified when using a custom model.',
        );
      }

      if (!('config' in this.model) || !('transformResponse' in this.model)) {
        throw new Error(
          'Please ensure both config and transformResponse are provided for custom model.',
        );
      }

      return;
    }

    // Validate that a supported provider is specified for built-in models
    if (!this.provider || !COPILOT_PROVIDERS.includes(this.provider)) {
      throw new Error(
        `Provider must be specified and supported when using built-in models. Please choose from: ${joinWithAnd(
          COPILOT_PROVIDERS,
        )}`,
      );
    }

    // Validate that the model is supported by the specified provider
    if (
      typeof this.model === 'string' &&
      !COPILOT_PROVIDER_MODEL_MAP[this.provider].includes(this.model)
    ) {
      throw new Error(
        `Model "${this.model}" is not supported by the "${
          this.provider
        }" provider. Supported models: ${joinWithAnd(
          COPILOT_PROVIDER_MODEL_MAP[this.provider],
        )}`,
      );
    }
  }

  public async complete(
    request: CompletionRequest,
  ): Promise<CompletionResponse> {
    const {body, options} = request;
    const {completionMetadata} = body;
    const {headers: customHeaders = {}, customPrompt} = options ?? {};

    const prompt = this.generatePrompt(completionMetadata, customPrompt);

    const {endpoint, requestBody, headers} = this.prepareRequestDetails(
      prompt,
      completionMetadata,
    );

    try {
      const chatCompletion = await this.sendCompletionRequest(
        endpoint,
        requestBody,
        {...headers, ...customHeaders},
      );

      return this.processCompletionResponse(chatCompletion);
    } catch (error) {
      return this.handleCompletionError(error);
    }
  }

  private generatePrompt(
    completionMetadata: CompletionMetadata,
    customPrompt?: CustomPrompt,
  ): PromptData {
    const basePrompt = craftCompletionPrompt(completionMetadata);
    return customPrompt
      ? {...basePrompt, ...customPrompt(completionMetadata)}
      : basePrompt;
  }

  private prepareRequestDetails(
    prompt: PromptData,
    completionMetadata: CompletionMetadata,
  ): {
    endpoint: string;
    requestBody: ChatCompletionCreateParams;
    headers: Record<string, string>;
  } {
    if (typeof this.model === 'object' && 'config' in this.model) {
      // Handle custom model case
      const customConfig = this.model.config(this.apiKey, prompt);
      const endpoint = customConfig.endpoint;
      const requestBody =
        (customConfig.body as unknown as ChatCompletionCreateParams) ?? {};
      const headers = customConfig.headers ?? {};
      return {endpoint, requestBody, headers};
    } else {
      // Handle provider model case
      if (!this.provider) {
        throw new Error('Provider is required for non-custom models');
      }

      const endpoint = createProviderEndpoint(
        this.model as CopilotModel,
        this.apiKey,
        this.provider,
      );
      const headers = createProviderHeaders(this.apiKey, this.provider);
      const requestBody = createRequestBody(
        this.model as CopilotModel,
        this.provider,
        prompt,
        completionMetadata,
      );
      return {endpoint, requestBody, headers};
    }
  }

  private async sendCompletionRequest(
    endpoint: string,
    requestBody: ChatCompletionCreateParams,
    headers: Record<string, string>,
  ): Promise<ChatCompletion> {
    return HTTP.POST<ChatCompletion, ChatCompletionCreateParams>(
      endpoint,
      requestBody,
      {headers},
    );
  }

  private processCompletionResponse(
    chatCompletion: ChatCompletion,
  ): CompletionResponse {
    if (typeof this.model === 'object' && 'transformResponse' in this.model) {
      // Handle custom model case
      const transformedResponse = this.model.transformResponse(chatCompletion);
      if ('completion' in transformedResponse) {
        deprecated(
          'completion',
          'text',
          'Copilot.options.model.transformResponse',
        );
      }
      return {
        completion:
          transformedResponse.text ?? transformedResponse.completion ?? null,
        raw: chatCompletion,
      };
    } else {
      // Handle provider model case
      if (!this.provider) {
        throw new Error('Provider is required for non-custom models');
      }
      const parsedCompletion = parseProviderChatCompletion(
        chatCompletion,
        this.provider,
      );
      return {completion: parsedCompletion, raw: chatCompletion};
    }
  }

  private handleCompletionError(error: unknown): CompletionResponse {
    const errorDetails = report(error);

    return {error: errorDetails.message, completion: null};
  }
}
