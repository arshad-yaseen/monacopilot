import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.OPENAI_API_KEY!, {
  provider: 'openai',
  model: 'gpt-4o',
});

export async function POST(req: Request) {
  const body = await req.json();
  const completion = await copilot.complete(body);

  return Response.json(completion);
}
