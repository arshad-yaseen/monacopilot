---
title: Custom Request Handler
---

# Custom Request Handler

The `requestHandler` option in the `registerCompletion` function acts as a middleware that allows you to customize how requests are made from the client to your specified endpoint. By default, Monacopilot handles requests internally, but with `requestHandler`, you can intercept and modify both the request and response.

This is particularly useful when you need to:

- Add custom headers (like authentication)
- Modify the request body by combining Monacopilot's default `completionMetadata` with your own custom properties
- Transform the response before it's processed by Monacopilot

The handler receives the endpoint URL and the request body that Monacopilot has prepared, giving you full control over how the request is made and processed.

## Example

```javascript
registerCompletion(monaco, editor, {
    endpoint: 'https://api.example.com/code-completion',
    // ... other options
    requestHandler: async ({endpoint, body}) => {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                // Add custom headers
                'X-Custom-Header': 'custom value',
            },
            body: JSON.stringify({
                ...body,
                // Add custom parameters
                customProperty: 'custom value',
            }),
        });

        const data = await response.json();

        // Process and transform the response
        const processedCompletion = data.completion
            .trim()
            .replace(/\t/g, '    '); // Convert tabs to spaces

        return {
            completion: processedCompletion,
        };
    },
});
```

The `requestHandler` function takes an object with `endpoint` and `body` as parameters.

| Property   | Type     | Description                                                                                            |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `endpoint` | `string` | The endpoint to which the request is sent. This is the same as the `endpoint` in `registerCompletion`. |
| `body`     | `object` | The body of the request processed by Monacopilot.                                                      |

The `requestHandler` should return an object with the following property:

| Property     | Type               | Description                                                                                      |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------ |
| `completion` | `string` or `null` | The completion text to be inserted into the editor. Return `null` if no completion is available. |

## Example of Receiving

In your request handler, you can receive the custom properties you passed like this:

```typescript
app.post('/code-completion', async (req, res) => {
    const {completion, error} = await copilot.complete({body: req.body});

    // Recieve the custom things you passed
    const customProperty = req.body.customProperty;
    const xCustomHeader = req.headers['x-custom-header'];

    if (error) {
        return res.status(500).json({completion: null, error});
    }

    res.json({completion});
});
```
