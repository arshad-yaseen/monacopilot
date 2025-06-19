# TanStack Start

Learn how to integrate Monacopilot with TanStack Start.

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

### API Route

First, create an API route to handle completion requests. In TanStack Start, we'll create this in your `src/routes/api` directory:

```ts [src/routes/api/code-completion.ts]
import { createServerFileRoute } from '@tanstack/react-start/server'
import { json } from '@tanstack/react-start'
import { CompletionCopilot, type CompletionRequestBody } from 'monacopilot'

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

export const ServerRoute = createServerFileRoute('/api/code-completion')
  .methods({
    POST: async ({ request }) => {
        const body: CompletionRequestBody = await request.json();
        const completion = await copilot.complete({
            body,
        });

        return json(completion);
    },
  });
```

### Editor Component

Create an Editor component:

```tsx [components/Editor.tsx]
import { useEffect, useRef } from 'react'

import MonacoEditor from '@monaco-editor/react'
import {
  registerCompletion,
  type CompletionRegistration,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot'

export default function Editor() {
  const completionRef = useRef<CompletionRegistration | null>(null)

  const handleMount = (editor: StandaloneCodeEditor, monaco: Monaco) => {
    completionRef.current = registerCompletion(monaco, editor, {
      endpoint: '/api/code-completion',
      language: 'javascript',
    })
  }

  useEffect(() => {
    return () => {
      completionRef.current?.deregister()
    }
  }, [])

  return (
    <MonacoEditor
      height="600px"
      language="javascript"
      onMount={handleMount}
      theme="vs-dark"
    />
  )
}
```

### Page Component

Use the Editor component anywhere in your app, in this case we'll use it in the home page.

```tsx [src/routes/index.tsx]
import { createFileRoute } from '@tanstack/react-router'
import Editor from '~/components/Editor'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="h-screen w-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Monacopilot TanStack Start Example</h1>
      <Editor />
    </main>
  )
}
```

### Environment Variables

Create a `.env.local` file in your project root:

```bash [.env.local]
MISTRAL_API_KEY=your_mistral_api_key_here
```

Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

Monacopilot supports multiple AI providers and models. For details on available options and configuration, see the [Changing the Provider and Model](/configuration/copilot-options#changing-the-provider-and-model) documentation.

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
npm run dev
```

```bash [yarn]
yarn dev
```

```bash [pnpm]
pnpm dev
```

```bash [bun]
bun dev
```

:::

3. Open your browser and navigate to `http://localhost:3000`. You should see the editor with AI auto-completions.
