import {MonacoTheme, ThemeRegistrationResolved} from '../types';
import {normalizeColor} from '../utils';

export const textmateThemeToMonacoTheme = (
  theme: ThemeRegistrationResolved,
): MonacoTheme => {
  let rules =
    'rules' in theme ? (theme.rules as MonacoTheme['rules']) : undefined;

  if (!rules) {
    rules = [];
    const themeSettings = theme.settings || theme.tokenColors;
    for (const {scope, settings} of themeSettings) {
      const scopes = Array.isArray(scope) ? scope : [scope];
      for (const s of scopes) {
        if (settings?.foreground && s) {
          rules.push({
            token: s,
            foreground: normalizeColor(settings.foreground),
          });
        }
      }
    }
  }

  const colors = Object.fromEntries(
    Object.entries(theme.colors || {}).map(([key, value]) => [
      key,
      `#${normalizeColor(value)}`,
    ]),
  );

  return {
    base: theme.type === 'light' ? 'vs' : 'vs-dark',
    inherit: false,
    colors,
    rules,
  };
};
