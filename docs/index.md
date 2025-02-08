---
title: Monacopilot
description: AI auto-completion plugin for Monaco Editor, inspired by GitHub Copilot.
---

# Quick Start

Add GitHub Copilot-style AI completions to your Monaco Editor in in just 3 simple steps 🚀

## Install the package

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

:::

## Register the AI completion to your editor

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
    endpoint: 'https://api.example.com/code-completion',
});
```

## Create your completion API handler

Create an API handler for the endpoint (e.g. `/code-completion`) you provided in the `registerCompletion` function to handle completion requests from the editor.

In our example, we are using Express.js:

```typescript
import {Copilot} from 'monacopilot';

const copilot = new Copilot(OPENAI_API_KEY, {
    provider: 'openai',
    model: 'gpt-4o',
});

app.post('/code-completion', async (req, res) => {
    const {completion, error, raw} = await copilot.complete({body: req.body});

    // Optional: Use raw response for analytics or token counting
    if (raw) {
        calculateCost(raw.usage.input_tokens);
    }

    if (error) {
        return res.status(500).json({completion: null, error});
    }

    res.json({completion});
});
```

**That's it! Your Monaco Editor now has AI-powered completions! 🎉**

> [!TIP]
> You can use any backend framework or programming language for your API handler, as long as the endpoint is accessible from the browser. For non-JavaScript implementations, see [Cross-Language API Handler Implementation](/advanced/cross-language).
