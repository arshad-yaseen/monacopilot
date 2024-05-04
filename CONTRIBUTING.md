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

#### Adding or Editing Themes

##### Add a Theme

To add a new theme to Monacopilot:

1. Add a [VS Code-compatible theme]() JSON file to the `themes` directory at the root of the project.
2. Run the `pnpm generate-themes` script. This script automatically converts the added VS Code theme to a Monaco Editor compatible theme and updates the `Theme` type declaration with the new theme name.

If you are unfamiliar with what a VS Code theme JSON is, here is an example: [VS Code Theme JSON](https://github.com/codesandbox/vscode-theme/blob/main/themes/codesandbox-dark.json).

##### Edit an Existing Theme

To edit an existing theme:

1. Modify the desired theme's JSON file located in the `themes` directory at the project root.
2. Run `pnpm generate-themes` to apply the changes.

```bash
pnpm generate-themes
```

This command will read the theme you added/edited and automatically generate Monaco Editor-compatible theme data as if by magic. Additionally, it will automatically add the theme name to the theme type if you've added a new theme.

#### Contributing to the Documentation

If you wish to contribute to the documentation, use the following command:

```bash
pnpm dev:docs
```

Edit the `.mdx` files in the docs directory, and the documentation will refresh instantly, reflecting your changes.
