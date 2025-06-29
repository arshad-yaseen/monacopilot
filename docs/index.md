# Quick Start

Add GitHub Copilot-style AI completions to your Monaco Editor in in just 3 simple steps 🚀

<img src="https://monacopilot.dev/og.png" alt="Hero Image" style="border-radius: 10px;" />

### Install the package

::: code-group

```bash [npm]
npm install monacopilot
```

```bash [yarn]
yarn add monacopilot
```

```bash [pnpm]
pnpm add monacopilot
```

```bash [bun]
bun add monacopilot
```

```html [CDN]
<script src="https://unpkg.com/monacopilot@1.2.4/dist/index.global.js"></script>

<!-- or -->

<script src="https://cdn.jsdelivr.net/npm/monacopilot@1.2.4/dist/index.global.js"></script>
```

:::

### Register the AI completion to your editor

In your frontend code:

```typescript
import * as monaco from 'monaco-editor';
import {registerCompletion} from 'monacopilot';

const editor = monaco.editor.create(document.getElementById('container'), {
    language: 'javascript',
});

registerCompletion(monaco, editor, {
    language: 'javascript',
    // Your API endpoint for handling completion requests
    endpoint: 'https://your-api-url.com/code-completion',
});
```

### Create your completion API handler

Create an API handler for the endpoint (e.g. `/code-completion`) you provided in the `registerCompletion` function to handle completion requests from the editor.

You can use any JavaScript runtime or Node.js framework that can handle HTTP requests and return JSON responses for completions. Below are example implementations using Express.js and Bun. The idea is straightforward.

::: code-group

```typescript [Express.js]
import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import {CompletionCopilot} from 'monacopilot';

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

app.listen(process.env.PORT || 3000);
```

```typescript [Bun]
import {CompletionCopilot} from 'monacopilot';

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

Bun.serve({
    port: process.env.PORT || 3000,

    routes: {
        '/completion': {
            POST: async req => {
                const body = await req.json();
                const completion = await copilot.complete({body});

                return Response.json(completion);
            },
        },
    },
});
```

:::

Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

Monacopilot supports multiple AI providers and models. For details on available options and configuration, see the [Changing the Provider and Model](/configuration/copilot-options#changing-the-provider-and-model) documentation.

**That's it! Your Monaco Editor now has AI-powered completions! 🎉**
