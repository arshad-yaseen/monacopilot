/**
 * Converts textmate themes to Monaco Editor themes.
 * This script scans the root themes/_files directory to retrieve all textmate themes,
 * then converts them into Monaco Editor-compatible themes.
 * The resulting Monaco themes are saved to their respective directories with index.ts and package.json files.
 */

import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VSCODE_THEMES_DIR = path.resolve(__dirname, '../_files');
const MONACO_THEMES_SAVE_LOCATION = path.resolve(__dirname, '../');

const RED_COEFFICIENT = 0.2126;
const GREEN_COEFFICIENT = 0.7152;
const BLUE_COEFFICIENT = 0.0722;

const normalizeColor = color => {
  if (typeof color !== 'string') return color;
  color = color.charCodeAt(0) === 35 ? color.slice(1) : color.toLowerCase();
  if (color.length === 3 || color.length === 4) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  return color;
};

const parseColor = hex => {
  hex = normalizeColor(hex);
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const calculateDarkness = color => {
  const [r, g, b] = parseColor(color);
  const luminance =
    RED_COEFFICIENT * r + GREEN_COEFFICIENT * g + BLUE_COEFFICIENT * b;
  return luminance / 255;
};

const textmateThemeToMonacoTheme = theme => {
  let rules = 'rules' in theme ? theme.rules : undefined;

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

  const base = theme.type
    ? theme.type === 'light'
      ? 'vs'
      : 'vs-dark'
    : calculateDarkness(colors['editor.background']) > 0.5
      ? 'vs'
      : 'vs-dark';

  return {
    base,
    inherit: false,
    colors,
    rules,
  };
};

const validateThemeFile = file => {
  if (!file.endsWith('.json'))
    throw new Error(`File ${file} is not a .json file.`);
  if (file.includes(' ')) throw new Error(`File ${file} contains spaces.`);
  if (file !== file.toLowerCase())
    throw new Error(`File ${file} contains uppercase letters.`);
};

const processThemeFile = async themeFile => {
  const filePath = path.join(VSCODE_THEMES_DIR, themeFile);
  const tmTheme = JSON.parse(await fs.readFile(filePath, 'utf8'));
  const monacoTheme = textmateThemeToMonacoTheme(tmTheme);
  const themeName = path.basename(themeFile, '.json');
  const themeDir = path.join(MONACO_THEMES_SAVE_LOCATION, themeName);

  await fs.mkdir(themeDir, {recursive: true});

  const themeFileContent = `import * as monaco from 'monaco-editor';
export default ${JSON.stringify(monacoTheme, null, 2)} as const satisfies monaco.editor.IStandaloneThemeData;`;

  await fs.writeFile(path.join(themeDir, 'index.ts'), themeFileContent, 'utf8');
  await fs.writeFile(
    path.join(themeDir, 'package.json'),
    createPackageJsonContent(themeName),
    'utf8',
  );
  await fs.writeFile(
    path.join(themeDir, 'tsconfig.json'),
    createTsConfigContent(),
    'utf8',
  );
};

const createPackageJsonContent = themeName =>
  JSON.stringify(
    {
      name: `@monacopilot/${themeName}`,
      version: getCurrentVersion(themeName),
      main: 'dist/index.js',
      types: 'dist/index.d.ts',
      files: ['dist'],
      scripts: {build: 'tsc --project tsconfig.json'},
      license: 'MIT',
      keywords: ['monacopilot', themeName],
      homepage: 'https://monacopilot.vercel.app/themes',
      repository: {
        type: 'git',
        url: 'https://github.com/arshad-yaseen/monacopilot',
      },
      author: 'Arshad Yaseen <m@arshadyaseen.com>',
      publishConfig: {access: 'public'},
    },
    null,
    2,
  );

const createTsConfigContent = () =>
  JSON.stringify(
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

const getCurrentVersion = async themeDir => {
  try {
    const packageJson = await fs.readFile(
      path.join(themeDir, 'package.json'),
      'utf8',
    );
    return JSON.parse(packageJson).version;
  } catch {
    return '1.0.0';
  }
};

const processThemes = async () => {
  try {
    const themeFiles = await fs.readdir(VSCODE_THEMES_DIR);
    themeFiles.forEach(validateThemeFile);
    await Promise.all(themeFiles.map(processThemeFile));
    console.log('\nThemes processed successfully 🎉\n');
  } catch (error) {
    console.error(error);
  }
};

processThemes();
