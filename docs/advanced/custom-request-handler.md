---
title: Custom Request Handler
---

# Custom Request Handler

You can customize how requests are sent to your completion endpoint by using the `requestHandler` option when registering your completion. Instead of Monacopilot handling the request, you take control of the entire request process, allowing you to add custom headers, authentication tokens, or modify the request body before sending it to your endpoint.

## Example

```javascript
registerCompletion(monaco, editor, {
    language: 'javascript',
    requestHandler: async ({ body }) => {
        const response = await fetch('https://your-api-url.com/code-completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-Header': 'custom-value'
            },
            body: JSON.stringify({
                ...body,
                additionalData: {
                    userId: 'user-123',
                    projectId: 'project-456'
                }
            })
        });

        return await response.json();
    }
});
```

## Server-Side Implementation

Your server endpoint will receive the modified request with your custom headers and body:

```javascript
app.post('/code-completion', async (req, res) => {
    const authToken = req.headers.authorization;
    const customHeader = req.headers['x-custom-header'];
    
    const { additionalData } = req.body;
    
    const completion = await copilot.complete({
        body: req.body,
    });

    res.json(completion);
});
```

## Return Format

The `requestHandler` function must return a response object with the right format:

```javascript
// If using CompletionCopilot in your endpoint
// Simply return the response from your endpoint
return await response.json();

// If implementing a custom solution
// Return an object with either completion or error
return {
  completion: "your completion text", // Text to insert in the editor
  error: "error message"              // Optional error message
};
```

When using the standard `copilot.complete()` in your endpoint, you don't need to modify the response structure - just return the JSON response directly. For custom implementations, ensure you return an object with a `completion` property containing the text to insert into the editor. 
