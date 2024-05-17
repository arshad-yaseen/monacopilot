import {
  COMPLETION_MODEL_IDS,
  DEFAULT_COMPLETION_MODEL,
  GROQ_API_ENDPOINT,
} from '../constants/completion';
import {generateSystemPrompt, generateUserPrompt} from '../helpers/copilot';
import {
  CompletionRequestParams,
  GroqCompletion,
  GroqCompletionCreateParams,
} from '../types/completion';
import {CopilotOptions} from '../types/copilot';
import {POST} from '../utils/http';
import Config from './config';

/**
 * Initializes with configuration options
 * and an API key, and provides a method to send a completion request to Groq API and return the completion.
 *
 * @param {string} apiKey - The Groq API key.
 * @param {CopilotOptions} [options] - Optional parameters to configure the completion model,
 * such as the model ID. Defaults to `llama` if not specified.
 *
 * @example
 * ```typescript
 * const copilot = new Copilot(process.env.GROQ_API_KEY, {
 *   model: 'llama',
 * });
 * ```
 */
class Copilot {
  private apiKey: string;

  constructor(apiKey: string, options?: CopilotOptions) {
    if (!apiKey) {
      throw new Error('Groq API key is required to initialize Copilot.');
    }

    this.apiKey = apiKey;
    Config.setModel(options?.model || DEFAULT_COMPLETION_MODEL);
  }

  public async complete({
    completionMetadata,
  }: CompletionRequestParams): Promise<GroqCompletion | {error: string}> {
    try {
      const model = Config.getModel();

      const body: GroqCompletionCreateParams = {
        model: COMPLETION_MODEL_IDS[model],
        messages: [
          {
            role: 'system',
            content: generateSystemPrompt(completionMetadata),
          },
          {
            role: 'user',
            content: generateUserPrompt(completionMetadata),
          },
        ],
      };

      const headers = {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      };

      const completion = await POST<GroqCompletion, GroqCompletionCreateParams>(
        GROQ_API_ENDPOINT,
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
