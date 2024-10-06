import {EditorDecorationOptions} from '../types';

export const PUNCTUATIONS = new Set([
  '"',
  "'",
  '`',
  '{',
  '}',
  '[',
  ']',
  '(',
  ')',
  ',',
  ' ',
  ':',
  '.',
]);

export const DIFF_ADDED_LINE_CLASS = 'monacopilot-diff-added-line';
export const DIFF_DELETED_LINE_CLASS = 'monacopilot-diff-deleted-line';
export const DIFF_DECORATION_DEFAULT_OPTIONS: EditorDecorationOptions = {
  isWholeLine: true,
  showIfCollapsed: true,
};
