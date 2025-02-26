# Contributing to Monacopilot

Thank you for your interest in contributing to Monacopilot! We're thrilled to have you on board. This guide will help you get started with contributing to our monorepo project.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Testing Changes](#testing-changes)
- [Documentation](#documentation)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Project Structure

Monacopilot is organized as a monorepo using PNPM workspaces:

```
packages/
  ├── core/           # Core functionality and provider implementations
  └── monacopilot/    # Main Monaco Editor integration package
docs/                 # Documentation website
playground/           # NextJS app for testing changes in real-time
```

## Development Setup

1. **Prerequisites**

    - Node.js (v16 or higher)
    - PNPM (v9.15.4 or higher)

2. **Clone and Install**

    ```bash
    git clone https://github.com/arshad-yaseen/monacopilot.git
    cd monacopilot
    pnpm install
    ```

## Development Workflow

1. **Start Development Mode**

    ```bash
    # For core package
    pnpm dev:core

    # For monacopilot package
    pnpm dev:monacopilot

    # For documentation
    pnpm dev:docs

    # For playground
    pnpm dev:playground
    ```

    Note: The development mode includes automatic rebuilding on code changes, so you don't need to run `pnpm build` manually after each change.

2. **Code Formatting**
   Before committing your changes, run:

    ```bash
    pnpm format
    ```

3. **Type Checking**

    ```bash
    pnpm tsc
    ```

4. **Linting**

    ```bash
    pnpm lint
    ```

## Testing Changes

We provide a playground environment to test your changes in real-time:

- The `playground/` directory contains a NextJS app that automatically reflects changes made to the packages
- Before starting the playground, create a `.env.local` file in the `playground/` directory and add your Mistral API key:
    ```
    MISTRAL_API_KEY=your_api_key_here
    ```
    Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).
- Run `pnpm dev:playground` to start the playground application
- When you run `pnpm dev:monacopilot` or `pnpm dev:core`, your changes will be immediately visible in the playground
- Use this playground to verify your changes and test functionality before submitting a PR

## Running Tests

To run tests:

```bash
pnpm test
```

## Documentation

The documentation is built using VitePress and is located in the `docs` directory.

To preview documentation locally:

```bash
pnpm dev:docs
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Example:

```
feat(core): add support for DeepSeek provider
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes using the playground
5. Run all checks:
    ```bash
    pnpm validate
    pnpm test
    ```
6. Commit your changes following our commit guidelines
7. Push to your fork
8. Open a Pull Request

## Need Help?

Feel free to open an issue or join our community discussions if you need any assistance.

Thank you for contributing to Monacopilot! ❤️
