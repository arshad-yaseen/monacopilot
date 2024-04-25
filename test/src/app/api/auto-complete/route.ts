import {Completion} from 'rich-monaco-editor';

const completion = new Completion(process.env.GROQ_API_KEY!, {
  model: 'llama3-70b-8192',
});

export async function POST(req: Request) {
  const data = await completion.run(req);

  return Response.json(data);
}
