import {copilot} from '@/app/lib/monacopilot';

export async function POST(req: Request) {
  const body = await req.json();
  const {modifiedText, error} = await copilot.modify({
    body,
  });

  if (error) {
    // handle error if you want
    // ...
    return Response.json({completion: null, error}, {status: 500});
  }

  return Response.json({modifiedText});
}
