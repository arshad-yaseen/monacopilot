import {FloatingPosition} from './types';

export const FOCUSABLE_ELEMENTS_QUERY = `
  a[href]:not([tabindex^="-"]),
  area[href]:not([tabindex^="-"]),
  input:not([disabled]):not([tabindex^="-"]),
  select:not([disabled]):not([tabindex^="-"]),
  textarea:not([disabled]):not([tabindex^="-"]),
  button:not([disabled]):not([tabindex^="-"]),
  iframe:not([tabindex^="-"]),
  [tabindex]:not([tabindex^="-"]),
  [contenteditable]:not([tabindex^="-"]),
  audio[controls]:not([tabindex^="-"]),
  video[controls]:not([tabindex^="-"]),
  [role="button"]:not([tabindex^="-"]),
  [role="link"]:not([tabindex^="-"]),
  object[usemap]:not([tabindex^="-"])
  `;

export const DEFAULT_POPOVER_POSITION: FloatingPosition = 'bottom';
