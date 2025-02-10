---
title: User-Selectable Models
---

# User-Selectable Models

This guide shows you how to allow users to switch between different AI models for code completion. We'll accomplish this by:

1. Using the <code>[requestHandler](/advanced/custom-request-handler)</code> option to send the user's selected model to the server
2. Setting up multiple model instances on the server-side
3. Dynamically choosing the right model for each completion request

Here's how it works:

```javascript
// Example of model selected
// by user via UI (e.g. dropdown, settings panel)
const selectedModel = 'gpt-4o';

registerCompletion(monaco, editor, {
    endpoint: 'https://api.example.com/code-completion',
    requestHandler: async ({endpoint, body}) => {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body,
                // Attach selected model to request body
                model: selectedModel,
            }),
        });

        const data = await response.json();
        return {
            completion: data.completion,
        };
    },
});
```

Server-side implementation (Example using Express.js): This is the server-side API handler that the `endpoint` parameter points to in the `registerCompletion` function.

```javascript
import express from 'express';
import {CompletionCopilot} from 'monacopilot';

const app = express();

// Initialize different copilot instances for different models
const copilotInstances = {
    'gpt-4o': new CompletionCopilot(process.env.OPENAI_API_KEY, {
        provider: 'openai',
        model: 'gpt-4o',
    }),
    'sonnet-3-5-sonnet': new CompletionCopilot(process.env.ANTHROPIC_API_KEY, {
        provider: 'anthropic',
        model: 'claude-3-5-sonnet',
    }),
    'llama-3-70b': new CompletionCopilot(process.env.GROQ_API_KEY, {
        provider: 'groq',
        model: 'llama-3-70b',
    }),
};

app.post('/code-completion', async (req, res) => {
    try {
        // Get the selected model from the request body
        const {model, ...completionBody} = req.body;

        // Use the appropriate copilot instance based on selected model
        const copilot = copilotInstances[model];
        if (!copilot) {
            return res.status(400).json({
                completion: null,
                error: 'Invalid model selected',
            });
        }

        const {completion, error} = await copilot.complete({
            body: completionBody,
        });

        if (error) {
            return res.status(500).json({
                completion: null,
                error,
            });
        }

        res.json({completion});
    } catch (err) {
        res.status(500).json({
            completion: null,
            error: err.message,
        });
    }
});

app.listen(3000);
```

The server maintains a map of CompletionCopilot instances configured with different providers and models, allowing for flexible model selection while keeping API keys secure on the server side.
