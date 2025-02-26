---
title: Custom Prompt
---

# Custom Prompt

You can customize the prompt used for code completions by providing a `customPrompt` function in the options parameter of the `copilot.complete` method. This allows you to tailor how the AI completes your code based on your specific needs.

## Usage

```javascript
copilot.complete({
    options: {
        customPrompt: metadata => ({
            context: 'Your custom codebase context information here',
            instruction: 'Your custom instructions for code completion here',
            fileContent: 'Your representation of file with cursor position',
        }),
    },
});
```

The `context`, `instruction`, and `fileContent` properties in the `customPrompt` function are all optional. If you omit any of these properties, the default values for those fields will be used.

## Parameters

The `customPrompt` function receives a `completionMetadata` object, which contains information about the current editor state and can be used to tailor the prompt.

### Completion Metadata

| Property           | Type                                     | Description                                                                                                                                                                   |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `language`         | `string` or `undefined`                  | The programming language of the code being completed.                                                                                                                         |
| `cursorPosition`   | `{ lineNumber: number; column: number }` | The current cursor position where the completion should begin.                                                                                                                |
| `filename`         | `string` or `undefined`                  | The name of the file being edited. Only available if you have provided the `filename` option in the `registerCompletion` function.                                            |
| `technologies`     | `string[]` or `undefined`                | An array of technologies used in the project. Only available if you have provided the `technologies` option in the `registerCompletion` function.                             |
| `relatedFiles`     | `object[]` or `undefined`                | An array of objects containing the `path` and `content` of related files. Only available if you have provided the `relatedFiles` option in the `registerCompletion` function. |
| `textAfterCursor`  | `string`                                 | The text that appears after the cursor position.                                                                                                                              |
| `textBeforeCursor` | `string`                                 | The text that appears before the cursor position.                                                                                                                             |

## Return Value Structure

The `customPrompt` function should return a `PromptData` object (or a partial one) with the following properties:

| Property      | Type                    | Description                                                                                   |
| ------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| `context`     | `string` or `undefined` | Information about the codebase context, including technologies, filename, language, etc.      |
| `instruction` | `string` or `undefined` | Instructions for how the AI should complete the code after the cursor position.               |
| `fileContent` | `string` or `undefined` | The representation of the file content showing where the cursor is positioned for completion. |

## Example

Here's an example of a custom prompt for completing React component code:

```javascript
const customPrompt = ({
    textBeforeCursor,
    textAfterCursor,
    language,
    filename,
    technologies,
}) => ({
    context: `You're working with a ${language} file named ${filename || 'unnamed'} in a project using ${technologies?.join(', ') || 'React'}.`,
    instruction:
        'Complete the code after the cursor position with appropriate React syntax. Ensure the code follows modern React best practices and matches the style of the existing code.',
    fileContent: `${textBeforeCursor}[CURSOR]${textAfterCursor}`,
});

copilot.complete({
    options: {customPrompt},
});
```

## Partial Customization

You can customize just one aspect of the prompt while letting the system handle the rest:

```javascript
// Only customize the instruction for code completion
copilot.complete({
    options: {
        customPrompt: metadata => ({
            instruction:
                'Complete this code with an efficient algorithm that handles edge cases.',
        }),
    },
});

// Only customize the context based on project information
copilot.complete({
    options: {
        customPrompt: ({language, technologies, filename}) => ({
            context: `This is a ${language} file named ${filename} in a project using ${technologies?.join(', ')}. The code follows a functional programming paradigm with strict typing.`,
        }),
    },
});
```

By using a custom prompt, you can guide the AI to complete your code in ways that better match your coding style, project requirements, or specific technologies you're working with.

For additional `completionMetadata` needs, please [open an issue](https://github.com/arshad-yaseen/monacopilot/issues/new).
