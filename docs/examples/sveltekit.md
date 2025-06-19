# SvelteKit

Learn how to integrate Monacopilot with SvelteKit.

## Installation

First, install the required dependencies in your SvelteKit project:

::: code-group

```bash [npm]
npm install monacopilot @monaco-editor/loader monaco-editor
```

```bash [yarn]
yarn add monacopilot @monaco-editor/loader monaco-editor
```

```bash [pnpm]
pnpm add monacopilot @monaco-editor/loader monaco-editor
```

```bash [bun]
bun add monacopilot @monaco-editor/loader monaco-editor
```

:::

These packages include:

- `monacopilot`: Provides AI-powered code completions.
- `@monaco-editor/loader`: Loads the Monaco Editor using the loader method.
- `monaco-editor`: The core Monaco Editor library.

## Implementation

### API Route

Create an API route to handle code completion requests from Monacopilot. In SvelteKit, API routes are defined in the `src/routes` directory using `+server.ts` files.

Create a file at `src/routes/api/code-completion/+server.ts`:

```typescript
import {json} from '@sveltejs/kit';
import type {RequestHandler} from '@sveltejs/kit';
import {MISTRAL_API_KEY} from '$env/static/private';
import {CompletionCopilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new CompletionCopilot(MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});

export const POST: RequestHandler = async ({request}) => {
    const body: CompletionRequestBody = await request.json();
    const completion = await copilot.complete({body});
    return json(completion);
};
```

Ensure that `MISTRAL_API_KEY` is set in your environment variables (see the Environment Variables section below).

### Editor Component

Create a Svelte component to integrate the Monaco Editor with Monacopilot. Place this in `src/lib/components/Editor.svelte`:

```html
<script lang="ts">
    import loader from '@monaco-editor/loader';
    import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
    import {registerCompletion, type CompletionRegistration} from 'monacopilot';
    import {onDestroy, onMount} from 'svelte';

    let editor: Monaco.editor.IStandaloneCodeEditor;
    let monaco: typeof Monaco;
    let editorContainer: HTMLElement;
    let completionRegistration: CompletionRegistration | null = null;

    onMount(async () => {
        // Load Monaco Editor using the loader method
        const monacoEditor = await import('monaco-editor');
        loader.config({monaco: monacoEditor.default});
        monaco = await loader.init();

        // Create the editor instance
        editor = monaco.editor.create(editorContainer, {
            value: "console.log('Hello from Monaco!')",
            language: 'javascript',
            theme: 'vs-dark', // Optional: Customize the theme
        });

        // Register Monacopilot completion provider
        completionRegistration = registerCompletion(monaco, editor, {
            endpoint: '/api/code-completion',
            language: 'javascript',
        });
    });

    onDestroy(() => {
        // Clean up resources
        if (completionRegistration) {
            completionRegistration.deregister();
        }
        if (editor) {
            editor.dispose();
        }
        if (monaco) {
            monaco.editor.getModels().forEach(model => model.dispose());
        }
    });
</script>

<div bind:this="{editorContainer}" style="width: 100%; height: 600px;"></div>
```

This component:

- Uses `@monaco-editor/loader` to load the Monaco Editor dynamically.
- Creates an editor instance with an initial JavaScript code snippet.
- Registers Monacopilot's completion provider, pointing to the `/api/code-completion` endpoint.
- Cleans up resources when the component is destroyed to prevent memory leaks.

### Page Component

Use the Editor component in a SvelteKit page. Create or modify `src/routes/+page.svelte`:

```html
<script>
    import Editor from '$lib/components/Editor.svelte';
</script>

<main>
    <h1>Monacopilot SvelteKit Example</h1>
    <Editor />
</main>

<style>
    main {
        height: 100vh;
        width: 100vw;
        padding: 1rem;
    }
</style>
```

### Environment Variables

Create a `.env` file in your project root:

```bash
MISTRAL_API_KEY=your_mistral_api_key_here
```

Obtain your Mistral API key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

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
pnpm run dev
```

```bash [bun]
bun dev
```

:::

3. Open `http://localhost:5173` (or the port specified in your terminal) in your browser.

You should now see a Monaco Editor with AI-powered code completions powered by Monacopilot!
