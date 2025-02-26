---
title: Copilot Options
---

# Copilot Options

Configure your `CompletionCopilot` instance with different providers, models and custom options to get the best code completions for your needs.

## Changing the Provider and Model

You can specify a different provider and model by setting the `provider` and `model` parameters in the `CompletionCopilot` instance.

```javascript
const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});
```

Currently, Monacopilot supports the following provider and model:

| Provider | Models      | Notes                                                                                                | API Key                                                    |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| mistral  | `codestral` | Provides accurate code completions using Fill-in-the-Middle (FIM) technology with fast response time | [Get Mistral API Key](https://console.mistral.ai/api-keys) |

:::info
More providers and models will be added in future releases.
:::
