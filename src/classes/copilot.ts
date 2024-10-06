import {
  COPILOT_PROVIDER_MODEL_MAP,
  COPILOT_PROVIDERS,
  DEFAULT_COPILOT_MODEL,
  DEFAULT_COPILOT_PROVIDER,
} from '../constants';
import generatePrompt from '../helpers/completion/prompt';
import {
  createProviderHeaders,
  createRequestBody,
  getCopilotProviderEndpoint,
  parseProviderChatCompletion,
} from '../helpers/provider';
import {log} from '../log';
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

  constructor(apiKey: string, options: CopilotOptions = {}) {
    if (!apiKey) {
      throw new Error('Please provide an API key.');
    }

    this.apiKey = apiKey;
    this.provider = options.provider ?? DEFAULT_COPILOT_PROVIDER;
    this.model = options.model ?? DEFAULT_COPILOT_MODEL;

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
    const basePrompt = generatePrompt(completionMetadata);
    return customPrompt
      ? {...basePrompt, ...customPrompt(completionMetadata)}
      : basePrompt;
  }

  private prepareRequestDetails(prompt: PromptData): {
    endpoint: string;
    requestBody: ChatCompletionCreateParams;
    headers: Record<string, string>;
  } {
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
        log.warning(
          'The `completion` property in `transformResponse` function is deprecated. Please use `text` instead.',
        );
      }
      return {
        completion: transformedResponse.text ?? transformedResponse.completion,
      };
    } else {
      const parsedCompletion = parseProviderChatCompletion(
        chatCompletion,
        this.provider,
      );
      return {completion: parsedCompletion};
    }
  }

  private handleCompletionError(error: unknown): CompletionResponse {
    const errorDetails = log.error(error);

    return {error: errorDetails.message, completion: null};
  }
}
