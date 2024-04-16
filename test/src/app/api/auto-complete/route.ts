import {Completion} from 'ai-monaco-editor';

const completion = new Completion(process.env.API_KEY);

export const POST = async (req: Request) =>
  Response.json(await completion.run(req));
