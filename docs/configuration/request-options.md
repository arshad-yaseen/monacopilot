---
title: Completion Request Options
---

# Completion Request Options

Configure how completion requests are made to the LLM provider by customizing headers, prompts, and other options to fine-tune the behavior of code completions.

## Custom Headers for LLM Requests

You can add custom headers to the provider's completion requests. For example, if you select `OpenAI` as your provider, you can add a custom header to the OpenAI completion requests made by Monacopilot.

```javascript
copilot.complete({
    options: {
        headers: {
            'X-Custom-Header': 'custom-value',
        },
    },
});
```

## Custom Prompt

You can customize the prompt used for generating completions by providing a `customPrompt` function in the options parameter of the `copilot.complete` method. This allows you to tailor the AI's behavior to your specific needs.

#### Usage

```javascript
copilot.complete({
    options: {
        customPrompt: metadata => ({
            system: 'Your custom system prompt here',
            user: 'Your custom user prompt here',
        }),
    },
});
```

The `system` and `user` prompts in the `customPrompt` function are optional. If you omit either the `system` or `user` prompt, the default prompt for that field will be used. Example of customizing only the system prompt:

```javascript
copilot.complete({
    options: {
        customPrompt: metadata => ({
            system: 'You are an AI assistant specialized in writing React components, focusing on creating clean...',
        }),
    },
});
```

### Parameters

The `customPrompt` function receives a `completionMetadata` object, which contains information about the current editor state and can be used to tailor the prompt.

#### Completion Metadata

| Property           | Type                                     | Description                                                                                                                                                                   |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `language`         | `string`                                 | The programming language of the code.                                                                                                                                         |
| `cursorPosition`   | `{ lineNumber: number; column: number }` | The current cursor position in the editor.                                                                                                                                    |
| `filename`         | `string` or `undefined`                  | The name of the file being edited. Only available if you have provided the `filename` option in the `registerCompletion` function.                                            |
| `technologies`     | `string[]` or `undefined`                | An array of technologies used in the project. Only available if you have provided the `technologies` option in the `registerCompletion` function.                             |
| `relatedFiles`     | `object[]` or `undefined`                | An array of objects containing the `path` and `content` of related files. Only available if you have provided the `relatedFiles` option in the `registerCompletion` function. |
| `textAfterCursor`  | `string`                                 | The text that appears after the cursor.                                                                                                                                       |
| `textBeforeCursor` | `string`                                 | The text that appears before the cursor.                                                                                                                                      |
| `editorState`      | `object`                                 | An object containing the `completionMode` property.                                                                                                                           |

The `editorState.completionMode` can be one of the following:

| Mode       | Description                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `insert`   | Indicates that there is a character immediately after the cursor. In this mode, the AI will generate content to be inserted at the cursor position.                 |
| `complete` | Indicates that there is a character after the cursor but not immediately. In this mode, the AI will generate content to complete the text from the cursor position. |
| `continue` | Indicates that there is no character after the cursor. In this mode, the AI will generate content to continue the text from the cursor position.                    |

For additional `completionMetadata` needs, please [open an issue](https://github.com/arshad-yaseen/monacopilot/issues/new).

The `customPrompt` function should return an object with two properties:

| Property | Type                    | Description                                            |
| -------- | ----------------------- | ------------------------------------------------------ |
| `system` | `string` or `undefined` | A string representing the system prompt for the model. |
| `user`   | `string` or `undefined` | A string representing the user prompt for the model.   |

### Example

Here's an example of a custom prompt that focuses on generating React component code:

```javascript
const customPrompt = ({textBeforeCursor, textAfterCursor}) => ({
    system: 'You are an AI assistant specialized in writing React components. Focus on creating clean, reusable, and well-structured components.',
    user: `Please complete the following React component:

    ${textBeforeCursor}
    // Cursor position
    ${textAfterCursor}

    Use modern React practices and hooks where appropriate. If you're adding new props, make sure to include proper TypeScript types. Please provide only the completed part of the code without additional comments or explanations.`,
});

copilot.complete({
    options: {customPrompt},
});
```

By using a custom prompt, you can guide the model to generate completions that better fit your coding style, project requirements, or specific technologies you're working with.
