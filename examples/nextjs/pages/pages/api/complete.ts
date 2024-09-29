import {NextApiRequest, NextApiResponse} from 'next';

import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {completion, error} = await copilot.complete({
    body: req.body,
  });

  // Handle error if you want
  if (error) {
    res.status(500).json({error});
  }

  res.status(200).json({completion});
}
