import {EditorBuiltInTheme, EditorOptions} from '../types/common';

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
};

export const EDITOR_BUILT_IN_THEMES: EditorBuiltInTheme[] = [
  'light',
  'vs-dark',
];
