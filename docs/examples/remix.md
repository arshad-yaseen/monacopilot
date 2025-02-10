# Remix Example

Learn how to integrate Monacopilot with Remix.

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

Create a route handler for completions in `app/routes/code-completion.tsx`:

```tsx
import {json, type ActionFunctionArgs} from '@remix-run/node';
import {CompletionCopilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new CompletionCopilot(process.env.OPENAI_API_KEY!, {
    provider: 'openai',
    model: 'gpt-4',
});

export const action = async ({request}: ActionFunctionArgs) => {
    const body: CompletionRequestBody = await request.json();
    const {completion, error} = await copilot.complete({body});

    if (error) {
        return json({completion: null, error}, {status: 500});
    }

    return json(completion);
};
```

### Editor Component

Create a Editor component in `app/components/Editor.tsx`:

```tsx
import {useEffect, useState} from 'react';

import {Editor as MonacoEditor} from '@monaco-editor/react';
import {
    Monaco,
    registerCompletion,
    type StandaloneCodeEditor,
} from 'monacopilot';

export default function Editor() {
    const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
    const [monaco, setMonaco] = useState<Monaco | null>(null);

    useEffect(() => {
        if (!monaco || !editor) return;

        const completion = registerCompletion(monaco, editor, {
            endpoint: '/code-completion',
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

Create your page component in `app/routes/_index.tsx`:

```tsx
import Editor from '~/components/Editor';

export default function Index() {
    return (
        <main className="h-screen w-screen">
            <h1>Monacopilot Remix Example</h1>

            <Editor />
        </main>
    );
}
```

### Environment Variables

Create a `.env` file in your project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## Project Structure

Here's the complete project structure:

```txt
your-remix-project/
├── app/
│   ├── components/
│   │   └── Editor.tsx
│   ├── routes/
│   │   ├── _index.tsx
│   │   └── code-completion.tsx
│   └── root.tsx
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

- Make sure you have set up your environment variables correctly before running the example.
- Remix uses file-based routing, so the `/code-completion` endpoint is automatically created from the `code-completion.tsx` route file.
  :::
