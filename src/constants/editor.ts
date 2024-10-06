import {EditorDecorationOptions} from '../types';
import {className} from '../utils';

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

export const DIFF_ADDED_LINE_CLASS = className('diff-added-line');
export const DIFF_DELETED_LINE_CLASS = className('diff-deleted-line');
export const DIFF_DECORATION_DEFAULT_OPTIONS: EditorDecorationOptions = {
  isWholeLine: true,
  showIfCollapsed: true,
};
