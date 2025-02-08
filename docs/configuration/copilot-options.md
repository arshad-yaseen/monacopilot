---
title: Copilot Options
---

# Copilot Options

Configure your Copilot instance with different providers, models and custom options to get the best code completions for your needs.

## Changing the Provider and Model

You can specify a different provider and model by setting the `provider` and `model` parameters in the `Copilot` instance.

```javascript
const copilot = new Copilot(process.env.ANTHROPIC_API_KEY, {
    provider: 'anthropic',
    model: 'claude-3-5-haiku',
});
```

There are other providers and models available. Here is a list:

| Provider  | Models                                                      | Notes                                                                                                                                                                                              |
| --------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| groq      | `llama-3-70b`                                               | Offers moderate accuracy with extremely fast response times. Ideal for real-time completions while typing.                                                                                         |
| openai    | `gpt-4o`, `gpt-4o-mini`, `o1-mini (beta model)`             |                                                                                                                                                                                                    |
| anthropic | `claude-3-5-sonnet`, `claude-3-haiku`, `claude-3-5-haiku`   | Claude-3-5-haiku provides an optimal balance between accuracy and response time.                                                                                                                   |
| google    | `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-1.5-flash-8b` |                                                                                                                                                                                                    |
| deepseek  | `v3`                                                        | Provides highly accurate completions using Fill-in-the-Middle (FIM) technology. While response times are slower, it excels in completion accuracy. Best choice when precision is the top priority. |
