import {PROVIDER_MODEL_MAP, PROVIDERS} from '../../llm/base';
import {CopilotOptions, CustomCopilotModel, Model, Provider} from '../../types';
import {joinWithAnd} from '../../utils';

export const validateParams = (
  apiKey: string,
  options: CopilotOptions,
): void => {
  if (!apiKey) {
    throw new Error('Please provide an API key.');
  }

  if (
    !options ||
    (typeof options === 'object' && Object.keys(options).length === 0)
  ) {
    throw new Error('Please provide options.');
  }
};

export const validateInputs = (
  model: Model | CustomCopilotModel,
  provider?: Provider,
): void => {
  // Check if using a custom model (has config property)
  if (typeof model === 'object') {
    // Custom models cannot have a provider specified
    if (provider !== undefined) {
      throw new Error(
        'Provider should not be specified when using a custom model.',
      );
    }

    if (!('config' in model) || !('transformResponse' in model)) {
      throw new Error(
        'Please ensure both config and transformResponse are provided for custom model.',
      );
    }

    return;
  }

  // Validate that a supported provider is specified for built-in models
  if (!provider || !PROVIDERS.includes(provider)) {
    throw new Error(
      `Provider must be specified and supported when using built-in models. Please choose from: ${joinWithAnd(
        PROVIDERS,
      )}`,
    );
  }

  // Validate that the model is supported by the specified provider
  if (
    typeof model === 'string' &&
    !PROVIDER_MODEL_MAP[provider].includes(model)
  ) {
    throw new Error(
      `Model "${model}" is not supported by the "${
        provider
      }" provider. Supported models: ${joinWithAnd(
        PROVIDER_MODEL_MAP[provider],
      )}`,
    );
  }
};
