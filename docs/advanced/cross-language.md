---
title: Cross-Language API Handler Implementation
---

# Cross-Language API Handler Implementation

While the example in this documentation uses JavaScript/Node.js (which is recommended), you can set up the API handler in any language or framework. For JavaScript, Monacopilot provides a built-in function that handles all the necessary steps, such as generating the prompt, sending it to the model, and processing the response. However, if you're using a different language, you'll need to implement these steps manually.

## Implementation Steps

1. Create an endpoint that accepts POST requests (e.g., `/code-completion`).
2. The endpoint should expect a JSON body containing completion metadata.
3. Use the metadata to construct a prompt for your LLM.
4. Send the prompt to your chosen LLM and get the completion.
5. Return a JSON response with the following structure:

    ```json
    {
        "completion": "Generated completion text"
    }
    ```

    Or in case of an error:

    ```json
    {
        "completion": null,
        "error": "Error message"
    }
    ```

## Key Considerations

- The prompt should instruct the model to return only the completion text, without any additional formatting or explanations.
- The completion text should be ready for direct insertion into the editor.

Check out the [prompt.ts](https://github.com/arshad-yaseen/monacopilot/blob/main/packages/monacopilot/src/prompt.ts) file to see how Monacopilot generates the prompt. This will give you an idea of how to structure the prompt for your LLM to achieve the best completions.

## Metadata Overview

The request body's `completionMetadata` object contains essential information for crafting a prompt for the LLM to generate accurate completions. See the [Completion Metadata](/advanced/custom-prompt#completion-metadata) section for more details.

## Example Implementation (Python with FastAPI)

Here's a basic example using Python and FastAPI:

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.post('/code-completion')
async def handle_completion(request: Request):
    try:
        body = await request.json()
        metadata = body['completionMetadata']

        prompt = f"""Please complete the following {metadata['language']} code:

{metadata['textBeforeCursor']}
<cursor>
{metadata['textAfterCursor']}

Use modern {metadata['language']} practices and hooks where appropriate. Please provide only the completed part of the
code without additional comments or explanations."""

        # Simulate a response from a model
        response = "Your model's response here"

        return {
            'completion': response,
            'error': None
        }
    except Exception as e:
        return {
            'completion': None,
            'error': str(e)
        }
```

Now, Monacopilot is set up to send completion requests to the `/code-completion` endpoint and receive completions in response.

```javascript
registerCompletion(monaco, editor, {
    endpoint: 'https://my-python-api.com/code-completion',
    // ... other options
});
```
