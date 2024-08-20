![Hero Image](https://i.postimg.cc/FFfTy7Tv/Frame-1.png)

## Table of Contents

- [Installation](#installation)
- [Guides](#guides)
  - [Next.js Integration](#nextjs-integration)
- [Configuration Options](#configuration-options)
  - [External Context](#external-context)
  - [Changing the Provider and Model](#changing-the-provider-and-model)
  - [Filename](#filename)
  - [Completions for Specific Technologies](#completions-for-specific-technologies)
- [Cost Overview](#cost-overview)
- [FAQ](#faq)

## Installation

To install Monacopilot, run:

```bash
npm install monacopilot
```

## Guides

### Next.js Integration

Follow the steps below to integrate AI auto-completion into your Next.js project.

#### Setting Up the API Key

Start by obtaining an API key from the [Groq console](https://console.groq.com/keys). Once you have your API key, define it as an environment variable in your project:

```bash
# .env.local
GROQ_API_KEY=your-api-key
```

#### API Handler

Set up an API handler to manage auto-completion requests.

**App Router:**

```javascript
// app/api/copilot/route.ts
import { Copilot } from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const completion = await copilot.complete(body);

  return Response.json(completion, { status: 200 });
}
```

**Pages Router:**

```javascript
// pages/api/copilot.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Copilot } from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY);

export default async function handler(req, res) {
  const completion = await copilot.complete(req.body);

  res.status(200).json(completion);
}
```

#### Install Monaco Editor

Install a React-compatible Monaco editor package such as `@monaco-editor/react`:

```bash
npm install @monaco-editor/react
```

#### Register Copilot with the Monaco Editor

Next, register Copilot with the Monaco editor.

```tsx
'use client';

import { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { registerCopilot, type Monaco, type StandaloneCodeEditor } from 'monacopilot';

export default function CodeEditor() {
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const copilot = registerCopilot(
      monaco,
      editor,
      {
        endpoint: '/api/copilot',
        language: 'javascript',
      },
    );

    return () => {
      copilot.deregister();
    };
  }, [monaco, editor]);

  return (
    <MonacoEditor
      language="javascript"
      onMount={(editor, monaco) => {
        setEditor(editor);
        setMonaco(monaco);
      }}
    />
  );
}
```

Provide the `endpoint` with the path to the API handler. The `language` in `registerCopilot` is required to enable auto-completion for the specified language.

## Configuration Options

### External Context

Enhance the accuracy and relevance of Copilot's completions by providing additional code context from your workspace.

```javascript
registerCopilot(monaco, editor, {
  // ...other options
  externalContext: [
    {
      path: './utils.js',
      content: 'export const reverse = (str) => str.split("").reverse().join("")'
    }
  ]
});
```

By providing external context, Copilot can offer more intelligent suggestions. For example, if you start typing `const isPalindrome = `, Copilot may suggest using the `reverse` function from `utils.js`.

### Changing the Provider and Model

You can specify a different provider and model for completions by setting the `provider` and `model` parameters in the `Copilot` constructor.

```javascript
const copilot = new Copilot(process.env.OPENAI_API_KEY, { 
    provider: 'openai',
    model: 'gpt-4o'
});
```

The default provider is `groq` and the default model is `llama-3-70b`.

| Provider | Model       | Description                                        | Avg. Response Time |
|----------|-------------|----------------------------------------------------|--------------------|
| Groq     | llama-3-70b | Fast and efficient, suitable for most tasks        | <0.5s              |
| OpenAI   | gpt-4o-mini | Mini version of gpt-4o, cheaper                    | 1.5-3s             |
| OpenAI   | gpt-4o      | Highly intelligent, ideal for complex completions  | 1-2s               |

### Filename

Specify the name of the file being edited to receive more contextually relevant completions.

```javascript
registerCopilot(monaco, editor, {
  // ...other options
  filename: 'utils.js'  // e.g., "index.js", "utils/objects.js"
});
```

### Completions for Specific Technologies

Enable completions tailored to specific technologies by using the `technologies` option.

```javascript
registerCopilot(monaco, editor, {
  // ...other options
  technologies: ['react', 'next.js', 'tailwindcss']
});
```

## Cost Overview

The cost of completions is very affordable. See the table below for an estimate of the costs you will need to pay for completions.

| Provider   | Model       | Avg. Cost per 1000 Code Completions |
|------------|-------------|-------------------------------------|
| Groq       | llama-3-70b | $0.939                              |
| OpenAI     | gpt-4o-mini | $0.821                              |
| OpenAI     | gpt-4o      | $3.46                               |

> **Note:** Currently, Groq does not implement billing, allowing free usage of their API. During this free period, you will experience minimal rate limiting and some latency in completions. You can opt for Groq's enterprise plan to benefit from increased rate limits and get quick completions without visible latency.

## FAQ

### Is AI Auto Completion Free?

You use your own Groq or OpenAI API key for AI auto-completion. The cost of completions is very affordable, and we implement various methods to minimize these costs as much as possible. Costs vary depending on the model you use; see this [cost overview](#cost-overview) for an idea of the cost.
