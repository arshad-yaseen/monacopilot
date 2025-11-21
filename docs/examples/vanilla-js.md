# Vanilla JavaScript

This guide demonstrates how to integrate Monacopilot with a vanilla JavaScript project without any framework or build tool.

### Project Structure

```
project/
├── index.html        # Main HTML file with the Monaco Editor
├── app.js            # Frontend JavaScript to initialize editor and Monacopilot
├── server.js         # Backend server to handle code completion requests
├── .env              # Environment variables for API keys
└── package.json      # Project dependencies
```

## Implementation Steps

#### Create HTML File

Create the main HTML structure that loads Monaco Editor and Monacopilot:

```html [index.html]
<!DOCTYPE html>
<html>
    <head>
        <title>Monacopilot Example</title>
        <style>
            #editor {
                width: 800px;
                height: 400px;
                border: 1px solid #ccc;
            }
        </style>
    </head>
    <body>
        <div id="editor"></div>

        <!-- load monaco-editor -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.js"></script>
        <!-- load monacopilot -->
        <script src="https://unpkg.com/monacopilot@1.2.9/dist/index.global.js"></script>

        <script src="app.js"></script>
    </body>
</html>
```

#### Create Frontend Code

Initialize Monaco Editor and register Monacopilot for code completions:

```javascript [app.js]
require.config({
    paths: {
        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs',
    },
});

require(['vs/editor/editor.main'], function () {
    const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '// Start coding...\n',
        language: 'javascript',
        theme: 'vs-dark',
    });

    const completion = monacopilot.registerCompletion(monaco, editor, {
        language: 'javascript',
        // URL to the API endpoint we'll create in server.js below
        endpoint: 'http://localhost:3000/code-completion',
    });

    window.addEventListener('beforeunload', () => {
        completion.deregister();
    });
});
```

#### Create Backend Server

Implement an API handler to process completion requests from the editor:

```typescript [server.js]
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const {CompletionCopilot} = require('monacopilot');

const app = express();
app.use(cors());
app.use(express.json());

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

app.post('/code-completion', async (req, res) => {
    const completion = await copilot.complete({body: req.body});

    res.json(completion);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
```

::: info
You can use any backend framework or programming language for your API handler, as long as it can receive HTTP requests and return JSON responses. For non-JavaScript implementations, see the [Cross-Language API Handler](/advanced/cross-language) Implementation documentation.
:::

#### Set Environment Variables

Configure your API keys:

```bash [.env]
MISTRAL_API_KEY=your_api_key_here
```

Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

Monacopilot supports multiple AI providers and models. For details on available options and configuration, see the [Changing the Provider and Model](/configuration/copilot-options.html#changing-the-provider-and-model) documentation.

## Installation and Setup

Install the required dependencies:

```bash
npm init -y
npm install express cors monacopilot dotenv
```

### Running the Application

1. Start the backend server:

    ```bash
    node server.js
    ```

2. Open `index.html` in a browser or serve it using a local server:
    ```bash
    npx serve
    ```

## Production Considerations

- Update the endpoint URL in `app.js` to point to your production API URL when deploying to production
