import {
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

class Completion {
  private apiKey: string | undefined;

  constructor(
    apiKey: string | undefined,
    options?: CompletionConstructorParams,
  ) {
    this.apiKey = apiKey;
    Config.setModel(options?.model || DEFAULT_COMPLETION_MODEL);
  }

  public async run(req: Request) {
    try {
      const apiKey = this.apiKey;

      if (!apiKey) {
        throw new Error('API key is required to run auto completion');
      }

      const provider = Config.getProvider();
      const model = Config.getModel();

      const data = (await req.json()) as CompletionRequestParams;
      const endpoint = PROVIDER_API_ENDPOINTS[provider];
      const body = getProviderRequestBody(data, provider, model);
      const headers = getProviderRequestHeaders(provider, apiKey);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      });

      return await response.json();
    } catch (error) {
      console.error('Error executing code completion:', error);
    }
  }
}

export default Completion;
