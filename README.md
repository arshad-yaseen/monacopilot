# Monacopilot: The GitHub Copilot for Web

## Documentation

[https://monacopilot.vercel.app/docs](https://monacopilot.vercel.app/docs)

## Contributing to Monacopilot

### Installation

The Monacopilot repository uses [PNPM Workspaces](https://pnpm.io/workspaces) and [Tsup](https://tsup.egoist.dev/). To install dependencies, run `pnpm install` in the project root directory.

### Building the Package

To build the package, execute the following command:

```bash
 pnpm build
```

Alternatively, `pnpm dev` to start the watch mode for automatic rebuilds on file changes.

### Testing Monacopilot Locally

To test Monacopilot locally, run:

```bash
pnpm dev:test
```

### Contributing to the Documentation

If you wish to contribute to the documentation, use the following command:

```bash
pnpm dev:docs
```

Edit the `.mdx` files in the docs directory, and the documentation will refresh instantly, reflecting your changes.

We welcome contributions from the community to enhance Monacopilot's capabilities and make it even more powerful ❤️
