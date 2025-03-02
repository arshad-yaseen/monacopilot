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

First, create an API route to handle completion requests. In TanStack Start, we'll create this in your `app/routes/api` directory:

```ts
// app/routes/api/code-completion.ts
import {json} from '@tanstack/react-start';
import {createAPIFileRoute} from '@tanstack/react-start/api';
import {CompletionCopilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

export const APIRoute = createAPIFileRoute('/api/code-completion')({
    POST: async ({request}) => {
        const body: CompletionRequestBody = await request.json();
        const completion = await copilot.complete({
            body,
        });

        return json(completion);
    },
});
```

### API Entry Handler

Make sure you have the API entry handler set up in your `app/api.ts` file:

```ts
// app/api.ts
import {
    createStartAPIHandler,
    defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api';

export default createStartAPIHandler(defaultAPIFileRouteHandler);
```

### Editor Component

Create an Editor component (`components/Editor.tsx`):

```jsx
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

Use the Editor component in your page by creating a route file:

```tsx
// app/routes/index.tsx
import {createFileRoute} from '@tanstack/react-router';

import Editor from '../components/Editor';

export const Route = createFileRoute('/')({
    component: Home,
});

function Home() {
    return (
        <main className="h-screen w-screen p-4">
            <h1 className="text-2xl font-bold mb-4">
                Monacopilot TanStack Start Example
            </h1>
            <div className="h-[600px] border border-gray-300 rounded">
                <Editor />
            </div>
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

Here's the complete project structure for a TanStack Start application with Monacopilot integration:

```txt
your-tanstack-app/
├── app/
│   ├── api.ts
│   ├── client.tsx
│   ├── router.tsx
│   ├── ssr.tsx
│   └── routes/
│       ├── __root.tsx
│       ├── index.tsx
│       └── api/
│           └── code-completion.ts
├── components/
│   └── Editor.tsx
├── .env
├── app.config.ts
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
