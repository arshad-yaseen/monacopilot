import {
    createProviderEndpoint,
    createProviderHeaders,
    createRequestBody,
    parseProviderChatCompletion,
} from './llm/operations';
import {logger} from './logger';
import type {
    CopilotOptions,
    CustomCopilotModel,
    CustomPrompt,
    PromptData,
} from './types/copilot';
import type {CopilotResponse, MakeAIRequestOptions} from './types/internal';
import type {
    ChatCompletion,
    ChatCompletionCreateParams,
    Model,
    PickChatCompletion,
    Provider,
} from './types/llm';
import {HTTP} from './utils/http';
import {_validateInputs, _validateParams} from './validator';

export abstract class Copilot<
    P extends Provider = Provider,
    M extends Model | CustomCopilotModel = Model | CustomCopilotModel,
    Meta = unknown,
> {
    protected readonly apiKey: string;
    protected provider: P | undefined;
    protected model: M | CustomCopilotModel;

    constructor(apiKey: string, options: CopilotOptions<P, M>) {
        _validateParams(apiKey, options);
        this.apiKey = apiKey;
        this.provider = options.provider;
        this.model = options.model;
        _validateInputs(this.model, this.provider);
    }

    protected abstract getDefaultPrompt(metadata: Meta): PromptData;

    protected generatePrompt(
        metadata: Meta,
        customPrompt: CustomPrompt<Meta> | undefined,
    ): PromptData {
        const defaultPrompt = this.getDefaultPrompt(metadata);
        return customPrompt
            ? {...defaultPrompt, ...customPrompt(metadata)}
            : defaultPrompt;
    }

    protected async makeAIRequest(
        metadata: Meta,
        options: MakeAIRequestOptions<Meta> = {},
    ): Promise<CopilotResponse<P>> {
        try {
            const {customHeaders = {}} = options;
            const prompt = this.generatePrompt(metadata, options.customPrompt);
            const requestDetails = await this.prepareRequest(prompt);
            const response = await this.sendRequest(
                requestDetails.endpoint,
                requestDetails.requestBody,
                {...requestDetails.headers, ...customHeaders},
            );
            return this.processResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private async prepareRequest(prompt: PromptData): Promise<{
        endpoint: string;
        requestBody: ChatCompletionCreateParams;
        headers: Record<string, string>;
    }> {
        if (this.isCustomModel()) {
            const customConfig = (this.model as CustomCopilotModel).config(
                this.apiKey,
                prompt,
            );
            return {
                endpoint: customConfig.endpoint,
                requestBody: customConfig.body as ChatCompletionCreateParams,
                headers: customConfig.headers ?? {},
            };
        }

        if (!this.provider) {
            throw new Error('Provider is required for non-custom models');
        }

        return {
            endpoint: createProviderEndpoint(
                this.model as Model,
                this.apiKey,
                this.provider,
            ),
            headers: createProviderHeaders(this.apiKey, this.provider),
            requestBody: createRequestBody(
                this.model as Model,
                this.provider,
                prompt,
            ),
        };
    }

    private processResponse(
        response: PickChatCompletion<P>,
    ): CopilotResponse<P> {
        if (this.isCustomModel()) {
            const transformed = (
                this.model as CustomCopilotModel
            ).transformResponse(response);
            return {
                text: transformed.text ?? null,
                raw: response,
            };
        }

        if (!this.provider) {
            throw new Error('Provider is required for non-custom models');
        }

        return {
            text: parseProviderChatCompletion(
                response as ChatCompletion,
                this.provider,
            ),
            raw: response,
        };
    }

    private isCustomModel(): this is Copilot<P, CustomCopilotModel, Meta> {
        return typeof this.model === 'object' && 'config' in this.model;
    }

    protected async sendRequest(
        endpoint: string,
        requestBody: ChatCompletionCreateParams,
        headers: Record<string, string>,
    ): Promise<PickChatCompletion<P>> {
        return HTTP.post<PickChatCompletion<P>, ChatCompletionCreateParams>(
            endpoint,
            requestBody,
            {
                headers,
            },
        );
    }

    protected handleError(error: unknown): CopilotResponse<P> {
        const errorDetails = logger.report(error);
        return {
            text: null,
            error: errorDetails.message,
        };
    }
}
