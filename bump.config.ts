import {defineConfig} from 'bumpp';

import {updateDocsCdnUrls} from './scripts/update-docs-cdn-urls';

export default defineConfig({
    files: ['package.json', 'packages/*/package.json'],
    execute: ({results: {newVersion}}) => {
        updateDocsCdnUrls(newVersion);
    },
});
