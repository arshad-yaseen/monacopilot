import {
  COPILOT_PROVIDER_MODEL_MAP,
  COPILOT_PROVIDERS,
  DEFAULT_COPILOT_MODEL,
  DEFAULT_COPILOT_PROVIDER,
} from '../constants';
import {
  createProviderHeaders,
  createRequestBody,
  getCopilotProviderEndpoint,
  parseProviderChatCompletion,
} from '../helpers/provider';
import {log} from '../log';
import {createCompletionPrompt, createModifyPrompt} from '../prompts';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  CompletionApiRequest,
  CompletionApiResponse,
  CompletionMetadata,
  CopilotModel,
  CopilotOptions,
  CopilotProvider,
  CustomCopilotModel,
  CustomPrompt,
  ModifyApiRequest,
  ModifyApiResponse,
  ModifyMetadata,
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
    request: CompletionApiRequest,
  ): Promise<CompletionApiResponse> {
    const {body, options} = request;
    const {metadata} = body;
    const {headers: customHeaders = {}, customPrompt} = options ?? {};

    return this.makeApiCall<CompletionMetadata, CompletionApiResponse>(
      metadata,
      customPrompt,
      createCompletionPrompt,
      this.processCompletionResponse.bind(this),
      customHeaders,
      this.handleCompletionError.bind(this),
    );
  }

  public async modify(request: ModifyApiRequest): Promise<ModifyApiResponse> {
    const {body, options} = request;
    const {metadata} = body;
    const {headers: customHeaders = {}, customPrompt} = options ?? {};

    return this.makeApiCall<ModifyMetadata, ModifyApiResponse>(
      metadata,
      customPrompt,
      createModifyPrompt,
      this.processModifyResponse.bind(this),
      customHeaders,
      this.handleModifyError.bind(this),
    );
  }

  private async makeApiCall<TMetadata, TApiResponse>(
    metadata: TMetadata,
    customPrompt: CustomPrompt<TMetadata> | undefined,
    createBasePrompt: (metadata: TMetadata) => PromptData,
    processResponse: (chatCompletion: ChatCompletion) => TApiResponse,
    customHeaders: Record<string, string> = {},
    handleError: (error: unknown) => TApiResponse,
  ): Promise<TApiResponse> {
    const prompt = this.generatePrompt(
      metadata,
      customPrompt,
      createBasePrompt,
    );

    const {endpoint, requestBody, headers} = this.prepareRequestDetails(prompt);

    try {
      const chatCompletion = await this.sendCompletionRequest(
        endpoint,
        requestBody,
        {...headers, ...customHeaders},
      );

      return processResponse(chatCompletion);
    } catch (error) {
      return handleError(error);
    }
  }

  private generatePrompt<TMetadata>(
    metadata: TMetadata,
    customPrompt: CustomPrompt<TMetadata> | undefined,
    createBasePrompt: (metadata: TMetadata) => PromptData,
  ): PromptData {
    const basePrompt = createBasePrompt(metadata);
    return customPrompt
      ? {...basePrompt, ...customPrompt(metadata)}
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
  ): CompletionApiResponse {
    if (typeof this.model === 'object' && 'transformResponse' in this.model) {
      const transformedResponse = this.model.transformResponse(chatCompletion);
      return {
        completion: transformedResponse.text,
      };
    } else {
      const parsedCompletion = parseProviderChatCompletion(
        chatCompletion,
        this.provider,
      );
      return {completion: parsedCompletion};
    }
  }

  private processModifyResponse(
    chatCompletion: ChatCompletion,
  ): ModifyApiResponse {
    if (typeof this.model === 'object' && 'transformResponse' in this.model) {
      const transformedResponse = this.model.transformResponse(chatCompletion);
      return {
        modifiedText: transformedResponse.text,
      };
    } else {
      const parsedCompletion = parseProviderChatCompletion(
        chatCompletion,
        this.provider,
      );
      return {modifiedText: parsedCompletion};
    }
  }

  private handleCompletionError(error: unknown): CompletionApiResponse {
    const errorDetails = log.error(error);

    return {error: errorDetails.message, completion: null};
  }

  private handleModifyError(error: unknown): ModifyApiResponse {
    const errorDetails = log.error(error);

    return {error: errorDetails.message, modifiedText: null};
  }
}
