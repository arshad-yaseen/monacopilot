import * as _monaco from 'monaco-editor';
import {BundledLanguage, BundledTheme, HighlighterGeneric} from 'shiki';

export interface UseThemeOptions {
  /**
   * Language registation
   * @default []
   */
  langs: BundledLanguage[];
  /**
   * Theme registation
   * @default []
   */
  themes: BundledTheme[];
  /**
   * The maximum length of a line to tokenize.
   *
   * @default 20000
   */
  tokenizeMaxLineLength?: number;
  /**
   * The time limit in milliseconds for tokenizing a line.
   *
   * @default 500
   */
  tokenizeTimeLimit?: number;
}

export type {ShikiInternal, ThemeRegistrationResolved} from '@shikijs/core';
export type {StateStack} from '@shikijs/core/textmate';
export {INITIAL, StackElementMetadata} from '@shikijs/core/textmate';

export interface MonacoTheme extends _monaco.editor.IStandaloneThemeData {}

export type Monaco = typeof _monaco;

export type Highligter = HighlighterGeneric<BundledLanguage, BundledTheme>;

export type LanguagesState = _monaco.languages.IState;
