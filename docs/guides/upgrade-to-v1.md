---
title: Upgrading to Monacopilot v1.0.0
---

::: info
This guide is for those who have already installed and are using monacopilot with a version older than v1 and want to upgrade to monacopilot's stable new major v1 release. For newcomers, you can skip this.
:::

# Upgrading to Monacopilot `v1.0.0`

With the release of v1.0.0, Monacopilot now delivers faster, more accurate code completions powered by Mistral's Codestral model. This guide will help you quickly update your existing implementation.

## Breaking Changes

- **Provider Optimization**: Previous general-purpose chat models have been replaced with Mistral's specialized `codestral` model, which is specifically designed for code completion. This model leverages Fill-in-the-Middle (FIM) technology to deliver significantly faster and super accurate completions.

- **Enhanced Customization API**: The interfaces for custom prompts and custom models have been completely redesigned to provide more flexibility and better performance. These changes enable more sophisticated integrations while maintaining a clean developer experience.

## Update Steps

### 1. Update your dependencies

```bash
npm install monacopilot@1.0.0
```

### 2. Update your server-side code

Replace your existing CompletionCopilot configuration:

```javascript
// Before
const copilot = new CompletionCopilot(process.env.OPENAI_API_KEY, {
    provider: 'openai',
    model: 'gpt-4o',
});

// After
const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
    provider: 'mistral',
    model: 'codestral',
});
```

For more information about available providers and models, see the [Copilot Options](/configuration/copilot-options) documentation.

### 3. Update your environment variables

Create or update your API key:

```
# Before
OPENAI_API_KEY=your_openai_api_key_here

# After
MISTRAL_API_KEY=your_mistral_api_key_here
```

You can obtain a Mistral API key from the [Mistral AI Console](https://console.mistral.ai/api-keys).

### 4. Update Custom Prompt Implementation (If Used)

If you use the custom prompt feature, the interface has changed:

```javascript
// Before
copilot.complete({
    options: {
        customPrompt: metadata => ({
            system: 'Your custom system prompt here',
            user: 'Your custom user prompt here',
        }),
    },
});

// After
copilot.complete({
    options: {
        customPrompt: metadata => ({
            context: 'Information about the codebase context',
            instruction: 'Instructions for code completion',
            fileContent: 'File content with cursor position',
        }),
    },
});
```

For detailed information about the new custom prompt format, see the [Custom Prompt API](/advanced/custom-prompt) documentation.

### 5. Update Custom Model Integration (If Used)

If you use a custom model configuration, update to the new interface:

```javascript
// Before
const copilot = new CompletionCopilot(API_KEY, {
    model: {
        config: (apiKey, prompt) => ({
            endpoint: 'https://your-api-endpoint.com',
            body: {
                inputs: prompt.user,
                // other parameters
            },
            // headers
        }),
        transformResponse: response => ({text: response.generated_text}),
    },
});

// After
const copilot = new CompletionCopilot(API_KEY, {
    model: {
        config: (apiKey, prompt) => ({
            endpoint: 'https://your-api-endpoint.com',
            body: {
                // The prompt now has context, instruction, and fileContent
                inputs: `${prompt.context}\n\n${prompt.instruction}\n\n${prompt.fileContent}`,
                // other parameters
            },
            // headers
        }),
        transformResponse: response => ({text: response.generated_text}),
    },
});
```

For complete details on implementing custom models, see the [Custom Model Integration](/advanced/custom-model) documentation.
