import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!);

export async function POST(req: Request) {
  const code = await req.json();
  const completion = await copilot.complete(code);

  return Response.json(completion);
}
