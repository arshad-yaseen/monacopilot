---
title: Custom Model
---

# Custom Model

You can use a custom LLM that isn't built into Monacopilot by setting up a `model` when you create a new CompletionCopilot. This feature lets you connect to LLMs from other services or your own custom-built models.

## Example

```javascript
const copilot = new CompletionCopilot(undefined, {
    // You don't need to set the provider if you are using a custom model.
    // provider: "openai",
    model: async prompt => {
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        {role: 'system', content: prompt.context},
                        {
                            role: 'user',
                            content: `${prompt.instruction}\n\n${prompt.fileContent}`,
                        },
                    ],
                    temperature: 0.2,
                    max_tokens: 256,
                }),
            },
        );

        const data = await response.json();

        return {
            text: data.choices[0].message.content,
        };
    },
});
```

## Implementation

The `model` option accepts an async function with the following signature:

```typescript
type CustomCopilotModel = (prompt: PromptData) => Promise<CustomModelResponse>;

type CustomModelResponse = {
    /** The generated text content, or null if no text was generated */
    text: string | null;
};
```

### Prompt Data Structure

The `prompt` parameter passed to the model function has the following structure:

```typescript
interface PromptData {
    /**
     * Contextual information about the code environment
     * @example filename, technologies, etc.
     */
    context: string;

    /**
     * Instructions for the AI model on how to generate the completion
     */
    instruction: string;

    /**
     * The content of the file being edited
     */
    fileContent: string;
}
```

## Model Accuracy Considerations

When using a custom model, the accuracy of completions becomes your responsibility. Monacopilot's built-in models like Codestral support Fill-in-the-Middle (FIM) capabilities, which significantly enhances completion accuracy by understanding both the prefix and suffix context.

If your custom model doesn't support FIM, you may need to:

- Improve the prompt engineering to compensate
- Use a higher-quality model

For best results, consider using code-optimized models when available.

## Editor Integration Options

When registering your completion with Monaco editor, there are some options especially relevant for custom models:

```javascript
registerCompletion(editor, {
    // Disable follow-up completions for general-purpose models
    allowFollowUpCompletions: false,
    // other options...
});
```

### <code>[allowFollowUpCompletions](/configuration/register-options.html#follow-up-completions)</code>

This option controls whether new follow-up completions are automatically triggered after accepting a completion. Set it to `false` when:

- Using general-purpose models like GPT-4o
- Working with models that don't have FIM capabilities
- Experiencing poor quality follow-up suggestions

Leave it enabled (`true`) when:

- Using custom models that have FIM capabilities
- Working with code-completion-optimized models

## Client SDKs Example

You can use client SDKs for various AI providers to simplify integration with your custom model. The following example demonstrates how to use the Anthropic SDK to connect Claude models to Monacopilot.

```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const copilot = new CompletionCopilot(undefined, {
    model: async prompt => {
        const completion = await anthropic.messages.create({
            model: 'claude-3-5-haiku-latest',
            max_tokens: 1024,
            messages: [
                {role: 'system', content: prompt.context},
                {
                    role: 'user',
                    content: `${prompt.instruction}\n\n${prompt.fileContent}`,
                },
            ],
            temperature: 0.1,
        });

        return {
            text: completion.content[0].text,
        };
    },
});
```

## Working with Different Models

When working with different models, you'll need to format the prompt data appropriately for your specific model:

- For chat-based models (OpenAI, Anthropic, etc.):

    ```javascript
    // OpenAI format
    messages: [
        {role: 'system', content: prompt.context},
        {
            role: 'user',
            content: `${prompt.instruction}\n\n${prompt.fileContent}`,
        },
    ];

    // Anthropic format
    system: prompt.context,
    messages: [
        {
            role: 'user',
            content: `${prompt.instruction}\n\n${prompt.fileContent}`,
        },
    ];
    ```

- For completion-based models:
    ```javascript
    // Single prompt format
    prompt: `Context: ${prompt.context}\nFile: ${prompt.fileContent}\nTask: ${prompt.instruction}`;
    ```

::: tip
Please ensure you are using a high-quality model, especially for coding tasks, to get the best and most accurate completions. For production use, choose specialized code-optimized models. Also, use a model with very low response latency (preferably under 1 second) to enjoy a great experience and utilize the full power of Monacopilot.
:::
