import {
  COPILOT_PROVIDER_MODEL_MAP,
  COPILOT_PROVIDERS,
  DEFAULT_COPILOT_MODEL,
  DEFAULT_COPILOT_PROVIDER,
} from '../constants';
import {
  createProviderEndpoint,
  createProviderHeaders,
  createRequestBody,
  parseProviderChatCompletion,
} from '../helpers/provider';
import {deprecated, report} from '../logger';
import generateCompletionPrompt from '../prompts/completion-prompt';
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
  private provider: CopilotProvider;
  private model: CopilotModel | CustomCopilotModel;
  private endpoint?: string;

  constructor(apiKey: string, options: CopilotOptions = {}) {
    if (!apiKey) {
      throw new Error('Please provide an API key.');
    }

    this.apiKey = apiKey;
    this.provider = options.provider ?? DEFAULT_COPILOT_PROVIDER;
    this.model = options.model ?? DEFAULT_COPILOT_MODEL;
    this.endpoint = options.endpoint ?? undefined;

    this.validateInputs();
  }

  private validateInputs(): void {
    if (!COPILOT_PROVIDERS.includes(this.provider)) {
      throw new Error(
        `Unsupported provider "${this.provider}". Please choose from: ${joinWithAnd(
          COPILOT_PROVIDERS,
        )}. For custom models, provider specification is not needed.`,
      );
    }

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

    if (this.endpoint && this.endpoint.endsWith('/')) {
      throw new Error(
        `Endpoint URL should not end with a trailing slash: "${this.endpoint}".`,
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

    const {endpoint, requestBody, headers} = this.prepareRequestDetails(prompt);

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
    const basePrompt = generateCompletionPrompt(completionMetadata);
    return customPrompt
      ? {...basePrompt, ...customPrompt(completionMetadata)}
      : basePrompt;
  }

  private prepareRequestDetails(prompt: PromptData): {
    endpoint: string;
    requestBody: ChatCompletionCreateParams;
    headers: Record<string, string>;
  } {
    let endpoint = createProviderEndpoint(
      this.endpoint,
      this.model as CopilotModel,
      this.apiKey,
      this.provider,
    );
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

    return {endpoint, requestBody, headers};
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
