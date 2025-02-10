# Contributing to Monacopilot

Thank you for your interest in contributing to Monacopilot! We're thrilled to have you on board. This guide will help you get started with contributing to our monorepo project.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
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

3. **Build**
    ```bash
    pnpm build
    ```

## Development Workflow

1. **Start Development Mode**

    ```bash
    # For core package
    pnpm dev:core

    # For monacopilot package
    pnpm dev

    # For documentation
    pnpm dev:docs
    ```

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

5. **Testing**
   Run all tests, only push if tests pass:
    ```bash
    pnpm test
    ```

## Testing

We use Vitest for testing. Run tests with:

```bash
pnpm test
```

When adding new features, please include corresponding tests in the appropriate `tests` directory.

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
4. Run all checks:
    ```bash
    pnpm validate
    pnpm test
    ```
5. Commit your changes following our commit guidelines
6. Push to your fork
7. Open a Pull Request

## Need Help?

Feel free to open an issue or join our community discussions if you need any assistance.

Thank you for contributing to Monacopilot! ❤️
