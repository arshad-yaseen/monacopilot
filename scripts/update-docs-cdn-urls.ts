import {execSync} from 'child_process';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

export function updateDocsCdnUrls(version: string): void {
    const docsDir = join(process.cwd(), 'docs');
    const files = ['index.md', 'examples/vanilla-js.md'];

    const packageJson = JSON.parse(
        readFileSync(
            join(process.cwd(), 'packages/monacopilot/package.json'),
            'utf-8',
        ),
    );
    const monacoVersion = packageJson.devDependencies['monaco-editor'].replace(
        '^',
        '',
    );

    for (const file of files) {
        const filePath = join(docsDir, file);
        let content = readFileSync(filePath, 'utf-8');

        content = content.replace(
            /https:\/\/unpkg\.com\/monacopilot@[^/]+/g,
            `https://unpkg.com/monacopilot@${version}`,
        );

        content = content.replace(
            /https:\/\/cdn\.jsdelivr\.net\/npm\/monacopilot@[^/]+/g,
            `https://cdn.jsdelivr.net/npm/monacopilot@${version}`,
        );

        content = content.replace(
            /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/monaco-editor\/[^/]+/g,
            `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${monacoVersion}`,
        );

        writeFileSync(filePath, content);
    }

    execSync('git add docs/');
    execSync(
        `git commit --no-verify -m "chore: update docs CDN URLs to version ${version}"`,
    );
}
