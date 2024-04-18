import {Completion} from 'ai-monaco-editor';

const completion = new Completion(process.env.API_KEY);

export async function POST(req: Request) {
  const data = await completion.run(req);

  return Response.json(data);
}
