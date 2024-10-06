import {ModifyRequestHandler, RegisterModifyOptions} from '../../types';

/**
 * Fetches the modified code from the AI model.
 * @param originalCode - The original selected code.
 * @param prompt - The user's prompt.
 * @param options - Options for the modify functionality.
 * @returns A promise resolving to the modified code string.
 */
export const fetchModifiedCode = async (
  originalCode: string,
  prompt: string,
  options: RegisterModifyOptions,
): Promise<string> => {
  const {endpoint, requestHandler} = options;

  const requestPayload = {
    originalCode,
    prompt,
  };

  const response = await (requestHandler ?? defaultModifyRequestHandler)(
    endpoint,
    requestPayload,
  );

  return response.modifiedCode;
};

/**
 * Default request handler for fetching modified code.
 * @param endpoint - The API endpoint.
 * @param payload - The request payload.
 * @returns A promise resolving to the response.
 */
const defaultModifyRequestHandler: ModifyRequestHandler = async (
  endpoint,
  payload,
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch modified code');
  }

  return response.json();
};
