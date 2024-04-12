import {EditorOptions} from './types';

export const DEFAULT_LANGUAGE: string = 'javascript';

export const EDITOR_DEFAULT_OPTIONS: EditorOptions = {
  scrollBeyondLastColumn: 0,
  scrollbar: {
    alwaysConsumeMouseWheel: false,
  },
  codeLens: false,
  minimap: {
    enabled: false,
  },
  inlineSuggest: {
    enabled: true,
    showToolbar: 'onHover',
    mode: 'subword',
    suppressSuggestions: false,
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
