import {
  COMPLETION_SYSTEM_PROMPT,
  DEFAULT_COMPLETION_MODEL,
  GROQ_API_ENDPOINT,
} from '../constants/completion';
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
 * ```ts
 * const completion = new Completion(process.env.GROQ_API_KEY, {
 *   model: 'llama3-70b-8192',
 * });
 * ```
 */
class Completion {
  private apiKey: string;

  constructor(apiKey: string, options?: CompletionConstructorParams) {
    if (!apiKey) {
      throw new Error('API key is missing in Completion constructor.');
    }

    this.apiKey = apiKey;
    Config.setModel(options?.model || DEFAULT_COMPLETION_MODEL);
  }

  public async run(req: Request) {
    try {
      const data = (await req.json()) as CompletionRequestParams;
      const model = Config.getModel();

      const endpoint = GROQ_API_ENDPOINT;
      const body: GroqCompletionCreateParams = {
        model,
        max_tokens: 200,
        temperature: 0.5,
        messages: [
          {
            role: 'system',
            content: COMPLETION_SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: JSON.stringify(data),
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

export default Completion;
