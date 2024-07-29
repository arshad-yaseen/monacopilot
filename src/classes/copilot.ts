import {
  COMPLETION_MODEL_IDS,
  DEFAULT_COMPLETION_CREATE_PARAMS,
  DEFAULT_COMPLETION_MODEL,
  GROQ_COMPLETION_API_ENDPOINT,
} from '../constants';
import {ErrorContext, handleError} from '../error';
import {generateSystemPrompt, generateUserPrompt} from '../helpers';
import {
  CompletionMetadata,
  CompletionModel,
  CompletionRequest,
  CompletionResponse,
  CopilotOptions,
  GroqCompletion,
  GroqCompletionCreateParams,
} from '../types';
import {HTTP} from '../utils';

/**
 * Copilot class for handling completions using the Groq API.
 */
export class Copilot {
  private readonly apiKey: string;
  private readonly model: CompletionModel;

  /**
   * Initializes the Copilot with an API key and optional configuration.
   * @param {string} apiKey - The Groq API key.
   * @param {CopilotOptions} [options] - Optional parameters to configure the completion model.
   * @throws {Error} If the API key is not provided.
   */
  constructor(apiKey: string, options?: CopilotOptions) {
    if (!apiKey) {
      throw new Error('Groq API key is required to initialize Copilot.');
    }

    this.apiKey = apiKey;
    this.model = options?.model || DEFAULT_COMPLETION_MODEL;
  }

  /**
   * Sends a completion request to Groq API and returns the completion.
   * @param {CompletionRequest} params - The metadata required to generate the completion.
   * @returns {Promise<CompletionResponse>} The completed text snippet or an error.
   */
  public async complete({
    completionMetadata,
  }: CompletionRequest): Promise<CompletionResponse> {
    try {
      const body = this.createRequestBody(completionMetadata);
      const headers = this.createHeaders();

      const completion = await HTTP.POST<
        GroqCompletion,
        GroqCompletionCreateParams
      >(GROQ_COMPLETION_API_ENDPOINT, body, {headers});

      if (!completion.choices?.length) {
        throw new Error('No completion choices received from API');
      }

      return {completion: completion.choices[0].message.content};
    } catch (_err) {
      handleError(_err, ErrorContext.COPILOT_COMPLETION_FETCH);
      return {error: 'Failed to generate completion'};
    }
  }

  private createRequestBody(
    completionMetadata: CompletionMetadata,
  ): GroqCompletionCreateParams {
    return {
      ...DEFAULT_COMPLETION_CREATE_PARAMS,
      model: COMPLETION_MODEL_IDS[this.model],
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
