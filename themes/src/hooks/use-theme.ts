import {useEffect} from 'react';

import {createHighlighter} from 'shiki';

import {registerTheme} from '../helpers/regiser';
import {Highligter, Monaco, UseThemeOptions} from '../types';

export const useTheme = (
  monaco: Monaco | null,
  {langs, themes, ...options}: UseThemeOptions,
) => {
  let _highlighter: Highligter | null = null;

  const getHighlighter = async () => {
    if (!_highlighter) {
      _highlighter = await createHighlighter({
        langs,
        themes,
      });
    }

    return _highlighter;
  };

  useEffect(() => {
    getHighlighter();
  }, []);

  useEffect(() => {
    if (!monaco || !_highlighter) {
      return;
    }

    registerTheme(_highlighter, monaco, options);
  }, [monaco, _highlighter, options]);
};
