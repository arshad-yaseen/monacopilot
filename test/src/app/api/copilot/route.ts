import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!);

export async function POST(req: Request) {
  const data = await req.json();
  const completion = await copilot.complete(data);

  return Response.json(completion);
}
