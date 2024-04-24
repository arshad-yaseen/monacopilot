import {CompletionModelType} from '../types/completion';

export const COMPLETION_SYSTEM_PROMPT = `Analyze the provided completion metadata to generate an ultra context-aware code completion that seamlessly continues from the cursor. Use 'fill-in' mode for gaps and 'extend' mode for new functionality, ensuring the snippet is executable, optimized, and error-free without repeating surrounding code. Output only the code snippet without any additional text or context.`;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType = 'llama3-70b-8192';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
