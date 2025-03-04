import {execSync} from 'child_process';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

export function updateDocsCdnUrls(version: string): void {
    const docsDir = join(process.cwd(), 'docs');
    const files = ['index.md', 'examples/vanilla-js.md'];

    for (const file of files) {
        const filePath = join(docsDir, file);
        let content = readFileSync(filePath, 'utf-8');

        // Update unpkg CDN URL
        content = content.replace(
            /https:\/\/unpkg\.com\/monacopilot@[^/]+/g,
            `https://unpkg.com/monacopilot@${version}`,
        );

        // Update jsdelivr CDN URL
        content = content.replace(
            /https:\/\/cdn\.jsdelivr\.net\/npm\/monacopilot@[^/]+/g,
            `https://cdn.jsdelivr.net/npm/monacopilot@${version}`,
        );

        writeFileSync(filePath, content);
    }

    execSync('git add docs/');
}
