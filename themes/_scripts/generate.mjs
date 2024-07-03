/**
 * Converts VS Code themes to Monaco Editor themes.
 * This script scans the root `themes` directory to retrieve all VS Code themes,
 * then converts them into Monaco Editor-compatible themes.
 * The resulting Monaco themes are saved to their respective directories with `index.ts` and `package.json` files.
 */

import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VSCODE_THEMES_DIR = path.resolve(__dirname, '../_files');
const MONACO_THEMES_SAVE_LOCATION = path.resolve(__dirname, '../');

// Utility function to parse hex color codes
const parseColor = color => {
  if (!color) return [0, 0, 0];
  color = color.trim().toLowerCase();
  const hex = color.slice(1);

  if (hex.length === 3) {
    return [hex[0] + hex[0], hex[1] + hex[1], hex[2] + hex[2]].map(hexChar =>
      parseInt(hexChar, 16),
    );
  } else if (hex.length === 6) {
    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(hexChar =>
      parseInt(hexChar, 16),
    );
  }

  return [0, 0, 0];
};

// Calculate darkness of a color for theme base determination
const calculateDarkness = color => {
  const [r, g, b] = parseColor(color);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance / 255;
};

// Normalize color by removing hash and converting to uppercase
const normalizeColor = color => {
  if (typeof color !== 'string') return color;
  const hex = color.replace('#', '');
  return hex.length === 3
    ? hex
        .split('')
        .map(char => char + char)
        .join('')
        .toUpperCase()
    : hex.toUpperCase();
};

// Convert VS Code theme to Monaco Editor theme
const convertVsCodeThemeToMonaco = vsCodeTheme => {
  const {tokenColors, colors, semanticTokenColors} = vsCodeTheme;
  const base =
    calculateDarkness(colors['editor.background'] ?? '#ffffff') < 0.5
      ? 'vs-dark'
      : 'vs';

  const monacoTheme = {
    base,
    inherit: false,
    rules: [],
    colors: {},
  };

  // Process token colors
  tokenColors.forEach(token => {
    if (token.scope && token.settings) {
      const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
      scopes.forEach(scope => {
        if (!scope) return;
        const rule = {token: scope};
        if (token.settings.foreground)
          rule.foreground = normalizeColor(token.settings.foreground);
        if (token.settings.fontStyle) rule.fontStyle = token.settings.fontStyle;
        monacoTheme.rules.push(rule);
      });
    }
  });

  // Process semantic token colors
  Object.keys(semanticTokenColors ?? {}).forEach(key => {
    monacoTheme.rules.push({
      token: key,
      ...(semanticTokenColors[key].foreground && {
        foreground: normalizeColor(semanticTokenColors[key].foreground),
      }),
    });
  });

  // Process colors
  Object.keys(colors).forEach(colorKey => {
    const color = colors[colorKey];
    if (color && typeof color === 'string') {
      monacoTheme.colors[colorKey] = normalizeColor(color);
    }
  });

  return monacoTheme;
};

// Process themes
const processThemes = async () => {
  try {
    const themeFiles = await fs.readdir(VSCODE_THEMES_DIR);

    themeFiles.forEach(file => {
      if (!file.endsWith('.json'))
        throw new Error(`File \`${file}\` is not a .json file.`);
      if (file.includes(' '))
        throw new Error(`File \`${file}\` contains spaces.`);
      if (file !== file.toLowerCase())
        throw new Error(`File \`${file}\` contains uppercase letters.`);
    });

    for (const themeFile of themeFiles) {
      const filePath = path.join(VSCODE_THEMES_DIR, themeFile);
      const themeContent = await fs.readFile(filePath, 'utf8');
      const vsCodeTheme = JSON.parse(themeContent);
      const monacoTheme = convertVsCodeThemeToMonaco(vsCodeTheme);
      const themeName = path.basename(themeFile, '.json');
      const themeDir = path.join(MONACO_THEMES_SAVE_LOCATION, themeName);

      const themeFileContent = `import * as monaco from 'monaco-editor';
export default ${JSON.stringify(monacoTheme, null, 2)} as const satisfies monaco.editor.IStandaloneThemeData;`;

      await fs.mkdir(themeDir, {recursive: true});
      await fs.writeFile(
        path.join(themeDir, 'index.ts'),
        themeFileContent,
        'utf8',
      );

      let currentVersion = '1.0.0';
      try {
        currentVersion = JSON.parse(
          await fs.readFile(path.join(themeDir, 'package.json'), 'utf8'),
        ).version;
      } catch (e) {}

      const packageJsonContent = JSON.stringify(
        {
          name: `@monacopilot/${themeName}`,
          version: currentVersion,
          private: false,
          main: 'dist/index.js',
          types: 'dist/index.d.ts',
          scripts: {
            build: 'tsc --project tsconfig.json',
          },
          license: 'MIT',
          keywords: ['monacopilot', themeName],
          repository: {
            type: 'git',
            url: 'https://github.com/arshad-yaseen/monacopilot',
          },
          author: 'Arshad Yaseen <m@arshadyaseen.com>',
        },
        null,
        2,
      );

      const tsConfigContent = JSON.stringify(
        {
          extends: '../tsconfig.base.json',
          compilerOptions: {
            outDir: './dist',
            rootDir: './',
          },
          include: ['./index.ts'],
        },
        null,
        2,
      );

      await fs.writeFile(
        path.join(themeDir, 'package.json'),
        packageJsonContent,
        'utf8',
      );

      await fs.writeFile(
        path.join(themeDir, 'tsconfig.json'),
        tsConfigContent,
        'utf8',
      );
    }

    console.log('\nThemes processed successfully 🚀');
  } catch (error) {
    console.error(error);
  }
};

processThemes();
