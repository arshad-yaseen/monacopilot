import {EditorOptions} from '../types/common';

export const DEFAULT_LANGUAGE: string = 'javascript';

export const EDITOR_DEFAULT_OPTIONS: EditorOptions = {
  scrollBeyondLastColumn: 0,
  codeLens: false,
  minimap: {
    enabled: false,
  },
  quickSuggestions: false,
  inlineSuggest: {
    enabled: true,
    mode: 'prefix',
  },
  folding: false,
  foldingHighlight: false,
  foldingImportsByDefault: false,
  links: false,
  fontSize: 14,
  wordWrap: 'on',
  automaticLayout: true,
};
