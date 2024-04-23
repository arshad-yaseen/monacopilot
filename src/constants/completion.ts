import {CompletionModelType} from '../types/completion';

export const COMPLETION_SYSTEM_PROMPT = `Generate a syntactically correct and contextually integrated code completion based on the provided metadata. The completion should seamlessly connect with the code before the cursor and appropriately transition into the code after the cursor, enhancing functionality without duplicating existing code. Utilize 'fill-in' mode to complete any immediate gaps and 'extend' mode to add substantial new content, as dictated by the metadata context. Ensure the completion is immediately executable and tailored to the current code state and environment. Output only the completion code itself without any other texts.`;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType = 'llama3-70b-8192';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
