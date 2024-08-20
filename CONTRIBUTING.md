## Contributing to Monacopilot

#### Installation

The Monacopilot repository uses [PNPM Workspaces](https://pnpm.io/workspaces) and [Tsup](https://tsup.egoist.dev/). To install dependencies, run `pnpm install` in the project root directory.

#### Building the Package

To build the package, execute the following command:

```bash
 pnpm build
```

Alternatively, `pnpm dev` to start the watch mode for automatic rebuilds on file changes.

#### Testing Monacopilot Locally

To test Monacopilot locally, first, you need to set the Groq API key as an environment variable in the `test` directory root within the `.env.local` file.

```plaintext
GROQ_API_KEY=your_api_key
```

Then, run:

```bash
pnpm dev:test
```
