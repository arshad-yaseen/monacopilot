import {vi} from 'vitest';

import {CompletionMetadata} from 'types/completion';
import {CursorPosition, EditorModel} from 'types/monaco';

export const MOCK_MODEL = {
  getLineContent: vi.fn(),
  getValueInRange: vi.fn(),
  getLineCount: vi.fn(),
  getLineMaxColumn: vi.fn(),
} as unknown as EditorModel;

export const MOCK_API_KEY = 'test-api-key';

export const MOCK_COMPLETION_METADATA: CompletionMetadata = {
  language: 'javascript',
  cursorPosition: {lineNumber: 1, column: 1},
  filename: 'test.js',
  technologies: ['react'],
  relatedFiles: [{path: './utils.js', content: 'function test() {}'}],
  textAfterCursor: 'console.log(',
  textBeforeCursor: 'function hello() {',
  editorState: {
    completionMode: 'complete',
  },
};

export const MOCK_COMPLETION_POS: CursorPosition = {
  lineNumber: 1,
  column: 1,
};

export const MOCK_COMPLETION_CONTENT = "Hi, I'm Claude.";

export const MOCK_COMPLETION = {
  content: [{type: 'text', text: MOCK_COMPLETION_CONTENT}],
};

export const MOCK_ERROR = new Error('API Error');
export const MOCK_NETWORK_ERROR = new Error('Network error');

export const TEST_PROVIDER = 'anthropic';
export const TEST_MODEL = 'claude-3-5-haiku';
