import {NextApiRequest, NextApiResponse} from 'next';

import {Copilot} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!, {
  provider: 'groq',
  model: 'llama-3-70b',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {completion, error} = await copilot.complete({
    body: req.body,
  });

  if (error) {
    // Handle error if needed
    // ...
    res.status(500).json({completion: null, error});
  }

  res.status(200).json({completion});
}
