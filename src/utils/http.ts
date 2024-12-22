type Method = 'GET' | 'POST';

interface RequestOptions<
  BodyType = undefined,
  MethodType extends Method = Method,
> {
  body?: MethodType extends 'POST' | 'PUT' ? BodyType : never;
  headers?: HeadersInit;
  fallbackError?: string;
  signal?: AbortSignal;
  timeout?: number;
}

const request = async <
  ResponseType,
  BodyType = undefined,
  MethodType extends Method = Method,
>(
  url: string,
  method: MethodType,
  options: RequestOptions<BodyType, MethodType> = {},
): Promise<ResponseType> => {
  const timeoutMs = options.timeout ?? 30000; // 30s
  const timeoutSignal = AbortSignal.timeout(timeoutMs);

  // Combine timeout signal with user provided signal if it exists
  const signal = options.signal
    ? AbortSignal.any([timeoutSignal, options.signal])
    : timeoutSignal;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const body =
    method === 'POST' && options.body
      ? JSON.stringify(options.body)
      : undefined;

  const response = await fetch(url, {
    method: method,
    headers,
    body,
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const formattedError = errorData
      ? `\n${JSON.stringify(errorData, null, 2)}`
      : '';
    const errorMessage = options.fallbackError || 'Network request failed';
    throw new Error(`${errorMessage} (${response.status})${formattedError}`);
  }

  return response.json() as Promise<ResponseType>;
};

const GET = <ResponseType>(
  url: string,
  options?: RequestOptions<undefined, 'GET'>,
) => {
  return request<ResponseType, undefined, 'GET'>(url, 'GET', options);
};

const POST = <ResponseType, BodyType>(
  url: string,
  body: BodyType,
  options?: RequestOptions<BodyType, 'POST'>,
) => {
  return request<ResponseType, BodyType, 'POST'>(url, 'POST', {
    ...options,
    body,
  });
};

/**
 * HTTP utility functions for making GET and POST requests.
 * @example
 * import {HTTP} from './utils/http';
 *
 * const response = await HTTP.GET<{message: string}>('https://example.com');
 * console.log(response.message);
 */
export const HTTP = {
  GET,
  POST,
};
