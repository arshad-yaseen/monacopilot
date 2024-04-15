import {CompletionModelType, CompletionProviderType} from '../types/completion';

export const COMPLETION_PROMPT = `As an AI specialized in code completion, your task is to analyze the provided code snippet in {language}. Replace the placeholder \`{predict_code_here}\` with code that adheres to modern coding practices and precise syntax. Ensure that the completion logically and syntactically extends the existing code. Return the predicted code within a JSON object, using the key \`predicted_next_code\`. Ensure that the result follows JSON formatting standards for easy integration.`;

export const DEFAULT_COMPLETION_PROVIDER: CompletionProviderType = 'openai';
export const DEFAULT_COMPLETION_MODEL: CompletionModelType =
  'gpt-3.5-turbo-0125';

export const PROVIDER_API_ENDPOINTS: Record<CompletionProviderType, string> = {
  openai: 'https://api.openai.com/v1/chat/completions',
  mistral: 'https://api.mistral.ai/v1/chat/completions',
};

export const COMPLETION_PROVIDER_OF_: Record<
  CompletionModelType,
  CompletionProviderType
> = {
  'gpt-3.5-turbo-0125': 'openai',
  'gpt-4-turbo-2024-04-09': 'openai',
  'open-mixtral-8x7b': 'mistral',
};
