---
title: Browser-Only Implementation
---

# Browser-Only Implementation

:::warning
**Security Warning**: This exposes your API keys in client-side code and is not secure. Use only for testing, internal tools, or when security is not a concern.

For production applications accessible to the public, we strongly recommend using the server-side approach described in the [Quick Start](/) guide.
:::

## Overview

While Monacopilot's recommended architecture separates client and server responsibilities to keep your API keys secure, you might have scenarios where a browser-only implementation is preferred.

This guide shows how to implement Monacopilot entirely in the browser without a separate server endpoint.

## Implementation

The key to a browser-only implementation is using the `requestHandler` option with `CompletionCopilot` directly in your client code:

```javascript
import { registerCompletion, CompletionCopilot } from 'monacopilot';

// Create the copilot instance directly in the browser
const copilot = new CompletionCopilot('YOUR_API_KEY', {
  provider: 'mistral',
  model: 'codestral',
});

registerCompletion(monaco, editor, {
  language: 'javascript',
  // Use requestHandler instead of endpoint
  requestHandler: async ({ body }) => {
    const completion = await copilot.complete({ body });
    return completion;
  },
});
```
