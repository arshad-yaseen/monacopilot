type Method = 'GET' | 'POST';

interface RequestOptions<
  BodyType = undefined,
  MethodType extends Method = Method,
> {
  body?: MethodType extends 'POST' | 'PUT' ? BodyType : never;
  headers?: HeadersInit;
  error?: string;
  signal?: AbortSignal;
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
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(
      `${options.error || 'Network error'}: ${response.statusText}`,
    );
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

const HTTP = {
  GET,
  POST,
};

export default HTTP;
