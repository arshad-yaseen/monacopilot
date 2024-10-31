![Monacopilot Banner](https://i.postimg.cc/GhpGVjVG/monacopilot-banner.png)

# Monacopilot

**Monacopilot** is a powerful and customizable AI auto-completion plugin for the Monaco Editor. Inspired by GitHub Copilot.

### Motivation

![Monacopilot Motivation](https://i.postimg.cc/c4GM7q3Z/motivation.png)

### Table of Contents

- [Examples](#examples)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  - [API Handler](#api-handler)
  - [Register Completion with the Monaco Editor](#register-completion-with-the-monaco-editor)
- [Register Completion Options](#register-completion-options)
  - [Trigger Mode](#trigger-mode)
  - [Manually Trigger Completions](#manually-trigger-completions)
    - [Trigger Completions with a Keyboard Shortcut](#trigger-completions-with-a-keyboard-shortcut)
    - [Trigger Completions with an Editor Action](#trigger-completions-with-an-editor-action)
  - [Multi-File Context](#multi-file-context)
  - [Filename](#filename)
  - [Completions for Specific Technologies](#completions-for-specific-technologies)
  - [Max Context Lines](#max-context-lines)
  - [Caching Completions](#caching-completions)
  - [Handling Errors](#handling-errors)
  - [Custom Request Handler](#custom-request-handler)
- [Copilot Options](#copilot-options)
  - [Changing the Provider and Model](#changing-the-provider-and-model)
  - [Custom Model](#custom-model)
- [Completion Request Options](#completion-request-options)
  - [Custom Headers for LLM Requests](#custom-headers-for-llm-requests)
- [Cross-Language API Handler Implementation](#cross-language-api-handler-implementation)
- [Contributing](#contributing)

### Examples

Here are some examples of how to integrate Monacopilot into your project:

- Next.js
  - [App Router](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/app)
  - [Pages Router](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/pages)
- [Remix](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/remix)
- [Vue](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/vue)

### Demo

[Inline Completions Demo Video](https://github.com/user-attachments/assets/f2ec4ae1-f658-4002-af9c-c6b1bbad70d9)

In the demo, we are using the `onTyping` trigger mode with the Groq model, which is why you see such quick and fast completions. Groq provides very fast response times.

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
const copilot = new Copilot(process.env.GROQ_API_KEY!, {
  provider: 'groq',
  model: 'llama-3-70b',
});

app.use(express.json());

app.post('/complete', async (req, res) => {
  const {completion, error, raw} = await copilot.complete({
    body: req.body,
  });

  // Process raw LLM response if needed
  // `raw` can be undefined if an error occurred, which happens when `error` is present
  if (raw) {
    calculateCost(raw.usage.total_tokens);
  }

  // Handle errors if present
  if (error) {
    console.error('Completion error:', error);
    res.status(500).json({completion: null, error});
  }

  res.status(200).json({completion});
});

app.listen(port);
```

The handler should return a JSON response with the following structure:

```json
{
  "completion": "Generated completion text"
}
```

Or in case of an error:

```json
{
  "completion": null,
  "error": "Error message"
}
```

If you prefer to use a different programming language for your API handler in cases where your backend is not in JavaScript, please refer to the section [Cross-Language API Handler Implementation](#cross-language-api-handler-implementation) for guidance on implementing the handler in your chosen language.

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

> **Note:** The `registerCompletion` function returns a `completion` object with a `deregister` method. This method should be used to clean up the completion functionality when it's no longer needed.
> For example, in a React component, you can call `completion.deregister()` within the `useEffect` cleanup function to ensure proper disposal when the component unmounts.

🎉 Congratulations! The AI auto-completion is now connected to the Monaco Editor. Start typing and see completions in the editor.

## Register Completion Options

### Trigger Mode

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

### Caching Completions

Monacopilot caches completions by default. It uses a FIFO (First In First Out) strategy, reusing cached completions when the context and cursor position match while editing. To disable caching:

```javascript
registerCompletion(monaco, editor, {
  enableCaching: false,
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

### Custom Request Handler

The `requestHandler` option in the `registerCompletion` function allows you to handle requests sent to the specified endpoint, offering high customization for both requests and responses. By leveraging this functionality, you can manipulate and customize the request or response to meet your specific requirements.

```javascript
registerCompletion(monaco, editor, {
  endpoint: 'https://api.example.com/complete',
  // ... other options
  requestHandler: async ({endpoint, body}) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return {
      completion: data.completion,
    };
  },
});
```

The `requestHandler` function takes an object with `endpoint` and `body` as parameters.

| Property   | Type     | Description                                                                                            |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `endpoint` | `string` | The endpoint to which the request is sent. This is the same as the `endpoint` in `registerCompletion`. |
| `body`     | `object` | The body of the request processed by Monacopilot.                                                      |

> **Note:** The `body` object contains properties generated by Monacopilot. If you need to include additional properties in the request body, you can create a new object that combines the existing `body` with your custom properties. For example:
>
> ```javascript
> const customBody = {
>   ...body,
>   myCustomProperty: 'value',
> };
> ```

The `requestHandler` should return an object with the following property:

| Property     | Type               | Description                                                                                      |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------ |
| `completion` | `string` or `null` | The completion text to be inserted into the editor. Return `null` if no completion is available. |

#### Example

The example below demonstrates how to use the `requestHandler` function for more customized handling:

```javascript
registerCompletion(monaco, editor, {
  endpoint: 'https://api.example.com/complete',
  // ... other options
  requestHandler: async ({endpoint, body}) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': generateUniqueId(),
        },
        body: JSON.stringify({
          ...body,
          additionalProperty: 'value',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error('API Error:', data.error);
        return {completion: null};
      }

      return {completion: data.completion.trim()};
    } catch (error) {
      console.error('Fetch error:', error);
      return {completion: null};
    }
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

> **Tip:** Even though the default provider and model are `groq` and `llama-3-70b`, it's always recommended to specify a provider and model when using Monacopilot. This ensures your code remains consistent even if the default settings change in future updates.

There are other providers and models available. Here is a list:

| Provider  | Models                                                                    |
| --------- | ------------------------------------------------------------------------- |
| Groq      | `llama-3-70b`                                                             |
| OpenAI    | `gpt-4o`, `gpt-4o-mini`, `o1-preview`, `o1-mini`                          |
| Anthropic | `claude-3-5-sonnet`, `claude-3-opus`, `claude-3-sonnet`, `claude-3-haiku` |

### Custom Model

You can use a custom LLM that isn't built into Monacopilot by setting up a `model` when you create a new Copilot. This feature lets you connect to LLMs from other services or your own custom-built models.

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

### Custom Headers for LLM Requests

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

##### Completion Metadata

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

    Use modern React practices and hooks where appropriate. If you're adding new props, make sure to include proper TypeScript types. Please provide only the completed part of the code without additional comments or explanations.`,
});

copilot.complete({
  options: {customPrompt},
});
```

By using a custom prompt, you can guide the model to generate completions that better fit your coding style, project requirements, or specific technologies you're working with.

## Cross-Language API Handler Implementation

While the example in this documentation uses JavaScript/Node.js (which is recommended), you can set up the API handler in any language or framework. For JavaScript, Monacopilot provides a built-in function that handles all the necessary steps, such as generating the prompt, sending it to the model, and processing the response. However, if you're using a different language, you'll need to implement these steps manually. Here's a general approach to implement the handler in your preferred language:

1. Create an endpoint that accepts POST requests (e.g., `/complete`).
2. The endpoint should expect a JSON body containing completion metadata.
3. Use the metadata to construct a prompt for your LLM.
4. Send the prompt to your chosen LLM and get the completion.
5. Return a JSON response with the following structure:

   ```json
   {
     "completion": "Generated completion text"
   }
   ```

   Or in case of an error:

   ```json
   {
     "completion": null,
     "error": "Error message"
   }
   ```

### Key Considerations

- The prompt should instruct the model to return only the completion text, without any additional formatting or explanations.
- The completion text should be ready for direct insertion into the editor.

Check out the [prompt.ts](https://github.com/arshad-yaseen/monacopilot/blob/main/src/helpers/completion/prompt.ts) file to see how Monacopilot generates the prompt. This will give you an idea of how to structure the prompt for your LLM to achieve the best completions.

### Metadata Overview

The request body's `completionMetadata` object contains essential information for crafting a prompt for the LLM to generate accurate completions. See the [Completion Metadata](#completion-metadata) section for more details.

### Example Implementation (Python with FastAPI)

Here's a basic example using Python and FastAPI:

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.post('/complete')
async def handle_completion(request: Request):
    try:
        body = await request.json()
        metadata = body['completionMetadata']

        prompt = f"""Please complete the following {metadata['language']} code:

{metadata['textBeforeCursor']}
<cursor>
{metadata['textAfterCursor']}

Use modern {metadata['language']} practices and hooks where appropriate. Please provide only the completed part of the
code without additional comments or explanations."""

        # Simulate a response from a model
        response = "Your model's response here"

        return {
            'completion': response,
            'error': None
        }
    except Exception as e:
        return {
            'completion': None,
            'error': str(e)
        }
```

Now, Monacopilot is set up to send completion requests to the `/complete` endpoint and receive completions in response.

```javascript
registerCompletion(monaco, editor, {
  endpoint: 'https://my-python-api.com/complete',
  // ... other options
});
```

## Contributing

For guidelines on contributing, please read the [contributing guide](https://github.com/arshad-yaseen/monacopilot/blob/main/CONTRIBUTING.md).

We welcome contributions from the community to enhance Monacopilot's capabilities and make it even more powerful. ❤️
