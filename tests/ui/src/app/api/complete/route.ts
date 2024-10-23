import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.OPENAI_API_KEY!, {
  provider: 'openai',
  model: 'gpt-4o-mini',
});

export async function POST(req: Request) {
  const body = await req.json();
  const {completion, error} = await copilot.complete({
    body,
  });

  if (error) {
    // handle error if you want
    // ...
    return Response.json({completion: null, error}, {status: 500});
  }

  return Response.json({completion});
}
