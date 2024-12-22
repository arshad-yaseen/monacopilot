import {NextRequest, NextResponse} from 'next/server';

import {Copilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!, {
  provider: 'groq',
  model: 'llama-3-70b',
});

export async function POST(req: NextRequest) {
  const body: CompletionRequestBody = await req.json();
  const {completion, error} = await copilot.complete({
    body,
  });

  if (error) {
    // Handle error if needed
    // ...
    return NextResponse.json({completion: null, error}, {status: 500});
  }

  return NextResponse.json({completion}, {status: 200});
}
