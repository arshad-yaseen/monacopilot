import {
  COMPLETION_API_ENDPOINT,
  COMPLETION_MODEL_IDS,
  COMPLETION_PROVIDER_MODEL_MAP,
  DEFAULT_COMPLETION_CREATE_PARAMS,
  DEFAULT_COMPLETION_MODEL,
  DEFAULT_COMPLETION_PROVIDER,
} from '../constants';
import {ErrorContext, handleError} from '../error';
import {generateSystemPrompt, generateUserPrompt} from '../helpers';
import {
  Completion,
  CompletionCreateParams,
  CompletionMetadata,
  CompletionModel,
  CompletionProvider,
  CompletionRequest,
  CompletionResponse,
  CopilotOptions,
  Endpoint,
} from '../types';
import {HTTP, joinWithAnd} from '../utils';

/**
 * Copilot class for handling completions using the API.
 */
export class Copilot {
  private readonly apiKey: string;
  private readonly model: CompletionModel;
  private readonly provider: CompletionProvider;

  /**
   * Initializes the Copilot with an API key and optional configuration.
   * @param {string} apiKey - The API key.
   * @param {CopilotOptions<CompletionProvider>} [options] - Optional parameters to configure the completion model.
   * @throws {Error} If the API key is not provided.
   */
  constructor(apiKey: string, options?: CopilotOptions) {
    const {provider, model} = options || {};

    if (provider && !model) {
      throw new Error('You must provide a model when setting a provider');
    }

    if (model && !provider) {
      throw new Error('You must provide a provider when setting a model');
    }

    this.model = model || DEFAULT_COMPLETION_MODEL;
    this.provider = provider || DEFAULT_COMPLETION_PROVIDER;

    if (!COMPLETION_PROVIDER_MODEL_MAP[this.provider].includes(this.model)) {
      throw new Error(
        `Model ${this.model} is not supported by ${this.provider} provider. Supported models: ${joinWithAnd(COMPLETION_PROVIDER_MODEL_MAP[this.provider])}`,
      );
    }

    if (!apiKey) {
      throw new Error(`Please provide ${this.provider} API key.`);
    }

    this.apiKey = apiKey;
  }

  /**
   * Sends a completion request to API and returns the completion.
   * @param {CompletionRequest} params - The metadata required to generate the completion.
   * @returns {Promise<CompletionResponse>} The completed text snippet or an error.
   */
  public async complete({
    completionMetadata,
  }: CompletionRequest): Promise<CompletionResponse> {
    try {
      const body = this.createRequestBody(completionMetadata);
      const headers = this.createHeaders();
      const endpoint = this.getEndpoint();

      const completion = await HTTP.POST<Completion, CompletionCreateParams>(
        endpoint,
        body,
        {headers},
      );

      if (!completion.choices?.length) {
        throw new Error('No completion choices received from API');
      }

      return {completion: completion.choices[0].message.content};
    } catch (_err) {
      const errorDetails = handleError(
        _err,
        ErrorContext.COPILOT_COMPLETION_FETCH,
      );
      return {error: errorDetails.message, completion: null};
    }
  }

  private getEndpoint(): Endpoint {
    return COMPLETION_API_ENDPOINT[this.provider];
  }

  private getModelId(): string {
    return COMPLETION_MODEL_IDS[this.model];
  }

  private createRequestBody(
    completionMetadata: CompletionMetadata,
  ): CompletionCreateParams {
    return {
      ...DEFAULT_COMPLETION_CREATE_PARAMS,
      model: this.getModelId(),
      messages: [
        {role: 'system', content: generateSystemPrompt(completionMetadata)},
        {role: 'user', content: generateUserPrompt(completionMetadata)},
      ],
    };
  }

  private createHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }
}
