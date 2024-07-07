import {EditorOptions} from '../types';

export const EDITOR_DEFAULT_OPTIONS: EditorOptions = {
  scrollBeyondLastColumn: 0,
  codeLens: false,
  minimap: {
    enabled: false,
  },
  quickSuggestions: false,
  folding: false,
  foldingHighlight: false,
  foldingImportsByDefault: false,
  links: false,
  fontSize: 14,
  wordWrap: 'on',
  automaticLayout: true,
  formatOnPaste: true,
  inlineSuggest: {
    enabled: true,
    mode: undefined,
  },
};
