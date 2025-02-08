import {defineConfig} from 'vitepress';

import {version} from '../../package.json';

export default defineConfig({
    title: 'Monacopilot',
    description: 'AI auto-completion plugin for Monaco Editor',
    themeConfig: {
        logo: '/logo.svg',
        nav: [
            {
                text: `v${version}`,
                items: [
                    {
                        text: `Release Notes`,
                        link: 'https://github.com/arshad-yaseen/monacopilot/releases',
                    },
                    {
                        text: `Contributing`,
                        link: 'https://github.com/arshad-yaseen/monacopilot/blob/main/CONTRIBUTING.md',
                    },
                ],
            },
        ],
        editLink: {
            pattern:
                'https://github.com/arshad-yaseen/monacopilot/edit/main/docs/:path',
            text: 'Suggest changes to this page',
        },
        search: {
            provider: 'local',
        },
        footer: {
            message: 'Released under the MIT License.',
        },
        sidebar: [
            {
                text: 'Getting Started',
                items: [{text: 'Quick Start', link: '/'}],
            },
            {
                text: 'Configuration',
                items: [
                    {
                        text: 'Register Options',
                        link: '/configuration/register-options',
                    },
                    {
                        text: 'Copilot Options',
                        link: '/configuration/copilot-options',
                    },
                    {
                        text: 'Request Options',
                        link: '/configuration/request-options',
                    },
                ],
            },
            {
                text: 'Advanced',
                items: [
                    {text: 'Custom Model', link: '/advanced/custom-model'},
                    {
                        text: 'Custom Request Handler',
                        link: '/advanced/custom-request-handler',
                    },
                    {
                        text: 'Cross-Language Implementation',
                        link: '/advanced/cross-language',
                    },
                ],
            },
            {
                text: 'Guides',
                items: [
                    {
                        text: 'User-Selectable Models',
                        link: '/guides/user-selectable-models',
                    },
                ],
            },
            {
                text: 'Examples',
                items: [
                    {text: 'Next.js', link: '/examples/nextjs'},
                    {text: 'Remix', link: '/examples/remix'},
                ],
            },
        ],

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/arshad-yaseen/monacopilot',
            },
        ],
    },
    head: [
        ['meta', {name: 'theme-color', content: '#ffffff'}],
        ['link', {rel: 'icon', href: '/logo.svg', type: 'image/svg+xml'}],
        ['meta', {name: 'author', content: 'Arshad Yaseen'}],
        ['meta', {property: 'og:title', content: 'Monacopilot'}],
        [
            'meta',
            {
                property: 'og:image',
                content: 'https://copilot.arshadyaseen.com/og.png',
            },
        ],
        [
            'meta',
            {
                property: 'og:description',
                content:
                    'AI auto-completion plugin for Monaco Editor, inspired by GitHub Copilot.',
            },
        ],
        ['meta', {name: 'twitter:card', content: 'summary_large_image'}],
        [
            'meta',
            {
                name: 'twitter:image',
                content: 'https://copilot.arshadyaseen.com/og.png',
            },
        ],
        [
            'meta',
            {
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1.0, viewport-fit=cover',
            },
        ],
    ],
});
