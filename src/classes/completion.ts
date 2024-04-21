import {
  _COMPLETION_SERVER_BASE_URL,
  DEFAULT_COMPLETION_MODEL,
  PROVIDER_API_ENDPOINTS,
} from '../constants/completion';
import {
  getProviderRequestBody,
  getProviderRequestHeaders,
} from '../helpers/create-completion';
import {
  CompletionConstructorParams,
  CompletionRequestParams,
} from '../types/completion';
import Config from './config';

let totalTokens = 0;

/**
 * Represents a completion request handler. This class initializes with configuration options
 * and an API key, and provides a method to send a completion request to a configured provider.
 *
 * @param {string} apiKey - The API key required to authenticate requests to the completion provider.
 * @param {CompletionConstructorParams} [options] - Optional parameters to configure the completion model,
 * such as the model ID. Defaults to 'gpt-3.5-turbo-0125' if not specified.
 *
 * @example
 * ```ts
 * const completion = new Completion(process.env.OPENAI_API_KEY, {
 *   model: 'gpt-3.5-turbo-0125',
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

  public async run(req: Request): Promise<unknown> {
    try {
      const data = (await req.json()) as CompletionRequestParams;
      const provider = Config.getProvider();
      const model = Config.getModel();

      const endpoint = PROVIDER_API_ENDPOINTS[provider] ?? '';
      const body = getProviderRequestBody(data, provider, model);
      const headers = getProviderRequestHeaders(provider, this.apiKey);

      const fullUrl = `${_COMPLETION_SERVER_BASE_URL}/run`;

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          ...headers,
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerApiEndpoint: endpoint,
          providerHeaders: headers,
          providerBody: body,
        }),
      });

      if (!response.ok) {
        return null;
      }

      const completion = await response.json();

      totalTokens += completion?.usage.total_tokens ?? 0;
      console.clear();
      console.log(totalTokens);

      return completion;
    } catch (error) {
      return null;
    }
  }
}

export default Completion;
