import {COPILOT_MODEL_IDS} from '../constants';

export type DeepSeekChatCompletionType = {
  choices: {
    text: string;
  }[];
};

export type DeepSeekChatCompletionCreateParamsBase = {
  model: (typeof COPILOT_MODEL_IDS)['chat'];
  prompt: string;
  suffix: string;
  temperature: number;
  max_tokens: number;
};
