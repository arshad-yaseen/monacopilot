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
import type {CopilotResponse} from './types/internal';
import type {
    ChatCompletion,
    ChatCompletionCreateParams,
    Model,
    Provider,
} from './types/llm';
import {HTTP} from './utils/http';
import validate from './validator';

export abstract class Copilot<Meta> {
    protected readonly apiKey: string;
    protected provider: Provider | undefined;
    protected model: Model | CustomCopilotModel;

    constructor(apiKey: string, options: CopilotOptions) {
        validate.params(apiKey, options);
        this.apiKey = apiKey;
        this.provider = options.provider;
        this.model = options.model;
        validate.inputs(this.model, this.provider);
    }

    protected abstract getDefaultPrompt(metadata: Meta): PromptData;

    protected generatePrompt(
        metadata: Meta,
        customPrompt?: CustomPrompt<Meta>,
    ): PromptData {
        const defaultPrompt = this.getDefaultPrompt(metadata);
        return customPrompt
            ? {...defaultPrompt, ...customPrompt(metadata)}
            : defaultPrompt;
    }

    protected async makeAIRequest(
        metadata: Meta,
        options: {
            customPrompt?: CustomPrompt<Meta>;
            customHeaders?: Record<string, string>;
        } = {},
    ): Promise<CopilotResponse> {
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

    private async prepareRequest(prompt: PromptData) {
        if (this.isCustomModel()) {
            const customConfig = this.model.config(this.apiKey, prompt);
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

    private processResponse(response: unknown): CopilotResponse {
        if (this.isCustomModel()) {
            const transformed = this.model.transformResponse(response);
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

    private isCustomModel(): this is {
        model: CustomCopilotModel;
        provider: undefined;
    } {
        return typeof this.model === 'object' && 'config' in this.model;
    }

    protected async sendRequest(
        endpoint: string,
        requestBody: ChatCompletionCreateParams,
        headers: Record<string, string>,
    ) {
        return HTTP.post(endpoint, requestBody, {headers});
    }

    protected handleError(error: unknown): CopilotResponse {
        const errorDetails = logger.report(error);
        return {
            text: null,
            error: errorDetails.message,
        };
    }
}
