/**
 * Converts VS Code themes to Monaco Editor themes.
 * This script scans the root `themes` directory to retrieve all VS Code themes,
 * then converts them into Monaco Editor-compatible themes.
 * The resulting Monaco themes are saved to the `themes.ts` file within the `src` directory.
 * Additionally, it updates the `ThemeType` type within the `editor-props.ts` file
 * to include the newly generated theme names.
 */

import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VSCODE_THEMES_DIR = path.resolve(__dirname, '../themes');
const THEMES_DOT_TS_FILE = path.resolve(__dirname, '../src/themes.ts');
const THEMES_TYPE_DEFINED_FILE = '../src/types/editor-props.ts';

const MONACO_COLOR_MAP = [
  'foreground',
  'errorForeground',
  'descriptionForeground',
  'focusBorder',
  'contrastBorder',
  'contrastActiveBorder',
  'selection.background',
  'textSeparator.foreground',
  'textLink.foreground',
  'textLink.activeForeground',
  'textPreformat.foreground',
  'textBlockQuote.background',
  'textBlockQuote.border',
  'textCodeBlock.background',
  'widget.shadow',
  'input.background',
  'input.foreground',
  'input.border',
  'inputOption.activeBorder',
  'input.placeholderForeground',
  'inputValidation.infoBackground',
  'inputValidation.infoBorder',
  'inputValidation.warningBackground',
  'inputValidation.warningBorder',
  'inputValidation.errorBackground',
  'inputValidation.errorBorder',
  'dropdown.background',
  'dropdown.foreground',
  'dropdown.border',
  'list.focusBackground',
  'list.focusForeground',
  'list.activeSelectionBackground',
  'list.activeSelectionForeground',
  'list.inactiveSelectionBackground',
  'list.inactiveSelectionForeground',
  'list.hoverBackground',
  'list.hoverForeground',
  'list.dropBackground',
  'list.highlightForeground',
  'pickerGroup.foreground',
  'pickerGroup.border',
  'button.foreground',
  'button.background',
  'button.hoverBackground',
  'badge.background',
  'badge.foreground',
  'scrollbar.shadow',
  'scrollbarSlider.background',
  'scrollbarSlider.hoverBackground',
  'scrollbarSlider.activeBackground',
  'progressBar.background',
  'editor.background',
  'editor.foreground',
  'editorWidget.background',
  'editorWidget.border',
  'editor.selectionBackground',
  'editor.selectionForeground',
  'editor.inactiveSelectionBackground',
  'editor.selectionHighlightBackground',
  'editor.findMatchBackground',
  'editor.findMatchHighlightBackground',
  'editor.findRangeHighlightBackground',
  'editor.hoverHighlightBackground',
  'editorHoverWidget.background',
  'editorHoverWidget.border',
  'editorLink.activeForeground',
  'diffEditor.insertedTextBackground',
  'diffEditor.removedTextBackground',
  'diffEditor.insertedTextBorder',
  'diffEditor.removedTextBorder',
  'editorOverviewRuler.currentContentForeground',
  'editorOverviewRuler.incomingContentForeground',
  'editorOverviewRuler.commonContentForeground',
  'editor.lineHighlightBackground',
  'editor.lineHighlightBorder',
  'editor.rangeHighlightBackground',
  'editorCursor.foreground',
  'editorWhitespace.foreground',
  'editorIndentGuide.background',
  'editorLineNumber.foreground',
  'editorLineNumber.activeForeground',
  'editorRuler.foreground',
  'editorCodeLens.foreground',
  'editorInlayHint.foreground',
  'editorInlayHint.background',
  'editorBracketMatch.background',
  'editorBracketMatch.border',
  'editorOverviewRuler.border',
  'editorGutter.background',
  'editorError.foreground',
  'editorError.border',
  'editorWarning.foreground',
  'editorWarning.border',
  'editorMarkerNavigationError.background',
  'editorMarkerNavigationWarning.background',
  'editorMarkerNavigation.background',
  'editorSuggestWidget.background',
  'editorSuggestWidget.border',
  'editorSuggestWidget.foreground',
  'editorSuggestWidget.selectedBackground',
  'editorSuggestWidget.highlightForeground',
  'editor.wordHighlightBackground',
  'editor.wordHighlightStrongBackground',
  'peekViewTitle.background',
  'peekViewTitleLabel.foreground',
  'peekViewTitleDescription.foreground',
  'peekView.border',
  'peekViewResult.background',
  'peekViewResult.lineForeground',
  'peekViewResult.fileForeground',
  'peekViewResult.selectionBackground',
  'peekViewResult.selectionForeground',
  'peekViewEditor.background',
  'peekViewEditorGutter.background',
  'peekViewResult.matchHighlightBackground',
  'peekViewEditor.matchHighlightBackground',
];

