import {Monaco} from './common';
import type {CompletionModel} from './completion';
import {
  Endpoint,
  ExternalContext,
  Filename,
  Technologies,
} from './monacopilot-props';

export interface CopilotOptions {
  model: CompletionModel | undefined;
}

export interface RegisterCopilotParams {
  monaco: Monaco;
  filename?: Filename;
  endpoint?: Endpoint;
  technologies?: Technologies;
  language?: string;
  externalContext?: ExternalContext;
}
