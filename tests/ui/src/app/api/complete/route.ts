import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const {completion, error} = await copilot.complete({
    body,
  });

  // Handle error if you want
  if (error) {
    return Response.json({error}, {status: 500});
  }

  return Response.json({completion});
}
