import {Hono} from 'hono';
import {cors} from 'hono/cors';

import {RUN_RATE_LIMIT_TIME} from './constants';
import {callLlmProvider} from './helpers/provider';
import rateLimiter from './helpers/rate-limiter';

const app = new Hono();
app.use(cors());

app.get('/', context => {
  return context.json({
    message: 'Welcome to the rich-monaco-editor completion server',
  });
});

app.post('/run', async context => {
  try {
    const apiKey = context.req.header('x-api-key');
    rateLimiter(apiKey, RUN_RATE_LIMIT_TIME);

    const {providerApiEndpoint, providerBody, providerHeaders} =
      await context.req.json();

    const completion = await callLlmProvider(
      providerApiEndpoint,
      providerBody,
      providerHeaders,
    );

    return context.json(completion);
  } catch (error) {
    return context.json({error: 'Request is cancelled'});
  }
});

export default app;
