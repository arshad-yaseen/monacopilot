![Hero Image](https://i.postimg.cc/PrsQ1KLb/Frame-1.png)

# Monacopilot

**Monacopilot** integrates AI auto-completion into the Monaco Editor, inspired by GitHub Copilot.

## Table of Contents

- [Examples](#examples)
- [Installation](#installation)
- [Usage](#usage)
- [Copilot Instance Options](#copilot-instance-options)
  - [Changing the Provider and Model](#changing-the-provider-and-model)
  - [Custom Headers](#custom-headers)
- [Configuration Options](#configuration-options)
  - [External Context](#external-context)
  - [Filename](#filename)
  - [Completions for Specific Technologies](#completions-for-specific-technologies)
- [Cost Overview](#cost-overview)
- [FAQ](#faq)
- [Contributing](#contributing)

## Demo

https://github.com/user-attachments/assets/4af4e24a-1b05-4bee-84aa-1521ad7098cd

## Examples

Here are some examples of how to use Monacopilot in different project setups:

- Next.js ([app](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/app) | [pages](https://github.com/arshad-yaseen/monacopilot/tree/main/examples/nextjs/pages))

## Installation

To install Monacopilot, run:

```bash
npm install monacopilot
```

## Usage

#### Setting Up the API Key

In this example, we'll use Groq as our provider.

Start by obtaining an API key from the [Groq console](https://console.groq.com/keys). Once you have your API key, define it as an environment variable in your project:

```bash
# .env.local
GROQ_API_KEY=your-api-key
```

#### API Handler

Set up an API handler to manage auto-completion requests. An example using Express.js:

```javascript
const express = require('express');
const {Copilot} = require('monacopilot');

const app = express();
const port = process.env.PORT || 3000;
const copilot = new Copilot(process.env.GROQ_API_KEY);

app.use(express.json());

app.post('/copilot', async (req, res) => {
  const completion = await copilot.complete(req.body);
  res.status(200).json(completion);
});

app.listen(port);
```

#### Register Copilot with the Monaco Editor

Next, register Copilot with the Monaco editor.

```javascript
import * as monaco from 'monaco-editor';
import {registerCopilot} from 'monacopilot';

const editor = monaco.editor.create(document.getElementById('container'), {
  language: 'javascript',
});

registerCopilot(monaco, editor, {
  endpoint: 'https://api.example.com/copilot',
  language: 'javascript',
});
```

## Copilot Instance Options

### Changing the Provider and Model

You can specify a different provider and model for completions by setting the `provider` and `model` parameters in the `Copilot` instance.

```javascript
const copilot = new Copilot(process.env.OPENAI_API_KEY, {
  provider: 'openai',
  model: 'gpt-4o',
});
```

The default provider is `groq` and the default model is `llama-3-70b`.

| Provider  | Model             | Description                                                                                                   |
| --------- | ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Groq      | llama-3-70b       | Ultra-fast inference (<0.5s response time), balancing speed and quality for a wide range of coding tasks      |
| OpenAI    | gpt-4o-mini       | Compact version of gpt-4o, offering cost-effective completions with good performance                          |
| OpenAI    | gpt-4o            | State-of-the-art model, excelling in complex reasoning and generating high-quality, context-aware completions |
| Anthropic | Claude-3.5-Sonnet | Advanced AI with broad knowledge, ideal for diverse coding scenarios and natural language understanding       |
| Anthropic | Claude-3-Opus     | Top-tier AI model, exceptional at handling intricate tasks and providing detailed, nuanced completions        |
| Anthropic | Claude-3-Sonnet   | Versatile and powerful, offering a great balance between performance and efficiency for various coding needs  |
| Anthropic | Claude-3-Haiku    | Streamlined model optimized for speed, perfect for quick completions and real-time coding assistance          |

### Custom Headers

You can add custom headers to all API requests made by Monacopilot.

```javascript
const copilot = new Copilot(process.env.API_KEY, {
  headers: {
    'X-Custom-Header': 'custom-value',
  },
});
```

## Configuration Options

### External Context

Enhance the accuracy and relevance of Copilot's completions by providing additional code context from your workspace.

```javascript
registerCopilot(monaco, editor, {
  // ...other options
  externalContext: [
    {
      path: './utils.js',
      content:
        'export const reverse = (str) => str.split("").reverse().join("")',
    },
  ],
});
```

By providing external context, Copilot can offer more intelligent suggestions. For example, if you start typing `const isPalindrome = `, Copilot may suggest using the `reverse` function from `utils.js`.

### Filename

Specify the name of the file being edited to receive more contextually relevant completions.

```javascript
registerCopilot(monaco, editor, {
  // ...other options
  filename: 'utils.js', // e.g., "index.js", "utils/objects.js"
});
```

Now, the completions will be more relevant to utilities.

### Completions for Specific Technologies

Enable completions tailored to specific technologies by using the `technologies` option.

```javascript
registerCopilot(monaco, editor, {
  // ...other options
  technologies: ['react', 'next.js', 'tailwindcss'],
});
```

This configuration will provide completions relevant to React, Next.js, and Tailwind CSS.

## Contributing

For guidelines on contributing, Please read the [contributing guide](https://github.com/arshad-yaseen/monacopilot/blob/main/CONTRIBUTING.md).

We welcome contributions from the community to enhance Monacopilot's capabilities and make it even more powerful ❤️
