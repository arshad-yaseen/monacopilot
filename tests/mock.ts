import {vi} from 'vitest';

import {CompletionMetadata, EditorModel} from '../src/types';

export const mockModel = {
  getLineContent: vi.fn(),
  getValueInRange: vi.fn(),
  getLineCount: vi.fn(),
  getLineMaxColumn: vi.fn(),
} as unknown as EditorModel;

export const mockApiKey = 'test-api-key';

export const mockCompletionMetadata: CompletionMetadata = {
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

export const MOCK_COMPLETION_CONTENT = "Hi, I'm Claude.";

export const mockCompletion = {
  content: [{type: 'text', text: MOCK_COMPLETION_CONTENT}],
};

export const mockError = new Error('API Error');
export const mockNetworkError = new Error('Network error');

export const TEST_PROVIDER = 'anthropic';
export const TEST_MODEL = 'claude-3-5-haiku';
