import {CompletionModelType} from '../types/completion';

export const COMPLETION_SYSTEM_PROMPT = `Generate a syntactically correct and context-aware code snippet based on the specified metadata. The snippet should integrate seamlessly with the existing code immediately before the cursor position and provide a natural extension into the subsequent code, avoiding redundancy. Use 'fill-in' mode to bridge small gaps directly around the cursor, and 'extend' mode to introduce meaningful new functionality relevant to the ongoing code context. Ensure that the generated code is immediately executable, optimized for the current development environment, and free from syntax errors. Output only the completion code itself without any other texts.`;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType = 'llama3-70b-8192';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
