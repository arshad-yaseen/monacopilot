import {
  COMPLETION_PROVIDER_OF_,
  DEFAULT_COMPLETION_MODEL,
  PROVIDER_API_ENDPOINTS,
} from './constants/completion';
import {
  getProviderRequestBody,
  getProviderRequestHeaders,
} from './helpers/create-completion';
import {
  CompletionConstructorParams,
  CompletionModelType,
  CompletionRequestParams,
  ProviderRequestBody,
  ProviderResponse,
} from './types/completion';
import {POST} from './utils/http';

export class Client {
  public static _endpoint: string;

  static getEndpoint() {
    return Client._endpoint;
  }

  static setEndpoint(value: string) {
    Client._endpoint = value;
  }
}

export class Completion {
  protected _apiKey: string | undefined;
  public model: CompletionModelType | undefined;

  constructor(
    apiKey: string | undefined,
    options?: CompletionConstructorParams,
  ) {
    this._apiKey = apiKey;
    this.model = options?.model || DEFAULT_COMPLETION_MODEL;
  }

  async run(req: Request) {
    if (!this._apiKey || !this.model) {
      return;
    }

    const data: CompletionRequestParams = await req.json();

    const model = this.model;
    const provider = COMPLETION_PROVIDER_OF_[model];

    return await POST<ProviderResponse, ProviderRequestBody>(
      PROVIDER_API_ENDPOINTS[provider],
      getProviderRequestBody(data, provider, model),
      {
        headers: getProviderRequestHeaders(provider, this._apiKey),
      },
    );
  }
}
