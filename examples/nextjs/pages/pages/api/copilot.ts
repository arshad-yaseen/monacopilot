import {NextApiRequest, NextApiResponse} from 'next';

import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const completion = await copilot.complete({
    body: req.body,
  });

  res.status(200).json(completion);
}
