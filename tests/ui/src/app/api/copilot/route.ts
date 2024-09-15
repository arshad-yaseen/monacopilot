import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.OPENAI_API_KEY!, {
  provider: 'huggingface',
  model: {
    config(apiKey, prompt) {
      return {
        endpoint: 'https://api.anthropic.com/v1/completions',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: {
          prompt,
        },
      };
    },
    transformResponse(response) {
      return response.body.choices[0].text;
    },
  },
});

export async function POST(req: Request) {
  const body = await req.json();
  const completion = await copilot.complete({
    body,
  });

  return Response.json(completion);
}
