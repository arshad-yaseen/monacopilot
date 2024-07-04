module.exports = {
  git: {
    commitMessage: 'Bump themes v${version}',
    requireCommits: true,
    requireCleanWorkingDir: true,
  },
  github: {
    draft: true,
    commitArgs: ['-S'],
  },
  npm: {
    publish: true,
  },
  hooks: {
    'before:init': ['pnpm build'],
  },
};
