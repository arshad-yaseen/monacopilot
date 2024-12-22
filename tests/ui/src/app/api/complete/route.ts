import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!, {
  provider: 'groq',
  model: 'llama-3-70b',
});

export async function POST(req: Request) {
  const body = await req.json();
  const {completion, error} = await copilot.complete({
    body,
  });

  if (error) {
    return Response.json({completion: null, error}, {status: 500});
  }

  return Response.json({completion});
}