const parseColor = color => {
  if (!color) return [0, 0, 0];
  let r = 0,
    g = 0,
    b = 0;

  color = color.trim().toLowerCase();

  const hex = color.slice(1);
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }

  return [r, g, b];
};

const calculateDarkness = color => {
  const [r, g, b] = parseColor(color);
  // Use the ITU-R BT.709 formula for luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance / 255;
};

const removeHash = color => color.replace('#', '');

const normalizeColor = color => {
  // Make the color 6 digits long
  if (color.length === 3) {
    return color
      .split('')
      .map(char => char + char)
      .join('');
  }

  // Make the color capital case
  return color.toUpperCase();
};

const convertVsCodeThemeToMonaco = vsCodeTheme => {
  const {tokenColors, colors, semanticTokenColors} = vsCodeTheme;

  const base =
    colors['editor.background'] &&
    calculateDarkness(colors['editor.background']) < 0.5
      ? 'vs-dark'
      : 'vs';
  const monacoTheme = {
    base,
    inherit: true,
    rules: [],
    colors: {},
  };

  // Convert standard token colors
  tokenColors.forEach(token => {
    if (token.scope && token.settings) {
      const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
      scopes.forEach(scope => {
        if (!scope) return;
        monacoTheme.rules.push({
          token: scope,
          ...(token.settings.foreground && {
            foreground: normalizeColor(removeHash(token.settings.foreground)),
          }),
          ...(token.settings.fontStyle && {
            fontStyle: token.settings.fontStyle,
          }),
        });
      });
    }
  });

  // Convert semantic token colors if needed
  Object.keys(semanticTokenColors ?? {}).forEach(key => {
    monacoTheme.rules.push({
      token: key,
      ...(semanticTokenColors[key].foreground && {
        foreground: normalizeColor(
          removeHash(semanticTokenColors[key].foreground),
        ),
      }),
    });
  });

  // Convert global colors
  Object.keys(colors).forEach(colorKey => {
    const color = colors[colorKey];
    const isMonacoColor = MONACO_COLOR_MAP.includes(colorKey);
    // Only include colors that are supported by Monaco Editor
    if (isMonacoColor && color) {
      monacoTheme.colors[colorKey] = normalizeColor(color);
    }
  });

  return monacoTheme;
};

const processThemes = async () => {
  try {
    let themes = {};
    let themeNames = [];

    const vsCodeThemeFiles = await fs.readdir(VSCODE_THEMES_DIR);
    for (const themefile of vsCodeThemeFiles) {
      const filePath = path.join(VSCODE_THEMES_DIR, themefile);
      const themeContent = await fs.readFile(filePath, 'utf8');
      const vsCodeTheme = JSON.parse(themeContent);
      const monacoTheme = convertVsCodeThemeToMonaco(vsCodeTheme);
      const themeName = path.basename(themefile, '.json');
      themeNames.push(themeName);
      themes[themeName] = monacoTheme;
      console.log(`${themeName} ✅`);
    }

    const themesDotTsFileContent = `
    import { EditorThemeData } from './types/common';

    interface CustomThemeCollection {
      [key: string]: EditorThemeData;
    }

    /**
     * Themes for the Rich Monaco Editor.
     * This file is automatically generated by the 'generate-themes' script.
     * Do not manually modify this file. Instead, add themes to the 'themes' directory and run the script.
     */

    export default ${JSON.stringify(themes, null, 2)} as const satisfies CustomThemeCollection;
  `;

    // Write the themes to the themes.ts file in the src directory
    await fs.writeFile(THEMES_DOT_TS_FILE, themesDotTsFileContent);

    const themesType = `export type ThemeType = ${themeNames
      .map(name => `'${name}'`)
      .join(' | ')};`;

    const themesTypeRegex = /export type ThemeType\s*=\s*[^;]*;/s;

    // Replace the existing themes type in the types file
    const typesFile = path.resolve(__dirname, THEMES_TYPE_DEFINED_FILE);
    const typesFileContent = await fs.readFile(typesFile, 'utf8');
    const updatedTypesFileContent = typesFileContent.replace(
      themesTypeRegex,
      themesType,
    );

    // Write the updated types file
    await fs.writeFile(typesFile, updatedTypesFileContent);

    console.log('\nThemes processed successfully 🚀');
  } catch (error) {
    console.error('Failed to process themes:', error);
  }
};

processThemes();
