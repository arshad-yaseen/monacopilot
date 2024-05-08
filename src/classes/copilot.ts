import {
  COMPLETION_MODEL_ID,
  DEFAULT_COMPLETION_MODEL,
  GROQ_API_ENDPOINT,
} from '../constants/completion';
import {getCompletionPrompt} from '../helpers/copilot';
import {
  CompletionConstructorParams,
  CompletionRequestParams,
  GroqCompletion,
  GroqCompletionCreateParams,
} from '../types/completion';
import {POST} from '../utils/http';
import Config from './config';

/**
 * Initializes with configuration options
 * and an API key, and provides a method to send a completion request to Groq API and return the completion.
 *
 * @param {string} apiKey - The Groq API key.
 * @param {CompletionConstructorParams} [options] - Optional parameters to configure the completion model,
 * such as the model ID. Defaults to `llama3-70b-8192` if not specified.
 *
 * @example
 * ```typescript
 * const copilot = new Copilot(process.env.GROQ_API_KEY, {
 *   model: 'llama3-70b-8192',
 * });
 * ```
 */
class Copilot {
  private apiKey: string;

  constructor(apiKey: string, options?: CompletionConstructorParams) {
    if (!apiKey) {
      throw new Error('API key is missing');
    }

    this.apiKey = apiKey;
    Config.setModel(options?.model || DEFAULT_COMPLETION_MODEL);
  }

  public async complete(
    data: CompletionRequestParams,
  ): Promise<GroqCompletion | {error: string}> {
    try {
      const model = Config.getModel();

      const endpoint = GROQ_API_ENDPOINT;

      const {systemPrompt, userPrompt} = getCompletionPrompt(
        data.completionMetadata,
      );

      console.log({
        systemPrompt,
        userPrompt,
      });

      const body: GroqCompletionCreateParams = {
        model: COMPLETION_MODEL_ID[model],
        max_tokens: 200,
        temperature: 0.3,
        top_p: 0.8,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      };

      const headers = {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      };

      const completion = await POST<GroqCompletion, GroqCompletionCreateParams>(
        endpoint,
        body,
        {
          headers,
          error: 'Error while fetching from groq API',
        },
      );

      return completion;
    } catch (error) {
      return {
        error: `An unexpected error occurred: ${error}`,
      };
    }
  }
}

export default Copilot;
