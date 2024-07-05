import {err} from '../error';
import {RegisterCopilotParams} from '../types';
import {clearCompletionCache} from '../utils/completion';
import handleInlineCompletions from './handler';

/**
 * Register Copilot with Monaco editor.
 * @param monaco The Monaco instance.
 * @param filename The filename of the code snippet.
 * @param endpoint The endpoint to fetch completion items.
 * @param technologies The technologies used in the code snippet.
 * @param language The language of the code snippet.
 * @param externalContext The external context of the code snippet.
 */
export const registerCopilot = ({
  monaco,
  filename,
  endpoint,
  technologies,
  language,
  externalContext,
}: RegisterCopilotParams): (() => void) | undefined => {
  try {
    const _icp = monaco.languages.registerInlineCompletionsProvider(language, {
      provideInlineCompletions: async (model, position, context, token) =>
        handleInlineCompletions(monaco, model, position, context, token, {
          language,
          filename,
          endpoint,
          technologies,
          externalContext,
        }),
      freeInlineCompletions: () => {},
    });

    return () => {
      _icp.dispose();
      clearCompletionCache();
    };
  } catch (error) {
    err(error).editorError('Error while registering copilot');
  }
};
