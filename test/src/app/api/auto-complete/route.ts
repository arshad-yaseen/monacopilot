import {Completion} from 'ai-monaco-editor';

const completion = new Completion(process.env.API_KEY, {
  model: 'gpt-3.5-turbo-0125',
});

export const POST = async (req: Request) =>
  Response.json(await completion.run(req));
