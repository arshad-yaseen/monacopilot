---
title: Completion Request Options
---

# Completion Request Options

Configure how completion requests are made to the LLM provider by customizing headers, prompts, and other options to fine-tune the behavior of code completions.

## Custom Headers for LLM Requests

You can add custom headers to the provider's completion requests. For example, if you select `mistral` as your provider, you can add a custom header to the mistral completion requests made by Monacopilot.

```javascript
copilot.complete({
    options: {
        headers: {
            'X-Custom-Header': 'custom-value',
        },
    },
});
```
