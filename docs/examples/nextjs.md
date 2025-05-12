# Next.js

Learn how to integrate Monacopilot with Next.js using either the App Router or Pages Router.

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

First, create an API route to handle completion requests:

::: code-group

```ts [App Router]
// app/api/code-completion/route.ts
import {NextRequest, NextResponse} from 'next/server';

import {CompletionCopilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

export async function POST(req: NextRequest) {
    const body: CompletionRequestBody = await req.json();
    const completion = await copilot.complete({
        body,
    });

    return NextResponse.json(completion, {status: 200});
}
```

```ts [Pages Router]
// pages/api/code-completion.ts
import {NextApiRequest, NextApiResponse} from 'next';

import {CompletionCopilot} from 'monacopilot';

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const completion = await copilot.complete({
        body: req.body,
    });

    res.status(200).json(completion);
}
```

:::

### Editor Component

Create a Editor component (`components/Editor.tsx`):

```jsx
'use client';

import {useEffect, useRef} from 'react';

import MonacoEditor from '@monaco-editor/react';
import {
    registerCompletion,
    type CompletionRegistration,
    type Monaco,
    type StandaloneCodeEditor,
} from 'monacopilot';

export default function Editor() {
    const completionRef = useRef<CompletionRegistration | null>(null);

    const handleMount = (editor: StandaloneCodeEditor, monaco: Monaco) => {
        completionRef.current = registerCompletion(monaco, editor, {
            endpoint: '/api/code-completion',
            language: 'javascript',
        });
    };

    useEffect(() => {
        return () => {
            completionRef.current?.deregister();
        };
    }, []);

    return (
        <MonacoEditor
            language="javascript"
            onMount={handleMount}
        />
    );
}
```

### Page Component

Use the Editor component in your page:

::: code-group

```tsx [App Router]
// app/page.tsx
import Editor from '@/components/Editor';

export default function Home() {
    return (
        <main className="h-screen w-screen">
            <h1>Monacopilot Next.js Example</h1>

            <Editor />
        </main>
    );
}
```

```tsx [Pages Router]
// pages/index.tsx
import Editor from '@/components/Editor';

export default function Home() {
    return (
        <main className="h-screen w-screen">
            <h1>Monacopilot Next.js Example</h1>

            <Editor />
        </main>
    );
}
```

:::

### Environment Variables

Create a `.env.local` file in your project root:

```bash
MISTRAL_API_KEY=your_mistral_api_key_here
```

Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

Monacopilot supports multiple AI providers and models. For details on available options and configuration, see the [Changing the Provider and Model](/configuration/copilot-options#changing-the-provider-and-model) documentation.

## Project Structure

Here's the complete project structure for both routing approaches:

::: code-group

```txt [App Router]
your-project/
├── app/
│   ├── api/
│   │   └── code-completion/
│   │       └── route.ts
│   └── page.tsx
├── components/
│   └── Editor.tsx
├── .env.local
└── package.json
```

```txt [Pages Router]
your-project/
├── pages/
│   ├── api/
│   │   └── code-completion.ts
│   └── index.tsx
├── components/
│   └── Editor.tsx
├── .env.local
└── package.json
```

:::

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

3. Open `http://localhost:3000` in your browser.

You should now see a Monaco Editor with AI-powered completions working!
