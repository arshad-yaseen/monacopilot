# Remix

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

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

export const action = async ({request}: ActionFunctionArgs) => {
    const body: CompletionRequestBody = await request.json();
    const completion = await copilot.complete({body});

    return json(completion);
};
```

### Editor Component

Create a Editor component in `app/components/Editor.tsx`:

```tsx
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
            endpoint: '/code-completion',
            language: 'javascript',
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
MISTRAL_API_KEY=your_mistral_api_key_here
```

Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

Monacopilot supports multiple AI providers and models. For details on available options and configuration, see the [Changing the Provider and Model](/configuration/copilot-options#changing-the-provider-and-model) documentation.

Obtain your Mistral API Key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

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
