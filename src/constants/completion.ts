import {CompletionModelType} from '../types/completion';

export const PROMPT_CURSOR_POSITION_PLACEHOLDER = '{cursor_position}';

export const COMPLETION_SYSTEM_PROMPT = `Based on the code surrounding the current cursor position at ${PROMPT_CURSOR_POSITION_PLACEHOLDER}, generate a code snippet that fits contextually. Output only the code snippet, without any surrounding context, to ensure it is easy to copy, paste, or insert at the cursor position ${PROMPT_CURSOR_POSITION_PLACEHOLDER}.`;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType = 'llama3-70b-8192';

export const GROQ_API_ENDPOINT =
  'https://api.groq.com/openai/v1/chat/completions';
