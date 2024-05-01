import {CompletionModelType} from '../types/completion';

export const PROMPT_CURSOR_POSITION_PLACEHOLDER = '{cursor_position}';
export const PROMPT_COMPLETION_MODE_PLACEHOLDER = '{completion_mode}';
export const PROMPT_LANGUAGE_PLACEHOLDER = '{language}';

export const COMPLETION_SYSTEM_PROMPT = `You are a professional ${PROMPT_LANGUAGE_PLACEHOLDER} code generator, known for your accuracy in code generation. Given the code editor metadata, generate a code snippet that is contextually, syntactically, and semantically appropriate for the current cursor position at ${PROMPT_CURSOR_POSITION_PLACEHOLDER}. Ensure that the snippet ${PROMPT_COMPLETION_MODE_PLACEHOLDER}. The snippet should not include any code from before the cursor position and must not introduce errors into the existing codebase. Output only the code snippet, without any additional texts or explanations, ready to be directly copied and pasted at the specified current cursor position.`;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType = 'llama3-70b-8192';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
