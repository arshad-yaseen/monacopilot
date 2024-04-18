import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";

const limiter = rateLimiter({
  limit: 2,
  windowMs: 4000,
  keyGenerator: (c) => c.req.header("x-api-key")!,
  message: { message: "Request is cancelled" },
});

const app = new Hono();
app.use(limiter);

let counter = 0;

const lastRequestTime = new Map();

app.post("/", async (c) => {
  const api_key = c.req.header("x-api-key");
  const now = Date.now();

  if (
    lastRequestTime.has(api_key) &&
    now - lastRequestTime.get(api_key) < 2000
  ) {
    return c.json({ message: "Request is cancelled" });
  }

  lastRequestTime.set(api_key, now);

  const { provider_api_endpoint, provider_body, provider_headers } =
    await c.req.json();

  const response = await fetch(provider_api_endpoint, {
    method: "POST",
    body: JSON.stringify(provider_body),
    headers: provider_headers,
  });

  counter++;
  console.log("Request count: ", counter);

  const completion = await response.json();
  return c.json(completion);
});

export default app;
