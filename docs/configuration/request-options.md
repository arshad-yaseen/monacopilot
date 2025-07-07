---
title: Completion Request Options
---

# Completion Request Options

Configure how completion requests are made to the LLM provider.

## Custom Request Handler

You can override the default fetch behavior when making requests to the LLM provider by providing a custom `aiRequestHandler`. This allows you to use your own HTTP client or add custom logic such as authentication, retry mechanisms, or request/response transformation.

```javascript
copilot.complete({
    options: {
        aiRequestHandler: async ({ endpoint, body, headers }) => {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { ...headers, 'X-Custom-Header': 'value' },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error("Failed to get completion")
            }
            return response.json()
        },
    },
});
```
