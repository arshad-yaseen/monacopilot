import {
  _COMPLETION_SERVER_URL,
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

      const response = await fetch(_COMPLETION_SERVER_URL, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider_api_endpoint: endpoint,
          provider_headers: headers,
          provider_body: body,
        }),
      });

      if (!response.ok) {
        return {};
      }

      return await response.json();
    } catch (error) {
      return {};
    }
  }
}

export default Completion;
