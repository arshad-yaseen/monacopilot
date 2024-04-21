export const callLlmProvider = async (
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
    throw new Error(
      `Failed to fetch from the provider: ${response.status} - ${response.statusText}`,
    );
  }
  return response.json();
};
