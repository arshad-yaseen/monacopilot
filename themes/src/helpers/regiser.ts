import {TokenizerState} from '../classes/tokenizer';
import {
  INITIAL,
  Monaco,
  MonacoTheme,
  ShikiInternal,
  StackElementMetadata,
  UseThemeOptions,
} from '../types';
import {normalizeColor} from '../utils';
import {textmateThemeToMonacoTheme} from './converters';

export const registerTheme = (
  highlighter: ShikiInternal<any, any>,
  monaco: Monaco,
  options: Omit<UseThemeOptions, 'langs' | 'themes'> = {},
) => {
  // Convert themes to Monaco themes and register them
  const themeMap = new Map<string, MonacoTheme>();
  const themeIds = highlighter.getLoadedThemes();
  for (const themeId of themeIds) {
    const tmTheme = highlighter.getTheme(themeId);
    const monacoTheme = textmateThemeToMonacoTheme(tmTheme);
    themeMap.set(themeId, monacoTheme);
    monaco.editor.defineTheme(themeId, monacoTheme);
  }

  const colorMap: string[] = [];
  const colorToScopeMap = new Map<string, string>();

  // Because Monaco does not have the API of reading the current theme,
  // We hijack it here to keep track of the current theme.
  const _setTheme = monaco.editor.setTheme.bind(monaco.editor);
  monaco.editor.setTheme = (themeName: string) => {
    const ret = highlighter.setTheme(themeName);
    const theme = themeMap.get(themeName);
    colorMap.length = ret.colorMap.length;
    ret.colorMap.forEach((color, i) => {
      colorMap[i] = color;
    });
    colorToScopeMap.clear();
    theme?.rules.forEach(rule => {
      const c = normalizeColor(rule.foreground);
      if (c && !colorToScopeMap.has(c)) colorToScopeMap.set(c, rule.token);
    });
    _setTheme(themeName);
  };

  // Set the first theme as the default theme
  monaco.editor.setTheme(themeIds[0]);

  function findScopeByColor(color: string) {
    return colorToScopeMap.get(color);
  }

  const {tokenizeMaxLineLength = 20000, tokenizeTimeLimit = 500} = options;

  const monacoLanguageIds = new Set(
    monaco.languages.getLanguages().map(l => l.id),
  );
  for (const lang of highlighter.getLoadedLanguages()) {
    if (monacoLanguageIds.has(lang)) {
      monaco.languages.setTokensProvider(lang, {
        getInitialState() {
          return new TokenizerState(INITIAL);
        },
        tokenize(line, state: TokenizerState) {
          if (line.length >= tokenizeMaxLineLength) {
            return {
              endState: state,
              tokens: [{startIndex: 0, scopes: ''}],
            };
          }

          const grammar = highlighter.getLanguage(lang);
          const result = grammar.tokenizeLine2(
            line,
            state.ruleStack,
            tokenizeTimeLimit,
          );

          if (result.stoppedEarly)
            console.warn(
              `Time limit reached when tokenizing line: ${line.substring(0, 100)}`,
            );

          const tokensLength = result.tokens.length / 2;
          const tokens: any[] = [];
          for (let j = 0; j < tokensLength; j++) {
            const startIndex = result.tokens[2 * j];
            const metadata = result.tokens[2 * j + 1];
            const color = normalizeColor(
              colorMap[StackElementMetadata.getForeground(metadata)] || '',
            );
            // Because Monaco only support one scope per token,
            // we workaround this to use color to trace back the scope
            const scope = findScopeByColor(color) || '';
            tokens.push({startIndex, scopes: scope});
          }

          return {endState: new TokenizerState(result.ruleStack), tokens};
        },
      });
    }
  }
};
