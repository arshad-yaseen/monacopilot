# Gatsby

Learn how to integrate Monacopilot with Gatsby.

## Installation

First, install the required dependencies:

::: code-group

```bash [npm]
npm install monacopilot @monaco-editor/react
```

```bash [yarn]
yarn add monacopilot @monaco-editor/react
```

```bash [pnpm]
pnpm add monacopilot @monaco-editor/react
```

```bash [bun]
bun add monacopilot @monaco-editor/react
```

:::

## Implementation

### API Function

Gatsby supports serverless functions placed under the `/src/api` directory. Create a function for completions in `src/api/code-completion.ts`:

```typescript
import type {GatsbyFunctionRequest, GatsbyFunctionResponse} from 'gatsby';
import {CompletionCopilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY!, {
    provider: 'mistral',
    model: 'codestral',
});

export async function handler(
    req: GatsbyFunctionRequest,
    res: GatsbyFunctionResponse,
) {
    if (req.method !== 'POST') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }

    try {
        const body: CompletionRequestBody = JSON.parse(req.body);
        const completion = await copilot.complete({body});
        res.status(200).json(completion);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error', details: error});
    }
}
```

### Editor Component

Create an Editor component in `src/components/Editor.tsx`:

```typescript
import { useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
  registerCompletion,
  type CompletionRegistration,
  type Monaco,
  type StandaloneCodeEditor,
} from "monacopilot";

export default function Editor() {
  const completionRef = useRef<CompletionRegistration | null>(null);

  const handleMount = (editor: StandaloneCodeEditor, monaco: Monaco) => {
    completionRef.current = registerCompletion(monaco, editor, {
      endpoint: "/api/code-completion",
      language: "javascript",
    });
  };

  useEffect(() => {
    return () => {
      completionRef.current?.deregister();
    };
  }, []);

  return <MonacoEditor language="javascript" onMount={handleMount} />;
}
```

### Page Component

Create your page component in `src/pages/index.tsx`:

```typescript
import * as React from "react";
import Editor from "../components/Editor";

export default function IndexPage() {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <h1>Monacopilot Gatsby Example</h1>
      <Editor />
    </main>
  );
}
```

### Environment Variables

Create a `.env` file in your project root:

```bash
MISTRAL_API_KEY=your_mistral_api_key_here
```

Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

Monacopilot supports multiple AI providers and models. For details on available options and configuration, see the [Changing the Provider and Model](/configuration/copilot-options#changing-the-provider-and-model) documentation.

## Project Structure

Here's the complete project structure:

```txt
your-gatsby-project/
├── src/
│   ├── api/
│   │   └── code-completion.ts
│   ├── components/
│   │   └── Editor.tsx
│   └── pages/
│       └── index.tsx
├── .env
└── package.json
```

## Running the Example

1. Install dependencies:

::: code-group

```bash [npm]
npm install
```

```bash [yarn]
yarn
```

```bash [pnpm]
pnpm install
```

```bash [bun]
bun install
```

:::

2. Start the development server:

::: code-group

```bash [npm]
npm run develop
```

```bash [yarn]
yarn develop
```

```bash [pnpm]
pnpm develop
```

```bash [bun]
bun develop
```

:::

3. Open `http://localhost:8000` in your browser.

You should now see a Monaco Editor with AI-powered completions working!
