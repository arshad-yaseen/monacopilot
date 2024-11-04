Sure, here is the updated contributing guide with the specified files included in the file structure and the table below it:

# Contributing to Monacopilot

Thank you for your interest in contributing to Monacopilot! We're thrilled to have you on board. By contributing, you’re helping to make Monacopilot better for everyone. Please take a moment to review this guide before getting started.

If you have any questions or need assistance, feel free to open an issue on GitHub.

## Table of Contents

- [About This Repository](#about-this-repository)
- [Repository Structure](#repository-structure)
- [Development](#development)
  - [Fork the Repository](#fork-the-repository)
  - [Clone the Repository](#clone-the-repository)
  - [Navigate to Project Directory](#navigate-to-project-directory)
  - [Create a New Branch](#create-a-new-branch)
  - [Install Dependencies](#install-dependencies)
  - [Building the Package](#building-the-package)
  - [Running in Development Mode](#running-in-development-mode)
- [Testing Monacopilot Locally](#testing-monacopilot-locally)
- [Documentation](#documentation)
- [Commit Conventions](#commit-conventions)
- [Requesting New Features or Components](#requesting-new-features-or-components)
- [Testing](#testing)
- [Final Steps](#final-steps)

## About This Repository

Here's a quick overview of the technologies we use:

- **[PNPM Workspaces](https://pnpm.io/workspaces):** For managing monorepos.
- **[Tsup](https://tsup.egoist.dev/):** A TypeScript bundler for building the project.
- **[Vitest](https://vitest.dev):** Our testing framework.

## Repository Structure

Understanding the repository structure will help you navigate the project effectively.

```plaintext
monacopilot
├── src
│   ├── classes
│   ├── constants
│   ├── core
│   │   └── completion
│   │       ├── handler.ts
│   │       └── register.ts
│   ├── helpers
│   ├── types
│   └── utils
└── tests
    ├── ui
    └── *.test.ts
```

| Path                              | Description                              |
| --------------------------------- | ---------------------------------------- |
| `src/classes`                     | Core classes                             |
| `src/constants`                   | Constants and configs                    |
| `src/core`                        | Core functionality                       |
| `src/core/completion`             | Completion handlers and registration     |
| `src/core/completion/handler.ts`  | InlineCompletionsProvider implementation |
| `src/core/completion/register.ts` | Completion provider registration         |
| `src/helpers`                     | Helper functions                         |
| `src/types`                       | Type definitions                         |
| `src/utils`                       | Utility functions                        |
| `tests`                           | Test files                               |
| `tests/ui`                        | Test UI                                  |
| `tests/*.test.ts`                 | Unit tests                               |

## Development

Follow these steps to set up your development environment and start contributing to Monacopilot.

### Fork the Repository

1. Navigate to the [Monacopilot GitHub repository](https://github.com/your-username/monacopilot).
2. Click the **Fork** button in the top-right corner to create a copy of the repository under your GitHub account.

### Clone the Repository

Clone your forked repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/monacopilot.git
```

### Navigate to Project Directory

Move into the project directory:

```bash
cd monacopilot
```

### Create a New Branch

Create a new branch for your work to keep changes organized:

```bash
git checkout -b my-new-feature
```

### Install Dependencies

Monacopilot uses PNPM for managing dependencies. Install them by running:

```bash
pnpm install
```

### Building the Package

To build the package, execute the following command:

```bash
pnpm build
```

This command uses [Tsup](https://tsup.egoist.dev/) to bundle the project.

#### Alternative: Start Development Mode

For automatic rebuilds on file changes, start the watch mode with:

```bash
pnpm dev
```

This is useful for continuous development and testing.

## Testing Monacopilot Locally

To test Monacopilot locally, follow these steps:

1. **Set Up Environment Variables**

   You need to set the [OpenAI API key](https://platform.openai.com/api-keys) as an environment variable. Create a `.env.local` file in the `tests/ui` directory with the following content:

   ```plaintext
   OPENAI_API_KEY=your_api_key
   ```

   Replace `your_api_key` with your actual OpenAI API key.

2. **Run the Test UI**

   Execute the following command to start the testing environment:

   ```bash
   pnpm dev:test-ui
   ```

   This will launch the UI in a local development environment, allowing you to test changes in real-time.

## Documentation

Comprehensive documentation is essential.

- **Location:** The documentation is located within the `README.md` file at the root of the repository.
- **Format:** Documentation is written using Markdown.

### Viewing Documentation

To view the documentation, simply open the `README.md` file in your preferred text editor or view it directly on GitHub.

## Commit Conventions

Adhering to a consistent commit message format helps maintain a clear project history and facilitates collaboration.

**Commit Message Format:**

```plaintext
category(scope): message
```

**Categories:**

- `feat` / `feature`: Introduces new features or functionality.
- `fix`: Addresses and resolves bugs.
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `docs`: Updates or additions to documentation.
- `build`: Changes related to the build process or dependencies.
- `test`: Adding or modifying tests.
- `ci`: Changes to continuous integration configurations.
- `chore`: Miscellaneous tasks that do not fit into the above categories.

**Examples:**

- `feat(completion): add new inline completion provider`
- `fix(core): resolve token handling issue in completion handler`
- `docs: update API usage guide for Monacopilot`

For detailed guidelines, refer to the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Requesting New Features or Components

If you have ideas for new features or components, we’d love to hear them!

1. **Open an Issue:**

   - Navigate to the [Issues](https://github.com/your-username/monacopilot/issues) section of the repository.
   - Click on **New Issue** and provide a clear and detailed description of your request.

## Testing

Ensuring that your contributions do not introduce regressions is crucial.

### Running Tests

Monacopilot uses [Vitest](https://vitest.dev) for testing. To run all tests, execute:

```bash
pnpm test
```

### Writing Tests

When adding new features or components, include corresponding tests to maintain code quality.

### Ensuring Tests Pass

Before submitting a pull request, ensure all tests pass:

```bash
pnpm test
```

## Final Steps

1. **Commit Your Changes:**

   Ensure your commits follow the [Commit Conventions](#commit-conventions) outlined above.

2. **Push to Your Fork:**

   ```bash
   git push origin my-new-feature
   ```

3. **Create a Pull Request:**

   - Navigate to your forked repository on GitHub.
   - Click on **Compare & pull request**.
   - Provide a clear description of your changes and submit the pull request.

Thank you for contributing to Monacopilot! Your efforts help make the project better for everyone.
