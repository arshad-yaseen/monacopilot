module.exports = {
  git: {
    commitMessage: 'Bump v${version}',
    tagName: 'v${version}',
    requireCommits: true,
    requireCleanWorkingDir: true,
  },
  github: {
    release: true,
    draft: true,
    releaseName: 'Monacopilot v${version}',
    commitArgs: ['-S'],
    tagArgs: ['-s'],
    assets: ['tar/*.tgz'],
  },
  npm: {
    publish: true,
  },
  hooks: {
    'before:init': ['pnpm build', 'pnpm pre-commit'],
  },
};
