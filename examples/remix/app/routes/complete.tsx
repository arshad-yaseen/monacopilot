import {json, type ActionFunctionArgs} from '@remix-run/node';
import {Copilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!, {
  provider: 'groq',
  model: 'gemma2-9b-it',
});

export const action = async ({request}: ActionFunctionArgs) => {
  const body: CompletionRequestBody = await request.json();
  const {completion, error} = await copilot.complete({body});
  if (error) {
    // Handle error if needed
    // ...
    return json({completion: null, error}, {status: 500});
  }
  console.log(completion);
  return json(completion);
};
