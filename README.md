![Monacopilot Banner](https://i.postimg.cc/GhpGVjVG/monacopilot-banner.png)

# Monacopilot

**Monacopilot** integrates AI auto-completion into the Monaco Editor, inspired by GitHub Copilot.

### Motivation

![Monacopilot Motivation](https://i.postimg.cc/c4GM7q3Z/motivation.png)

### Table of Contents

- [Examples](#examples)
- [Inline Completions](#inline-completions)
  - [Installation](#installation)
  - [Usage](#usage)
    - [API Handler](#api-handler)
    - [Register Completion with the Monaco Editor](#register-completion-with-the-monaco-editor)
  - [Register Completion Options](#register-completion-options)
    - [Get Completions in Real-Time](#get-completions-in-real-time)
    - [Manually Trigger Completions](#manually-trigger-completions)
      - [Trigger Completions with a Keyboard Shortcut](#trigger-completions-with-a-keyboard-shortcut)
      - [Trigger Completions with an Editor Action](#trigger-completions-with-an-editor-action)
    - [Multi-File Context](#multi-file-context)
    - [Filename](#filename)
    - [Completions for Specific Technologies](#completions-for-specific-technologies)
    - [Max Context Lines](#max-context-lines)
    - [Handling Errors](#handling-errors)
    - [Request Options](#request-options)
      - [Custom Headers](#custom-headers)
- [Copilot Options](#copilot-options)
  - [Changing the Provider and Model](#changing-the-provider-and-model)
  - [Custom Model](#custom-model)
- [Completion Request Options](#completion-request-options)
  - [Custom Headers for AI Model Requests](#custom-headers-for-ai-model-requests)
- [Select and Edit](#select-and-edit)
- [Contributing](#contributing)

### Examples

Here are some examples of how to integrate Monacopilot into your project:

- Next.js
  - [App Router](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/app)
  - [Pages Router](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/pages)
- [Remix](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/remix)

## Inline Completions

Monacopilot provides inline completions, offering real-time, AI-powered, context-aware code suggestions as you type.

[Inline Completions Demo Video](https://github.com/user-attachments/assets/f2ec4ae1-f658-4002-af9c-c6b1bbad70d9)

### Installation

To install Monacopilot, run:

```bash
npm install monacopilot
```

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
  // Examples:
  // - '/api/complete' if you're using the Next.js (API handler) or similar frameworks.
  // - 'https://api.example.com/complete' for a separate API server
  // Ensure this can be accessed from the browser.
  endpoint: 'https://api.example.com/complete',
  // The language of the editor.
  language: 'javascript',
  // If you are using Groq as your provider, it's recommended to set `maxContextLines` to `60` or less.
  // This is because Groq has low rate limits and doesn't offer pay-as-you-go pricing.
  maxContextLines: 60,
});
```

The `registerCompletion` function returns a `completion` object with useful methods such as `trigger` and `dispose`. The `trigger` method is explained later in this document. The `dispose` method should be used to clean up resources when the completion object is no longer needed. For instance, in a React component, you can call `completion.dispose()` within the `useEffect` cleanup function to ensure proper disposal when the component unmounts.

🎉 Congratulations! The AI auto-completion is now connected to the Monaco Editor. Start typing and see completions in the editor.

## Register Completion Options

### Get Completions in Real-Time

The `trigger` option determines when the completion service provides code completions. You can choose between receiving suggestions/completions in real-time as you type or after a brief pause.

```javascript
registerCompletion(monaco, editor, {
  trigger: 'onTyping',
});
```

| Trigger              | Description                                         | Notes                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'onIdle'` (default) | Provides completions after a brief pause in typing. | This approach is less resource-intensive, as it only initiates a request when the editor is idle.                                                                                                         |
| `'onTyping'`         | Provides completions in real-time as you type.      | Best suited for models with low response latency, such as Groq models. This trigger mode initiates additional background requests to deliver real-time suggestions, a method known as predictive caching. |
| `'onDemand'`         | Does not provide completions automatically.         | Completions are triggered manually using the `trigger` function from the `registerCompletion` return. This allows for precise control over when completions are provided.                                 |

[OnTyping Demo](https://github.com/user-attachments/assets/22c2ce44-334c-4963-b853-01b890b8e39f)

> **Note:** If you prefer real-time completions, you can set the `trigger` option to `'onTyping'`. This may increase the number of requests made to the provider and the cost. This should not be too costly since most small models are very inexpensive.

### Manually Trigger Completions

If you prefer not to trigger completions automatically (e.g., on typing or on idle), you can trigger completions manually. This is useful in scenarios where you want to control when completions are provided, such as through a button click or a keyboard shortcut.

#### Usage

```javascript
const completion = registerCompletion(monaco, editor, {
  trigger: 'onDemand',
});

completion.trigger();
```

To set up manual triggering, configure the `trigger` option to `'onDemand'`. This disables automatic completions, allowing you to call the `completion.trigger()` method explicitly when needed.

#### Trigger Completions with a Keyboard Shortcut

You can set up completions to trigger when the `Ctrl+Shift+Space` keyboard shortcut is pressed.

```javascript
const completion = registerCompletion(monaco, editor, {
  trigger: 'onDemand',
});

monaco.editor.addCommand(
  monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Space,
  () => {
    completion.trigger();
  },
);
```

#### Trigger Completions with an Editor Action

You can add a custom editor action to trigger completions manually.

![Editor Action Demo](https://i.postimg.cc/pTNQ3k6J/editor-action-demo.png)

```javascript
const completion = registerCompletion(monaco, editor, {
  trigger: 'onDemand',
});

monaco.editor.addEditorAction({
  id: 'monacopilot.triggerCompletion',
  label: 'Complete Code',
  contextMenuGroupId: 'navigation',
  keybindings: [
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Space,
  ],
  run: () => {
    completion.trigger();
  },
});
```

### Multi-File Context

Improve the quality and relevance of Copilot's suggestions by providing additional code context from other files in your project. This feature allows Copilot to understand the broader scope of your codebase, resulting in more accurate and contextually appropriate completions.

```javascript
registerCompletion(monaco, editor, {
  relatedFiles: [
    {
      path: './utils.js',
      content:
        'export const reverse = (str) => str.split("").reverse().join("")',
    },
  ],
});
```

For instance, if you begin typing `const isPalindrome = ` in your current file, Copilot will recognize the `reverse` function from the `utils.js` file you provided earlier. It will then suggest a completion that utilizes this function.

### Filename

Specify the name of the file being edited to receive more contextually relevant completions.

```javascript
registerCompletion(monaco, editor, {
  filename: 'utils.js', // e.g., "index.js", "utils/objects.js"
});
```

Now, the completions will be more relevant to the file's context.

### Completions for Specific Technologies

Enable completions tailored to specific technologies by using the `technologies` option.

```javascript
registerCompletion(monaco, editor, {
  technologies: ['react', 'next.js', 'tailwindcss'],
});
```

This configuration will provide completions relevant to React, Next.js, and Tailwind CSS.

### Max Context Lines

To manage potentially lengthy code in your editor, you can limit the number of lines included in the completion request using the `maxContextLines` option.

For example, if there's a chance that the code in your editor may exceed `500+ lines`, you don't need to provide `500 lines` to the model. This would increase costs due to the huge number of input tokens. Instead, you can set `maxContextLines` to maybe `80` or `100`, depending on how accurate you want the completions to be and how much you're willing to pay for the model.

```javascript
registerCompletion(monaco, editor, {
  maxContextLines: 80,
});
```

> **Note:** If you're using `Groq` as your provider, it's recommended to set `maxContextLines` to `60` or less due to its low rate limits and lack of pay-as-you-go pricing. However, `Groq` is expected to offer pay-as-you-go pricing in the near future.

### Request Options

You can customize the `fetch` request made by Monacopilot to the specified endpoint by using the `requestOptions` parameter in the `registerCompletion` function.

#### Custom Headers

You can include custom headers in the requests sent to the endpoint specified in the `registerCompletion` function.

```javascript
registerCompletion(monaco, editor, {
  endpoint: 'https://api.example.com/complete',
  requestOptions: {
    headers: {
      'X-Custom-Header': 'custom-value',
    },
  },
});
```

### Handling Errors

You can handle errors that occur during completion requests by providing an `onError` function when calling `registerCompletion`. This allows you to customize error handling and logging based on your application's needs.

This will disable the default error handling and logging behavior of Monacopilot.

```javascript
registerCompletion(monaco, editor, {
  onError: error => {
    console.error(error);
  },
});
```

## Copilot Options

### Changing the Provider and Model

You can specify a different provider and model by setting the `provider` and `model` parameters in the `Copilot` instance.

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
    transformResponse: response => ({text: response[0].generated_text}),
  },
});
```

#### Configuration

The `model` option accepts an object with two functions:

| Function            | Description                                                                                                             | Type                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `config`            | A function that receives the API key and prompt data, and returns the configuration for the custom model API request.   | `(apiKey: string, prompt: { system: string; user: string }) => { endpoint: string; body?: object; headers?: object }` |
| `transformResponse` | A function that takes the raw/parsed response from the custom model API and returns an object with the `text` property. | `(response: unknown) => { text: string \| null; }`                                                                    |

The `config` function must return an object with the following properties:

| Property   | Type                    | Description                                  |
| ---------- | ----------------------- | -------------------------------------------- |
| `endpoint` | `string`                | The URL of the custom model API endpoint.    |
| `body`     | `object` or `undefined` | The body of the custom model API request.    |
| `headers`  | `object` or `undefined` | The headers of the custom model API request. |

The `transformResponse` function must return an object with the `text` property. This `text` property should contain the text generated by the custom model. If no valid text can be extracted, the function should return `null` for the `text` property.

## Completion Request Options

### Custom Headers for AI Model Requests

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
| `context`          | `object` or `undefined`                  | Additional context from related files. Only available if you have provided the `context` option in the `registerCompletion` function.             |
| `textAfterCursor`  | `string`                                 | The text that appears after the cursor.                                                                                                           |
| `textBeforeCursor` | `string`                                 | The text that appears before the cursor.                                                                                                          |
| `editorState`      | `object`                                 | An object containing the `completionMode` property.                                                                                               |

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

Select and Edit is a feature that allows you to select code from the editor and edit it inline with AI assistance.

This feature is coming soon™️.

## Contributing

For guidelines on contributing, please read the [contributing guide](https://github.com/arshad-yaseen/monacopilot/blob/main/CONTRIBUTING.md).

We welcome contributions from the community to enhance Monacopilot's capabilities and make it even more powerful. ❤️
