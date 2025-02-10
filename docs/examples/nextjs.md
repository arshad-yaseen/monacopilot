# Next.js Example

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

const copilot = new CompletionCopilot(process.env.OPENAI_API_KEY!, {
    provider: 'openai',
    model: 'gpt-4o',
});

export async function POST(req: NextRequest) {
    const body: CompletionRequestBody = await req.json();
    const {completion, error} = await copilot.complete({
        body,
    });

    if (error) {
        return NextResponse.json({completion: null, error}, {status: 500});
    }

    return NextResponse.json({completion}, {status: 200});
}
```

```ts [Pages Router]
// pages/api/code-completion.ts
import {NextApiRequest, NextApiResponse} from 'next';

import {CompletionCopilot} from 'monacopilot';

const copilot = new CompletionCopilot(process.env.OPENAI_API_KEY!, {
    provider: 'openai',
    model: 'gpt-4o',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {completion, error} = await copilot.complete({
        body: req.body,
    });

    if (error) {
        res.status(500).json({completion: null, error});
    }

    res.status(200).json({completion});
}
```

:::

### Editor Component

Create a Editor component:

```tsx
// components/Editor.tsx
'use client';

import {useEffect, useState} from 'react';

import MonacoEditor from '@monaco-editor/react';
import {
    registerCompletion,
    type Monaco,
    type StandaloneCodeEditor,
} from 'monacopilot';

export default function Editor() {
    const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
    const [monaco, setMonaco] = useState<Monaco | null>(null);

    useEffect(() => {
        if (!monaco || !editor) return;

        const completion = registerCompletion(monaco, editor, {
            endpoint: '/api/code-completion',
            language: 'javascript',
        });

        return () => {
            completion.deregister();
        };
    }, [monaco, editor]);

    return (
        <MonacoEditor
            language="javascript"
            height={'100vh'}
            width={'100%'}
            onMount={(editor, monaco) => {
                setEditor(editor);
                setMonaco(monaco);
            }}
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
OPENAI_API_KEY=your_openai_api_key_here
```

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

You should now see a full-screen Monaco Editor with AI-powered completions working!

::: tip
Make sure you have set up your environment variables correctly before running the example.
:::
