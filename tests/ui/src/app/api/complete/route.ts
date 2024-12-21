import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.ANTHROPIC_API_KEY!, {
  provider: 'anthropic',
  model: 'claude-3-5-sonnet',
});

export async function POST(req: Request) {
  const body = await req.json();
  const {completion, error} = await copilot.complete({
    body,
  });

  if (error) {
    console.log(error);
    // Handle error if needed
    // ...
    return Response.json({completion: null, error}, {status: 500});
  }

  console.log('Got completion');

  return Response.json({completion});
}
