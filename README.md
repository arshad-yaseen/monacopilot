![Monacopilot Banner](https://i.postimg.cc/GhpGVjVG/monacopilot-banner.png)

# Monacopilot

**Monacopilot** integrates AI auto-completion into the Monaco Editor, inspired by GitHub Copilot.

## Table of Contents

- [Examples](#examples)
- [Installation](#installation)
- [Inline Completions](#inline-completions)
  - [Usage](#usage)
    - [API Handler](#api-handler)
    - [Register Completion with the Monaco Editor](#register-completion-with-the-monaco-editor)
  - [Register Completion Options](#register-completion-options)
    - [External Context](#external-context)
    - [Filename](#filename)
    - [Completions for Specific Technologies](#completions-for-specific-technologies)
    - [Get Completions in Real-Time](#get-completions-in-real-time)
- [Copilot Options](#copilot-options)
  - [Changing the Provider and Model](#changing-the-provider-and-model)
  - [Custom Model](#custom-model)
- [Completion Request Options](#completion-request-options)
  - [Custom Headers](#custom-headers)
  - [Custom Prompt](#custom-prompt)
- [Select and Edit](#select-and-edit)
- [Contributing](#contributing)

### Examples

Here are some examples of how to integrate Monacopilot into your project:

- Next.js
  - [App Router](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/app)
  - [Pages Router](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/pages)
- [Remix](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/remix)

## Installation

To install Monacopilot, run:

```bash
npm install monacopilot
```

## Inline Completions

AI-generated suggestions that appear directly within your code as you type.

[Inline Completions Demo Video](https://github.com/user-attachments/assets/f2ec4ae1-f658-4002-af9c-c6b1bbad70d9)

### Usage

#### API Handler

Set up an API handler to manage auto-completion requests. An example using Express.js:

```javascript
import express from 'express';
import {Copilot} from 'monacopilot';

const app = express();
const port = process.env.PORT || 3000;
const copilot = new Copilot(process.env.GROQ_API_KEY);

app.use(express.json());

app.post('/complete', async (req, res) => {
  const completion = await copilot.complete({
    body: req.body,
  });
  res.status(200).json(completion);
});

app.listen(port);
```

Now, Monacopilot is set up to send completion requests to the `/complete` endpoint and receive completions in response.

The `copilot.complete` method processes the request body sent by Monacopilot and returns the corresponding completion.

#### Register Completion with the Monaco Editor

Now, let's integrate AI auto-completion into your Monaco editor. Here's how you can do it:

```javascript
import * as monaco from 'monaco-editor';
import {registerCompletion} from 'monacopilot';

const editor = monaco.editor.create(document.getElementById('container'), {
  language: 'javascript',
});

registerCompletion(monaco, editor, {
  endpoint: 'https://api.example.com/complete',
  language: 'javascript',
});
```

| Parameter  | Type     | Description                                                       |
| ---------- | -------- | ----------------------------------------------------------------- |
| `endpoint` | `string` | The URL of the API endpoint that we created in the previous step. |
| `language` | `string` | The language of the editor.                                       |

🎉 Congratulations! The AI auto-completion is now connected to the Monaco Editor. Start typing and see completions in the editor.

## Register Completion Options

### External Context

Enhance the accuracy and relevance of Copilot's completions by providing additional code context from your workspace.

```javascript
registerCompletion(monaco, editor, {
  // ...other options
  externalContext: [
    {
      path: './utils.js',
      content:
        'export const reverse = (str) => str.split("").reverse().join("")',
    },
  ],
});
```

By providing external context, Copilot can offer more intelligent suggestions. For example, if you start typing `const isPalindrome = `, Copilot may suggest using the `reverse` function from `utils.js`.

### Filename

Specify the name of the file being edited to receive more contextually relevant completions.

```javascript
registerCompletion(monaco, editor, {
  // ...other options
  filename: 'utils.js', // e.g., "index.js", "utils/objects.js"
});
```

Now, the completions will be more relevant to the file's context.

### Completions for Specific Technologies

Enable completions tailored to specific technologies by using the `technologies` option.

```javascript
registerCompletion(monaco, editor, {
  // ...other options
  technologies: ['react', 'next.js', 'tailwindcss'],
});
```

This configuration will provide completions relevant to React, Next.js, and Tailwind CSS.

### Get Completions in Real-Time

The `trigger` option determines when the completion service provides code completions. You can choose between receiving suggestions/completions in real-time as you type or after a brief pause.

```javascript
registerCompletion(monaco, editor, {
  // ...other options
  trigger: 'onTyping',
});
```

| Trigger              | Description                                                                | Notes                                                                                                                                                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `'onIdle'` (default) | The completion service provides completions after a brief pause in typing. | This approach is less resource-intensive, as it only initiates a request when the editor is idle. However, compared to `onTyping`, it may result in a slightly reduced experience with completions.                                                          |
| `'onTyping'`         | The completion service provides completions in real-time as you type.      | This approach is best suited for models with low response latency, such as Groq models. Please note that this trigger mode initiates additional background requests to deliver real-time suggestions. Technically, this method is called predictive caching. |

[OnTyping Demo](https://github.com/user-attachments/assets/22c2ce44-334c-4963-b853-01b890b8e39f)

> **Note:** If you prefer real-time completions, you can set the `trigger` option to `'onTyping'`. This may increase the number of requests made to the provider and the cost. This should not be too costly since most small models are very inexpensive.

## Copilot Options

### Changing the Provider and Model

You can specify a different provider and model for completions by setting the `provider` and `model` parameters in the `Copilot` instance.

```javascript
const copilot = new Copilot(process.env.OPENAI_API_KEY, {
  provider: 'openai',
  model: 'gpt-4o',
});
```

The default provider is `groq`, and the default model is `llama-3-70b`.

There are other providers and models available. Here is a list:

| Provider  | Models                                                                    |
| --------- | ------------------------------------------------------------------------- |
| Groq      | `llama-3-70b`                                                             |
| OpenAI    | `gpt-4o`, `gpt-4o-mini`, `o1-preview`, `o1-mini`                          |
| Anthropic | `claude-3.5-Sonnet`, `claude-3-opus`, `claude-3-sonnet`, `claude-3-haiku` |

### Custom Model

You can use a custom AI model that isn't built into Monacopilot by setting up a `model` when you create a new Copilot. This feature lets you connect to AI models from other services or your own custom-built models.

Please ensure you are using a high-quality model, especially for coding tasks, to get the best and most accurate completions. Also, use a model with very low response latency (preferably under 1.5 seconds) to enjoy a great experience and utilize the full power of Monacopilot.

#### Example

```javascript
const copilot = new Copilot(process.env.HUGGINGFACE_API_KEY, {
  // You don't need to set the provider if you are using a custom model.
  // provider: 'huggingface',
  model: {
    config: (apiKey, prompt) => ({
      endpoint:
        'https://api-inference.huggingface.co/models/openai-community/gpt2',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: {
        inputs: prompt.user,
        parameters: {
          max_length: 100,
          num_return_sequences: 1,
          temperature: 0.7,
        },
      },
    }),
    transformResponse: response => response[0].generated_text,
  },
});
```

#### Configuration

The `model` option accepts an object with two functions:

| Function            | Description                                                                                                           | Type                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `config`            | A function that receives the API key and prompt data, and returns the configuration for the custom model API request. | `(apiKey: string, prompt: { system: string; user: string }) => { endpoint: string; body?: object; headers?: object }` |
| `transformResponse` | A function that takes the raw/parsed response from the custom model API and returns the model-generated text.         | `(response: unknown) => string`                                                                                       |

The `config` function must return an object with the following properties:

| Property   | Type                    | Description                                  |
| ---------- | ----------------------- | -------------------------------------------- |
| `endpoint` | `string`                | The URL of the custom model API endpoint.    |
| `body`     | `object` or `undefined` | The body of the custom model API request.    |
| `headers`  | `object` or `undefined` | The headers of the custom model API request. |

The `transformResponse` function must return the model-generated text.

## Completion Request Options

### Custom Headers

You can add custom headers to the provider's completion requests. For example, if you select `OpenAI` as your provider, you can add a custom header to the OpenAI completion requests made by Monacopilot.

```javascript
copilot.complete({
  options: {
    // ...other options
    headers: {
      'X-Custom-Header': 'custom-value',
    },
  },
});
```

### Custom Prompt

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
      system:
        'You are an AI assistant specialized in writing React components, focusing on creating clean...',
    }),
  },
});
```

#### Parameters

The `customPrompt` function receives a `completionMetadata` object, which contains information about the current editor state and can be used to tailor the prompt.

| Property           | Type                                     | Description                                                                                                                                       |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `language`         | `string`                                 | The programming language of the code.                                                                                                             |
| `cursorPosition`   | `{ lineNumber: number; column: number }` | The current cursor position in the editor.                                                                                                        |
| `filename`         | `string` or `undefined`                  | The name of the file being edited. Only available if you have provided the `filename` option in the `registerCompletion` function.                |
| `technologies`     | `string[]` or `undefined`                | An array of technologies used in the project. Only available if you have provided the `technologies` option in the `registerCompletion` function. |
| `externalContext`  | `object` or `undefined`                  | Additional context from related files. Only available if you have provided the `externalContext` option in the `registerCompletion` function.     |
| `textAfterCursor`  | `string`                                 | The text that appears after the cursor.                                                                                                           |
| `textBeforeCursor` | `string`                                 | The text that appears before the cursor.                                                                                                          |
| `editorState`      | `object`                                 | An object containing the `completionMode` property.                                                                                               |

The `editorState.completionMode` can be one of the following:

| Mode                 | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill-in-the-middle` | Indicates that the cursor is positioned within the existing text. In this mode, the AI will generate content to be inserted at the cursor position.                 |
| `completion`         | Indicates that the cursor is at the end of the existing text. In this mode, the AI will generate content to continue or complete the text from the cursor position. |

For additional `completionMetadata` needs, please [open an issue](https://github.com/arshad-yaseen/monacopilot/issues/new).

The `customPrompt` function should return an object with two properties:

| Property | Type                    | Description                                            |
| -------- | ----------------------- | ------------------------------------------------------ |
| `system` | `string` or `undefined` | A string representing the system prompt for the model. |
| `user`   | `string` or `undefined` | A string representing the user prompt for the model.   |

#### Example

Here's an example of a custom prompt that focuses on generating React component code:

```javascript
const customPrompt = ({textBeforeCursor, textAfterCursor}) => ({
  system:
    'You are an AI assistant specialized in writing React components. Focus on creating clean, reusable, and well-structured components.',
  user: `Please complete the following React component:

    ${textBeforeCursor}
    // Cursor position
    ${textAfterCursor}

    Use modern React practices and hooks where appropriate. If you're adding new props, make sure to include proper TypeScript types. Please provide only the finished code without additional comments or explanations.`,
});

copilot.complete({
  options: {customPrompt},
});
```

By using a custom prompt, you can guide the model to generate completions that better fit your coding style, project requirements, or specific technologies you're working with.

## Select and Edit

Select and Edit is a feature that allows you to select code from the editor and edit it inline with AI assistance in the Monaco Editor.

<img width="871" alt="select-and-edit-example" src="https://github.com/user-attachments/assets/87c6245a-7827-47f3-8b59-1f59eec9d2ef">

This feature is coming soon.

## Contributing

For guidelines on contributing, please read the [contributing guide](https://github.com/arshad-yaseen/monacopilot/blob/main/CONTRIBUTING.md).

We welcome contributions from the community to enhance Monacopilot's capabilities and make it even more powerful. ❤️
