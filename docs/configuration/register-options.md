---
title: Register Completion Options
---

# Register Completion Options

The `registerCompletion` function accepts several options that allow you to customize how code completions are triggered and displayed in your Monaco Editor. This guide covers all the available options and their usage.

## Trigger Mode

The `trigger` option determines when the completion service provides code completions. You can choose between receiving suggestions/completions in real-time as you type or after a brief pause.

```javascript
registerCompletion(monaco, editor, {
    trigger: 'onTyping',
});
```

| Trigger              | Description                                         | Notes                                                                                                                                                                     |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'onIdle'` (default) | Provides completions after a brief pause in typing. | This approach is less resource-intensive, as it only initiates a request when the editor is idle.                                                                         |
| `'onTyping'`         | Provides completions in real-time as you type.      |                                                                                                                                                                           |
| `'onDemand'`         | Does not provide completions automatically.         | Completions are triggered manually using the `trigger` function from the `registerCompletion` return. This allows for precise control over when completions are provided. |

[OnTyping Demo](https://github.com/user-attachments/assets/22c2ce44-334c-4963-b853-01b890b8e39f)

::: tip
If you are using `mistral` models with the `onTyping` trigger, it is recommended to use Mistral's pay-as-you-go plan. This ensures you will never hit rate limit errors and allows you to experience super fast and accurate completions.
:::

## Manually Trigger Completions

If you prefer not to trigger completions automatically (e.g., on typing or on idle), you can trigger completions manually. This is useful in scenarios where you want to control when completions are provided, such as through a button click or a keyboard shortcut.

```javascript
const completion = registerCompletion(monaco, editor, {
    trigger: 'onDemand',
});

completion.trigger();
```

To set up manual triggering, configure the `trigger` option to `'onDemand'`. This disables automatic completions, allowing you to call the `completion.trigger()` method explicitly when needed.

### Trigger Completions with a Keyboard Shortcut

You can set up completions to trigger when the `Ctrl+Shift+Space` keyboard shortcut is pressed.

```javascript
const completion = registerCompletion(monaco, editor, {
    trigger: 'onDemand',
});

editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Space,
    () => {
        completion.trigger();
    },
);
```

### Trigger Completions with an Editor Action

You can add a custom editor action to trigger completions manually.

![Editor Action Demo](https://i.postimg.cc/pTNQ3k6J/editor-action-demo.png)

```javascript
const completion = registerCompletion(monaco, editor, {
    trigger: 'onDemand',
});

monaco.editor.addEditorAction({
    id: 'monacopilot.triggerCompletion',
    label: 'Complete Code',
    contextMenuGroupId: 'navigation',
    keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Space,
    ],
    run: () => {
        completion.trigger();
    },
});
```

## Multi-File Context

Improve Copilot's suggestions by providing code context from other files in your project. This helps Copilot understand your broader codebase and offer more relevant completions.

```javascript
registerCompletion(monaco, editor, {
    relatedFiles: [
        {
            path: './utils.js', // The exact path you'd use when importing
            content:
                'export const reverse = (str) => str.split("").reverse().join("")',
        },
    ],
});
```

The `path` value should match how you actually import the file in your code. After registering, when you type `const isPalindrome = `, Copilot will suggest code that properly imports and uses the `reverse` function from your utils.js file.

## Filename

Specify the name of the file being edited to receive more contextually relevant completions.

```javascript
registerCompletion(monaco, editor, {
    filename: 'utils.js', // e.g., "index.js", "utils/objects.js"
});
```

Now, the completions will be more relevant to the file's context.

## Completions for Specific Technologies

Enable completions tailored to specific technologies by using the `technologies` option.

```javascript
registerCompletion(monaco, editor, {
    technologies: ['react', 'next.js', 'tailwindcss'],
});
```

This configuration will provide completions relevant to React, Next.js, and Tailwind CSS.

## Max Context Lines

To manage potentially lengthy code in your editor, you can limit the number of lines included in the completion request using the `maxContextLines` option. By default, this is set to `100` lines.

For example, if there's a chance that the code in your editor may exceed `500` lines, you don't need to provide all those lines to the model. This would increase costs due to the huge number of input tokens. You can adjust `maxContextLines` based on how accurate you want the completions to be and how much you're willing to pay for the model.

```javascript
registerCompletion(monaco, editor, {
    maxContextLines: 60,
});
```

## Caching Completions

Monacopilot caches completions by default. It uses a FIFO (First In First Out) strategy, reusing cached completions when the context and cursor position match while editing (default: `true`). To disable caching:

```javascript
registerCompletion(monaco, editor, {
    enableCaching: false,
});
```

## Follow-Up Completions

By default, Monacopilot will automatically generate a new completion immediately after the user accepts a completion. This feature, controlled by the `allowFollowUpCompletions` option, enhances productivity by providing a continuous flow of suggestions (default: `true`).

To disable follow-up completions:

```javascript
registerCompletion(monaco, editor, {
    allowFollowUpCompletions: false,
});
```

When disabled, the system will not automatically generate new completions after accepting one, giving you more control over when completions appear.

## Handling Errors

When an error occurs during the completion process or requests, Monacopilot will log it to the console by default rather than throwing errors. This ensures smooth editing even when completions are unavailable.

You can provide this callback to handle errors yourself, which will disable the default console logging.

```javascript
registerCompletion(monaco, editor, {
    onError: error => {
        console.error(error);
    },
});
```

## Completion Event Handlers

The editor provides several events to handle completion suggestions. These events allow you to respond to different stages of the completion process, such as when a suggestion is shown or accepted by the user.

### onCompletionShown

This event is triggered when a completion suggestion is shown to the user. You can use this event to log or perform actions when a suggestion is displayed.

```javascript
registerCompletion(monaco, editor, {
    // ... other options
    onCompletionShown: (completion, range) => {
        console.log('Completion suggestion:', {completion, range});
    },
});
```

**Parameters:**

- `completion`: The completion text that is being shown
- `range`: The editor range object where the completion will be inserted

### onCompletionAccepted

Event triggered when a completion suggestion is accepted by the user.

```javascript
registerCompletion(monaco, editor, {
    // ... other options
    onCompletionAccepted: () => {
        console.log('Completion accepted');
    },
});
```

### onCompletionRejected

Event triggered when a completion suggestion is rejected by the user.

```javascript
registerCompletion(monaco, editor, {
    // ... other options
    onCompletionRejected: () => {
        console.log('Completion rejected');
    },
});
```

### onCompletionRequested

Event triggered when a completion is requested, before it is fetched. This allows you to track when completion requests are initiated and access the request parameters.

```javascript
registerCompletion(monaco, editor, {
    // ... other options
    onCompletionRequested: params => {
        console.log('Completion requested:', {
            endpoint: params.endpoint,
            metadata: params.body.completionMetadata,
        });
    },
});
```

**Parameters:**

- `params`: An object containing:
    - `endpoint`: The endpoint where the completion request will be sent
    - `body`: The request body containing completion metadata

## Conditional Completion Triggering

Control when completions are triggered based on custom conditions using the `triggerIf` option.

```javascript
registerCompletion(monaco, editor, {
    // ... other options
    triggerIf: ({text, position, triggerType}) => {
        // Only trigger completions when cursor is at the beginning of a line
        return position.column === 1;
    },
});
```

The `triggerIf` function receives:

- `text`: The current text in the editor
- `position`: The current cursor position
- `triggerType`: The type of trigger that initiated the completion ('onIdle', 'onTyping', or 'onDemand')

Return `true` to allow the completion or `false` to prevent it.
