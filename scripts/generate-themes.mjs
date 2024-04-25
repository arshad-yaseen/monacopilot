import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

import plist from 'fast-plist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THEMES_DIR_PATH = '../themes';
const THEMES_FILE_PATH = '../src/themes.ts';
const THEMES_TYPE_DECLARED_FILE_PATH = '../src/types/editor-props.ts';

const rgbColor = color => {
  if (typeof color === 'object') return color;
  if (color[0] === '#')
    return color
      .match(/^#(..)(..)(..)/)
      .slice(1)
      .map(c => parseInt(c, 16));
  else
    return color
      .match(/\(([^,]+),([^,]+),([^,]+)/)
      .slice(1)
      .map(c => parseInt(c, 10));
};

const darkness = color => {
  const rgb = rgbColor(color);
  return (0.21 * rgb[0] + 0.72 * rgb[1] + 0.07 * rgb[2]) / 255;
};

const parseColor = color => {
  if (!color.length) return null;
  if (color.length === 4) color = color.replace(/[a-fA-F\d]/g, '$&$&');
  if (color.length === 7 || color.length === 9) return color; // substr(0, 7);
  if (!color.match(/^#(..)(..)(..)(..)$/))
    console.error("can't parse color", color);
  let rgba = color
    .match(/^#(..)(..)(..)(..)$/)
    .slice(1)
    .map(c => parseInt(c, 16));
  rgba[3] = (rgba[3] / 0xff).toPrecision(2);
  return `rgba(${rgba.join(', ')})`;
};

/**
 * Mapping from Visual Studio Code theme compatibility.
 * @see https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/themes/common/themeCompatibility.ts
 */
const COLOR_MAP = [
  {tm: 'foreground', mn: 'editor.foreground'},
  {tm: 'background', mn: 'editor.background'},
  {tm: 'selection', mn: 'editor.selectionBackground'},
  {tm: 'inactiveSelection', mn: 'editor.inactiveSelectionBackground'},
  {tm: 'selectionHighlightColor', mn: 'editor.selectionHighlightBackground'},
  {tm: 'findMatchHighlight', mn: 'editor.findMatchHighlightBackground'},
  {tm: 'currentFindMatchHighlight', mn: 'editor.findMatchBackground'},
  {tm: 'hoverHighlight', mn: 'editor.hoverHighlightBackground'},
  {tm: 'wordHighlight', mn: 'editor.wordHighlightBackground'},
  {tm: 'wordHighlightStrong', mn: 'editor.wordHighlightStrongBackground'},
  {tm: 'findRangeHighlight', mn: 'editor.findRangeHighlightBackground'},
  {tm: 'findMatchHighlight', mn: 'peekViewResult.matchHighlightBackground'},
  {tm: 'referenceHighlight', mn: 'peekViewEditor.matchHighlightBackground'},
  {tm: 'lineHighlight', mn: 'editor.lineHighlightBackground'},
  {tm: 'rangeHighlight', mn: 'editor.rangeHighlightBackground'},
  {tm: 'caret', mn: 'editorCursor.foreground'},
  {tm: 'invisibles', mn: 'editorWhitespace.foreground'},
  {tm: 'guide', mn: 'editorIndentGuide.background'},
  {tm: 'activeGuide', mn: 'editorIndentGuide.activeBackground'},
  {tm: 'selectionBorder', mn: 'editor.selectionHighlightBorder'},
];

const ansiColorMap = [
  'ansiBlack',
  'ansiRed',
  'ansiGreen',
  'ansiYellow',
  'ansiBlue',
  'ansiMagenta',
  'ansiCyan',
  'ansiWhite',
  'ansiBrightBlack',
  'ansiBrightRed',
  'ansiBrightGreen',
  'ansiBrightYellow',
  'ansiBrightBlue',
  'ansiBrightMagenta',
  'ansiBrightCyan',
  'ansiBrightWhite',
];

ansiColorMap.forEach(color => {
  COLOR_MAP.push({
    tm: color,
    mn: `terminal.${color}`,
  });
});

const GUTTER_COLOR_MAP = [];

const parseTmTheme = rawTmThemeString => {
  const rawData = plist.parse(rawTmThemeString);
  const globalSettings = rawData.settings[0].settings;
  const gutterSettings = rawData.gutterSettings;
  const rules = [];

  rawData.settings.forEach(setting => {
    if (!setting.settings) {
      return;
    }

    let scopes;

    if (typeof setting.scope === 'string') {
      scopes = setting.scope
        .replace(/^[,]+/, '')
        .replace(/[,]+$/, '')
        .split(',');
    } else if (Array.isArray(setting.scope)) {
      scopes = setting.scope;
    } else {
      scopes = [''];
    }

    const rule = {};
    const settings = setting.settings;

    if (settings.foreground) {
      rule.foreground = parseColor(settings.foreground)
        .toLowerCase()
        .replace('#', '');
    }

    if (settings.background) {
      rule.background = parseColor(settings.background)
        .toLowerCase()
        .replace('#', '');
    }

    if (settings.fontStyle && typeof settings.fontStyle === 'string') {
      rule.fontStyle = settings.fontStyle;
    }

    scopes.forEach(scope => {
      if (!scope || !Object.keys(rule).length) {
        return;
      }
      const r = {...rule, token: scope.trim()};
      rules.push(r);
    });
  });

  const globalColors = {};

  COLOR_MAP.forEach(obj => {
    if (globalSettings[obj.tm]) {
      globalColors[obj.mn] = parseColor(globalSettings[obj.tm]);
    }
  });

  if (gutterSettings) {
    GUTTER_COLOR_MAP.forEach(obj => {
      if (gutterSettings[obj.tm]) {
        globalColors[obj.mn] = parseColor(gutterSettings[obj.tm]);
      }
    });
  }

  return {
    base: darkness(globalColors['editor.background']) < 0.5 ? 'vs-dark' : 'vs',
    inherit: true,
    rules: rules,
    colors: globalColors,
  };
};

const readAndProcessThemes = async () => {
  const themesDir = path.resolve(__dirname, THEMES_DIR_PATH);

  try {
    const files = await fs.readdir(themesDir);
    const themeTmFiles = await Promise.all(
      files.map(async file => {
        const content = await fs.readFile(path.join(themesDir, file), 'utf-8');
        return {[file]: content};
      }),
    );

    let themesFileContent = '';
    let themesType = [];

    for (const file of themeTmFiles) {
      const fileName = Object.keys(file)[0];
      const newFileName =
        fileName
          .replace(/\.(tmtheme|tmTheme)$/, '')
          .replace(/[\s_,.()]+/g, '-')
          .replace(/-+$/, '')
          .toLowerCase() + '.tmTheme';

      await fs.rename(
        path.join(themesDir, fileName),
        path.join(themesDir, newFileName),
      );

      const themeName = newFileName.replace(/\.tmTheme$/, '');
      const json = JSON.stringify(parseTmTheme(file[fileName]));
      themesFileContent += `"${themeName}": ${json},\n`;
      themesType.push(`'${themeName}'`);
    }

    const themesFilePath = path.resolve(__dirname, THEMES_FILE_PATH);
    const themesFileData = `
      import { EditorThemeData } from './types/common';

      interface CustomThemeCollection {
        [key: string]: EditorThemeData;
      }

      /**
       * Themes for the Rich Monaco Editor.
       * This file is automatically generated by the 'generate-themes' script.
       * Do not manually modify this file. Instead, add themes to the 'themes' directory and run the script.
       */

      export default {
        ${themesFileContent}
      } as const satisfies CustomThemeCollection;
    `;

    await fs.writeFile(themesFilePath, themesFileData);

    const themesTypeFilePath = path.resolve(
      __dirname,
      THEMES_TYPE_DECLARED_FILE_PATH,
    );
    let existingThemesTypeFileContent = await fs.readFile(
      themesTypeFilePath,
      'utf-8',
    );
    const themesTypeData = `export type ThemeType = ${themesType.join(' | ')};`;

    const typeDeclarationRegex = /export type ThemeType\s*=\s*[^;]*;/s;

    // Replace existing ThemeType definition
    existingThemesTypeFileContent = existingThemesTypeFileContent.replace(
      typeDeclarationRegex,
      themesTypeData,
    );

    await fs.writeFile(themesTypeFilePath, existingThemesTypeFileContent);
    console.log('Themes processed successfully!');
  } catch (error) {
    console.error('Error processing themes:', error);
  }
};

readAndProcessThemes();
