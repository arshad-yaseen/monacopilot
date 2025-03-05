import {
    createProviderEndpoint,
    createProviderHeaders,
    createRequestBody,
    parseProviderCompletion,
} from './llm/operations';
import {logger} from './logger';
import type {
    CopilotOptions,
    CustomCopilotModel,
    CustomPrompt,
    PromptData,
} from './types/copilot';
import type {CopilotAIRequestResponse} from './types/internal';
import type {
    Completion,
    CompletionCreateParams,
    Model,
    Provider,
} from './types/llm';
import {BaseCopilotMetadata} from './types/metadata';
import {fetchWithTimeout} from './utils/fetch-with-timeout';
import validate from './validator';

export abstract class Copilot<Metadata> {
    protected readonly apiKey: string;
    protected provider: Provider | undefined;
    protected model: Model | CustomCopilotModel;

    constructor(apiKey: string | undefined, options: CopilotOptions) {
        validate.params(apiKey, options);
        this.apiKey = apiKey ?? '';
        this.provider = options.provider;
        this.model = options.model;
        validate.inputs(this.model, this.provider);
    }

    protected abstract getDefaultPrompt(metadata: Metadata): PromptData;

    protected generatePrompt(
        metadata: Metadata,
        customPrompt?: CustomPrompt<Metadata>,
    ): PromptData {
        const defaultPrompt = this.getDefaultPrompt(metadata);
        return customPrompt
            ? {...defaultPrompt, ...customPrompt(metadata)}
            : defaultPrompt;
    }

    protected async makeAIRequest(
        metadata: Metadata,
        options: {
            customPrompt?: CustomPrompt<Metadata>;
            customHeaders?: Record<string, string>;
        } = {},
    ): Promise<CopilotAIRequestResponse> {
        try {
            const prompt = this.generatePrompt(metadata, options.customPrompt);

            if (this.isCustomModel()) {
                return this.model(prompt);
            } else {
                const {customHeaders = {}} = options;
                const requestDetails = await this.prepareRequest(
                    prompt,
                    metadata as BaseCopilotMetadata,
                );
                const response = await this.sendRequest(
                    requestDetails.endpoint,
                    requestDetails.requestBody,
                    {...requestDetails.headers, ...customHeaders},
                );

                return this.processResponse(response);
            }
        } catch (error) {
            return this.handleError(error);
        }
    }

    private async prepareRequest(
        prompt: PromptData,
        metadata: BaseCopilotMetadata,
    ) {
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
                metadata,
            ),
        };
    }

    private processResponse(response: unknown): CopilotAIRequestResponse {
        if (!this.provider) {
            throw new Error('Provider is required for non-custom models');
        }

        return {
            text: parseProviderCompletion(
                response as Completion,
                this.provider,
            ),
            raw: response,
        };
    }

    private isCustomModel(): this is {
        model: CustomCopilotModel;
    } {
        return typeof this.model === 'function';
    }

    protected async sendRequest(
        endpoint: string,
        requestBody: CompletionCreateParams,
        headers: Record<string, string>,
    ) {
        const response = await fetchWithTimeout(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    protected handleError(error: unknown): CopilotAIRequestResponse {
        const errorDetails = logger.report(error);
        return {
            text: null,
            error: errorDetails.message,
        };
    }
}
