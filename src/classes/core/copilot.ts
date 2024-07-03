import {
  COMPLETION_MODEL_IDS,
  DEFAULT_COMPLETION_MODEL,
  GROQ_API_ENDPOINT,
} from '../../constants/completion';
import {generateSystemPrompt, generateUserPrompt} from '../../helpers/prompt';
import {
  CompletionRequest,
  CompletionResponse,
  GroqCompletion,
  GroqCompletionCreateParams,
} from '../../types/completion';
import {CopilotOptions} from '../../types/copilot';
import HTTP from '../../utils/http';
import Config from '../config';

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

  /**
   * Sends a completion request to Groq API and returns the completion.
   * @param {CompletionRequest} params - The metadata required to generate the completion.
   * @returns {Promise<CompletionResponse>} The completed code snippet.
   */
  public async complete({
    completionMetadata,
  }: CompletionRequest): Promise<CompletionResponse> {
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

      const completion = await HTTP.POST<
        GroqCompletion,
        GroqCompletionCreateParams
      >(GROQ_API_ENDPOINT, body, {
        headers,
        error: 'Error while fetching from groq API',
      });

      return {
        completion: completion.choices[0].message.content,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export default Copilot;
