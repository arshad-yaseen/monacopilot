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
  externalContext: [{path: './utils.js', content: 'function test() {}'}],
  textAfterCursor: 'console.log(',
  textBeforeCursor: 'function hello() {',
  editorState: {
    completionMode: 'completion',
  },
};
