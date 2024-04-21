const callLlmProvider = async (
  endpoint: string,
  body: BodyInit,
  headers: HeadersInit,
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch from the provider');
  }
  return response.json();
};

export {callLlmProvider};
