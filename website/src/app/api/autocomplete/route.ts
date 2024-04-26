import { Completion } from "monacopilot";

const completion = new Completion(process.env.GROQ_API_KEY!);

export async function POST(req: Request) {
  const data = await completion.run(req);
  return Response.json(data);
}
