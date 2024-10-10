import {Copilot} from 'monacopilot';

export const copilot = new Copilot(process.env.OPENAI_API_KEY!, {
  provider: 'openai',
  model: 'gpt-4o',
});
