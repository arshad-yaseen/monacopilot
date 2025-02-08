import {
  createProviderEndpoint,
  createProviderHeaders,
  createRequestBody,
  parseProviderChatCompletion,
} from 'ai/operations';
import {craftCompletionPrompt} from 'helpers/prompt';
import {report} from 'logger';

import {
  ChatCompletion,
  ChatCompletionCreateParams,
  Model,
  Provider,
} from 'types/ai';
import {
  CompletionMetadata,
  CompletionRequest,
  CompletionResponse,
  CustomPrompt,
} from 'types/completion';
import {CopilotOptions, CustomCopilotModel, PromptData} from 'types/copilot';

import {HTTP} from 'utils/http';

import {_validateInputs, _validateParams} from './validator';

export class Copilot {
  private readonly apiKey: string;
  private provider: Provider | undefined;
  private model: Model | CustomCopilotModel;

  constructor(apiKey: string, options: CopilotOptions) {
    _validateParams(apiKey, options);

    this.apiKey = apiKey;
    this.provider = options.provider;
    this.model = options.model;

    _validateInputs(this.model, this.provider);
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
        this.model as Model,
        this.apiKey,
        this.provider,
      );
      const headers = createProviderHeaders(this.apiKey, this.provider);
      const requestBody = createRequestBody(
        this.model as Model,
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
    return HTTP.post<ChatCompletion, ChatCompletionCreateParams>(
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
      return {
        completion: transformedResponse.text ?? null,
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
