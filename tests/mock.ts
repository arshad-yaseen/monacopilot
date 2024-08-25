import {vi} from 'vitest';

import {EditorModel} from '../src/types';

export const mockModel = {
  getLineContent: vi.fn(),
  getValueInRange: vi.fn(),
  getLineCount: vi.fn(),
  getLineMaxColumn: vi.fn(),
} as unknown as EditorModel;

export const mockApiKey = 'test-api-key';
